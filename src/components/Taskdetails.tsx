import useFetch from "./useFetch";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { fetchDelete } from "../service/fetchData";
import { toast } from "react-toastify";

const Taskdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const routes = "/todos/";
  const {
    error,
    isPending,
    data: todoItem,
  }: any = useFetch(process.env.REACT_APP_BASE_URL + routes + id);

  const handleDelete = async () => {
    if (await fetchDelete(id)) {
      toast.warning("Task Successfully Deleted !!");
      navigate("/");
    }
  };

  return (
    <div className="task-details text-center">
      <center>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {todoItem && (
          <article>
            <div className="card bg-light mt-3 w-50 border-right-0 border-secondary rounded-bottom">
              <div className="card-header">
                ,<h3>{id}</h3>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  <b>Task : </b>
                  {todoItem?.task}
                </h5>
                <p className="card-text">
                  <p>
                    <b>Description : </b>
                    {todoItem?.description}
                  </p>
                  <p>
                    <b>Assigned By : </b>
                    {todoItem?.assignee}
                  </p>
                  <p>
                    <b>Due Date : </b>
                    <u>{todoItem?.dueDate}</u>
                  </p>
                  <p>
                    <b>Status : </b>
                    {todoItem?.isComplete === true ? "Completed" : "Incomplete"}
                  </p>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  className="btn btn-secondary m-2"
                  onClick={handleDelete}
                >
                  {" "}
                  Delete Task{" "}
                </button>
                <Link to="/">
                  <button className="btn btn-secondary"> Back to Home </button>
                </Link>
              </div>
            </div>
          </article>
        )}
      </center>
    </div>
  );
};

export default Taskdetails;