import React from "react";
import { IList } from "../Interface/type";
import "./List.css";

interface ListProps {
  items: IList[];
  list: IList[];
  deleteTodo: (id: number) => void;
  filterTodo: (text: string) => void;
  checkTodo: (id: number) => void;
}

export const List: React.FC<ListProps> = ({
  items,
  list,
  checkTodo,
  deleteTodo,
  filterTodo,
}) => {
  const listLenght = list.filter((item) => item.checkbox).length;

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleFilter = (text: string) => {
    filterTodo(text);
  };

  const handleCheckTodo = (id: number) => {
    checkTodo(id);
  };

  return (
    <div className="list">
      {items.map((item, index) => (
        <div className="list__item" key={index}>
          <span className="list__text">{item.text}</span>
          <button
            className="list__delete"
            onClick={() => handleDelete(item.id)}
          >
            X
          </button>
          <button
            className={
              item.checkbox
                ? "list__checkbox list__checkbox--active"
                : "list__checkbox"
            }
            onClick={() => handleCheckTodo(item.id)}
          ></button>
        </div>
      ))}
      {list.length > 0 && (
        <>
          <div className="list__filters">
            <button
              className="list__filter"
              onClick={() => handleFilter("All")}
            >
              All
            </button>
            <button
              className="list__filter"
              onClick={() => handleFilter("Complited")}
            >
              Complited
            </button>
            <button
              className="list__filter"
              onClick={() => handleFilter("Not complited")}
            >
              Not complited
            </button>
          </div>
          <div>
            Complited {listLenght} of {list.length}
          </div>
        </>
      )}
    </div>
  );
};
