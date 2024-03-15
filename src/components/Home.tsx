import TodoList from "./TodoList";
import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data: todos } = useFetch('http://localhost:8000/todos')

  return (
    <div>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { todos && <TodoList todos={todos} /> }
    </div>
  );
}
 
export default Home;