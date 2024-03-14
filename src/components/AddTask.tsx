
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const addTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todoItem = {
            id: `"${Math.random() * 2000}"`,
            task: title,
            isComplete: false,
            
          };

          fetch("http://localhost:5000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todoItem),
          }).then(() => {
            setTitle("");
            navigate("/");
          });
        };

  return (
    <div>
         <form onSubmit={addTodo}>
            <h2>- Add Task - </h2>
            <label htmlFor="title">Title : </label>
            <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} required/><br/>
            <button className="btn btn-secondary" disabled={!Boolean(title.length)}>Add Task</button>
        </form>
    </div>
  );
};

export default AddTask;
