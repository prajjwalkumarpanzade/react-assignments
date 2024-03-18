import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ITodoElement {
  id: string;
  task: string;
  description: string;
  isComplete: boolean;
}

interface Props {
  todos: ITodoElement[];
}

const TodoList = ({ todos }: Props) => {
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");
  //const [filteredTodos, setFilteredTodos] = useState(todos); //Optional, when using useEffect only
  const [sortDirection, setSortDirection] = useState("0");
  const navigate = useNavigate();

  const handleStatus = (item: ITodoElement) => {
    setChecked(!checked);
    item.isComplete = !item.isComplete;
  };

  const handleCard = (item: ITodoElement) => {
    navigate(`/task/${item.id}`);
  };

  // useEffect(()=>{
  //   setFilteredTodos(todos.filter((todo)=>todo.task.includes(search)))
  // },[search, filteredTodos])
  //or
  const filterTodo = useMemo(
    () => todos.filter((todo) => todo.task.includes(search)),
    [search, todos]
  );

  const sortedTodos = useMemo(
    () =>
      filterTodo.sort((a, b) =>
        sortDirection === "0"
          ? a.task > b.task
            ? 1
            : -1
          : a.task > b.task
          ? -1
          : 1
      ),
    [filterTodo, sortDirection]
  );

  return (
    <div className="blog-list text-center">
      <div style={{ display: "flex" }} className="justify-content-center">
        <input
          type="text"
          placeholder="Search Todos"
          value={search}
          className="m-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <label htmlFor="Sort" className="m-2">
          Sort :
        </label>
        <select
          onChange={(e) => setSortDirection(e.target.value)}
          className="m-2"
        >
          <option value={"0"}>A-Z</option>
          <option value={"1"}>Z-A</option>
        </select>
      </div>

      {sortedTodos.map((item) => (
        <center>
          <div
            className="card w-50"
            key={item.id}
            style={{
              border: "0.1px solid grey",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            <div
              className="card-header"
              style={{
                textDecoration: item.isComplete ? "line-through" : "none",
              }}
            >
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  name={item.task}
                  checked={item.isComplete}
                  onChange={() => handleStatus(item)}
                />{" "}
                &nbsp;&nbsp;
                <h3 onClick={() => handleCard(item)}>{item.task}</h3>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">
                <strong>Status :</strong>{" "}
                {item.isComplete ? "Completed" : "Incomplete"}&nbsp;&nbsp;
              </p>
            </div>
          </div>
        </center>
      ))}
    </div>
  );
};

export default TodoList;