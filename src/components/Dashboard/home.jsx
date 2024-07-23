import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef } from "react";
import { auth, db, storage } from "../../firebase";

const Home = () => {
  const form = useRef();

  const submitPortfolio = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Tambahkan log ini untuk memastikan fungsi dipanggil
    console.log(form.current); // Log untuk melihat referensi form

    const name = form.current[0]?.value;
    const description = form.current[1]?.value;
    const url = form.current[2]?.value;
    const image = form.current[3]?.files[0];

    console.log({ name, description, url, image }); // Log untuk melihat nilai form

    if (!name || !description || !url || !image) {
      alert("Please fill in all fields");
      return;
    }

    if (!image.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    const storageRef = ref(storage, `portfolio/${image.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, image);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log("Image uploaded successfully, URL: ", downloadUrl);
      await savePortfolio({ name, description, url, image: downloadUrl });
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Failed to upload image");
    }
  };

  const savePortfolio = async (portfolio) => {
    try {
      const portfolioRef = collection(db, "portfolio");
      await addDoc(portfolioRef, portfolio);
      console.log("Document successfully written!", portfolio);
      window.location.reload(false);
    } catch (error) {
      console.error("Error writing document: ", error);
      alert(`Failed to add portfolio: ${error.message}`);
    }
  };

  return (
    <div className="dashboard">
      <form ref={form} onSubmit={submitPortfolio}>
        <p>
          <input type="text" placeholder="Name" />
        </p>
        <p>
          <textarea placeholder="Description" />
        </p>
        <p>
          <input type="text" placeholder="Url" />
        </p>
        <p>
          <input type="file" placeholder="Image" />
        </p>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => auth.signOut()}>
          Sign out
        </button>
      </form>
    </div>
  );
};

export default Home;
