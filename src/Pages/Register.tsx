import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IUser } from "../Interface/type";
import { Link } from "react-router-dom";
import { Form } from "../Components/Form";
import GoogleButton from "react-google-button";

interface RegisterProps {
  setAuth: (auth: IUser) => void;
}

export const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const authUser = {
          id: user.uid,
          email: user.email,
        };
        setAuth(authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
        navigate("/");
      })
      .catch(alert);
  };

  const handleGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const authUser = {
          id: user.uid,
          email: user.email,
        };
        setAuth(authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <Form title="Register" handleClick={handleRegister} />
      <div className="links">
        <h2>OR SIGN IN WITH...</h2>
        <GoogleButton onClick={() => handleGoogle()} />
        <h1 className="link">
          <Link to="/login">Log in</Link>
        </h1>
      </div>
    </div>
  );
};
