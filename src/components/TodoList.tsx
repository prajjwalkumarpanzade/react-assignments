//**** Instead this Added New Component(TodoList_withPaination), this is only for Future Ref. Purpose */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITodoElement, Props } from "../types/todo";
import { fetchGet, fetchPatch } from "../services/api";
import { useQuery } from "@tanstack/react-query";

const TodoList = ({ todos }: Props) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("0");
  //const [filteredTodos, setFilteredTodos] = useState(todos); //Optional, when using useEffect only
  const pageSize = 3;
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleStatus = (item: ITodoElement) => {
    setChecked(!checked);
    item.isComplete = !item.isComplete;
    const updatedItem = { ...item, isComplete: !item.isComplete };

    fetchPatch("/todos/" + item.id, updatedItem).then((res) => res);
  };

  const handleCard = (item: ITodoElement) => {
    navigate(`/task/${item.id}`);
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["todo"],
    queryFn: () => {
      return fetchGet("/todos", { _limit: pageSize, _page: pageNumber }).then(
        (res: any) => res.data
      );
    },
  });

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

  const handlePrevClick = () => {
    setPageNumber(pageNumber - 1);
  };
  const handleNextClick = () => {
    setPageNumber(pageNumber + 1);
  };

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
      {isPending && <p>Loading...</p>}
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
      <div className="footer">
        <button onClick={handlePrevClick} disabled={pageNumber === 1}>
          Prev
        </button>
        {pageNumber}
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default TodoList;