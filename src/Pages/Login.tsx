import React from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IUser } from "../Interface/type";
import { Form } from "../Components/Form";
import GoogleButton from "react-google-button";

interface LoginProps {
  setAuth: (auth: IUser) => void;
}

export const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
    <>
      <Form title="Log in" handleClick={handleLogin} />
      <div className="links">
        <h2>OR SIGN IN WITH...</h2>
        <GoogleButton onClick={() => handleGoogle()} />
        <h1 className="link">
          <Link to="/register">to Register</Link>
        </h1>
      </div>
    </>
  );
};
