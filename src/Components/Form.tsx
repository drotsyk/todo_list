import React, { useState } from "react";
import "./Form.css";

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

export const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const onEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.trim().length === 0 && email.trim().length === 0) {
      alert("Enter valid form");
      return;
    }
    handleClick(email, password);
  };

  return (
    <form className="form" action="" onSubmit={(e) => onForm(e)}>
      <h1>{title}</h1>
      <input
        className="form__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmail(e)}
      />
      <input
        className="form__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onPassword(e)}
      />
      <button className="form__btn" type="submit">
        Submit
      </button>
    </form>
  );
};
