
//**** Instead this Added New Component(CreateTask), this is only for Future Ref. Purpose */

import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GenerateRandomNo } from "../helper/helper";

const AddTask = () => {
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const navigate = useNavigate();

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todoItem = {
      id: GenerateRandomNo(),
      task: title,
      isComplete: false,
      dueDate: dueDate,
    };

    fetch(process.env.REACT_APP_BASE_URL + "/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoItem),
    }).then(() => {
      setTitle("");
      setDueDate("");
      navigate("/");
    });
  };

  return (
    <div className="form-details text-center">
      <form onSubmit={addTodo}>
        <h2>- Add Task - </h2>
        <label htmlFor="title">Title : </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor="due-date">Due Date : </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <br />
        <br />

        <button className="btn btn-secondary" disabled={!Boolean(title.length)}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
