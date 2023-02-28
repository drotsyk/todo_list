import React, { useState, ChangeEvent } from "react";
import "./Header.css";

interface HeaderProps {
  pushDate: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ pushDate }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value.trim().length === 0) return;
    setValue("");
    pushDate(value);
  };

  return (
    <div className="header">
      <h1 className="header__title">Todos</h1>
      <input
        className="header__input"
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder="Add todo"
      />
      <button
        className="header__btn"
        type="submit"
        onClick={() => handleClick()}
      >
        Add todo
      </button>
    </div>
  );
};
