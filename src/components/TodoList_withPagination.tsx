
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITodoElement } from "../types/todo";
import { fetchGet, fetchPatch } from "../services/api";
import { useQuery } from "@tanstack/react-query";

const TodoList_withPagination = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortDirection, setSortDirection] = useState("0");
  const pageSize = 4;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleStatus = (item: ITodoElement) => {
    setChecked(!checked);
    item.isComplete = !item.isComplete;
    const updatedItem = { ...item, isComplete: !item.isComplete };

    fetchPatch("/todos/" + item.id, updatedItem).then((res) => {
      console.log(res);
    });
  };

  const handleCard = (item: ITodoElement) => {
    navigate(`/task/${item.id}`);
  };

  const { data, isPending, error } = useQuery({
    queryKey: [pageNumber, pageSize, search, checked],
    queryFn: async () => {
      const res = await fetchGet("/todos", {
        _page: pageNumber,
        _limit: pageSize,
        _sort: "title",
        // isComplete_like: checked,
      });
      setTotalPages(Math.ceil(res.headers["x-total-count"] / pageSize));
      return res.data;
    },
  });
  // useEffect(()=>{
  //   setFilteredTodos(todos.filter((todo)=>todo.task.includes(search)))
  // },[search, filteredTodos])
  //or
  const filterTodo = useMemo(() => {
    if (data && Array.isArray(data)) {
      return data.filter((todo: any) => todo.task.includes(search));
    }
    return [];
  }, [search, data]);

  const sortedTodos = useMemo(
    () =>
      filterTodo.sort((a: any, b: any) =>
        sortDirection === "0"
          ? a.task > b.task
            ? 1
            : -1
          : a.task > b.task
          ? -1
          : 1
      ),
    [filterTodo, sortDirection, data]
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
      {isPending && <p>Loading...</p>}
      {error && <p>Failed to fetch the data !!</p>}
      {sortedTodos.map((item: any) => (
        <center key={item.id}>
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
        <button
          className="btn btn-secondary m-2"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <b>
          {pageNumber}/{totalPages}
        </b>
        <button
          className="btn btn-secondary m-2"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber == totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList_withPagination;
