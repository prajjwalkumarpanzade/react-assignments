import { useQuery } from "@tanstack/react-query";
import TodoList from "./TodoList";
import TodoList_withPagination from "./TodoList_withPagination";
import useFetch from "../custom_hooks/useFetch";

const Home = () => {
  const {
    error,
    isPending,
    data: todos,
  } = useFetch(process.env.REACT_APP_BASE_URL + "/todos");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {/* {todos && <TodoList todos={todos} />} */}
      <TodoList_withPagination />
    </div>
  );
};

export default Home;