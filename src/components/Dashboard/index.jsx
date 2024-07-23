import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Login from "../Login";
import Home from "./home";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return <div>{user ? <Home /> : <Login />}</div>;
};

export default Dashboard;
