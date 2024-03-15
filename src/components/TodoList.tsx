import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ITodoElement {
  id: string;
  task: string;
  isComplete: boolean;
}

interface Props {
  todos: ITodoElement[];
}

const TodoList = ({ todos }: Props) => {
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("0");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:8000",
  });
  
  
   const fetchPatch = (url: string, payload: any) => {
    console.log("in patch !!");
    return instance.patch(url, payload).then((res: any) => res.data);
  };
  
  const handleStatus = (item: ITodoElement) => {
    setChecked(!checked);
    const updatedItem = { ...item, isComplete: !item.isComplete };
    fetchPatch("/todos/" + item.id, updatedItem).then((res: any) => {
      console.log(res);
    });
    item.isComplete = !item.isComplete;
  };


  const filterTodo = useMemo(() => todos.filter((todo) => todo.task.includes(search)), [search, todos]);

  const sortedTodos = useMemo(() => filterTodo.sort((a, b) => sortDirection === "0" ? (a.task > b.task ? 1 : -1) : (a.task > b.task ? -1 : 1)), [filterTodo, sortDirection]);

  // const handleStatus = (item: ITodoElement) => {
  //   item.isComplete = !item.isComplete;
  // };

  const handleCard = (item: ITodoElement) => {
    navigate(`/task/${item.id}`);
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="search todos" value={search} className="m-2" onChange={(e) => setSearch(e.target.value)} />

        <label htmlFor="Sort" className="m-2">Sort :</label>
        <select onChange={(e) => setSortDirection(e.target.value)} className="m-2">
          <option value={"0"}>A-Z</option>
          <option value={"1"}>Z-A</option>
        </select>
      </div>
      <div>
        {sortedTodos.map((item) => (
          <div key={item.id}>
            <div>
              <div>
                <input
                  type="checkbox"
                  name={item.task}
                  checked={item.isComplete}
                  onChange={() => handleStatus(item)}
                />{" "} &nbsp;&nbsp;
                <h3 onClick={() => handleCard(item)}>
                  {item.task}
                </h3>
              </div>
            </div>

            <div>
              <p>
                <strong>Status :</strong>{" "}
                {item.isComplete ? "Completed" : "Incomplete"}&nbsp;&nbsp;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TodoList;


