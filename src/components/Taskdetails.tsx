import useFetch from "./useFetch";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Taskdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {error,isPending,data: todoItem} : any = useFetch("http://localhost:8000/todos/" + id);

  const handleClick = () => {
    fetch("http://localhost:8000/todos/" + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };


  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {todoItem && (
        <article>
          <h4>{id}</h4>
          <p><b>Task : </b>{ todoItem?.task}</p>
          <p><b>Status : </b>{todoItem?.isComplete === true ? "Completed" : "Incomplete"}</p>
          

          <div >
            <button  onClick={handleClick}> Delete Task </button>
            <Link to="/">
              <button > Back to Home </button>
            </Link>
          </div>
        </article>
      )}
    </div>
  );
};

export default Taskdetails;