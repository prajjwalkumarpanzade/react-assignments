import TodoList from "./TodoList";
import useFetch from "./useFetch";

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
      {todos && <TodoList todos={todos} />}
    </div>
  );
};

export default Home;