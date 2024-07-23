import { signInWithGoogle } from "../../firebase";

const Login = () => {
  return (
    <div className="dashboard">
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Login;
