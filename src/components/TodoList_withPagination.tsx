import { useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { ITodoElement } from "../types/todo";
import { fetchGet, fetchPatch } from "../services/api";
import { useQuery } from "@tanstack/react-query";

const initialValues = {
  checked: false,
  search: "",
  sortDirection: "0",
  totalPages: 1,
  pageNumber: 1,
};

const reducer = (currentState: any, action: any) => {
  switch (action.type) {
    case "setChecked":
      return { ...currentState, checked: action.value };
    case "setSearch":
      return { ...currentState, search: action.value };
    case "setSortDirection":
      return { ...currentState, sortDirection: action.value };
    case "setTotalPages":
      return { ...currentState, totalPages: action.value };
    case "setPageNumber":
      return { ...currentState, pageNumber: action.value };
  }
};

const TodoList_withPagination = () => {
  const navigate = useNavigate();
  const pageSize = 4;
  const [state, dispatch] = useReducer(reducer, initialValues);

  const handleStatus = (item: ITodoElement) => {
    dispatch({ type: "setChecked", value: !state.checked });
    const updatedItem = { ...item, isComplete: !item.isComplete };

    fetchPatch("/todos/" + item.id, updatedItem).then((res: any) => {
      console.log(res);
    });
    item.isComplete = !item.isComplete;
  };

  const handleCard = (item: ITodoElement) => {
    navigate(`/task/${item.id}`);
  };

  const { data, isPending, error } = useQuery({
    queryKey: [state.pageNumber, pageSize, state.search, state.checked],
    queryFn: async () => {
      const res = await fetchGet("/todos", {
        _page: state.pageNumber,
        _limit: pageSize,
        _sort: "title",
        // isComplete_like: checked,
      });
      dispatch({
        type: "setTotalPages",
        value: Math.ceil(res.headers["x-total-count"] / pageSize),
      });
      return res.data;
    },
  });
  // useEffect(()=>{
  //   setFilteredTodos(todos.filter((todo)=>todo.task.includes(search)))
  // },[search, filteredTodos])
  //or
  const filterTodo = useMemo(() => {
    if (data && Array.isArray(data)) {
      return data.filter((todo: any) => todo.task.includes(state.search));
    }
    return [];
  }, [state.search, data]);

  const sortedTodos = useMemo(
    () =>
      filterTodo.sort((a: any, b: any) =>
        state.sortDirection === "0"
          ? a.task > b.task
            ? 1
            : -1
          : a.task > b.task
          ? -1
          : 1
      ),
    [filterTodo, state.sortDirection, data]
  );
  return (
    <div className="blog-list text-center">
      <div style={{ display: "flex" }} className="justify-content-center">
        <input
          type="text"
          placeholder="Search Todos"
          value={state.search}
          className="m-2"
          onChange={(e) =>
            dispatch({ type: "setSearch", value: e.target.value })
          }
        />

        <label htmlFor="Sort" className="m-2">
          Sort :
        </label>
        <select
          onChange={(e) =>
            dispatch({ type: "setSortDirection", value: e.target.value })
          }
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
          onClick={() =>
            dispatch({ type: "setPageNumber", value: state.pageNumber - 1 })
          }
          disabled={state.pageNumber === 1}
        >
          Prev
        </button>
        <b>
          {state.pageNumber}/{state.totalPages}
        </b>
        <button
          className="btn btn-secondary m-2"
          onClick={() =>
            dispatch({ type: "setPageNumber", value: state.pageNumber + 1 })
          }
          disabled={state.pageNumber == state.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList_withPagination;