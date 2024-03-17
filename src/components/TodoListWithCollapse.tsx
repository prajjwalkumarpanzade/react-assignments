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

const TodoListWithCollapse = ({ todos }: Props) => {
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("0");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStatus = (item: ITodoElement) => {
    setChecked(!checked);
    item.isComplete = !item.isComplete;
  };

  const handleCard = (item: ITodoElement) => {
    navigate(`/task/${item.id}`);
  };

  const handleToggleDetails = (itemId: string) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

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
          placeholder="search todos"
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
        <center key={item.id}>
          <div
            className="card w-50"
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
                <button
                  className="btn btn-secondary"
                  onClick={() => handleToggleDetails(item.id)}
                  aria-expanded={expandedItemId === item.id}
                  aria-controls={`CE${item.id}`}
                >
                  Description
                </button>
                <div
                  className={`collapse ${
                    expandedItemId === item.id ? "show" : ""
                  }`}
                  id={`CE${item.id}`}
                >
                  <div className="card card-body">{item.description}</div>
                </div>
              </p>
            </div>
          </div>
        </center>
      ))}
    </div>
  );
};

export default TodoListWithCollapse;