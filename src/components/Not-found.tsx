import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry :(</h2>
      <h4>404-Not Found </h4>
      <p>The page you are looking for, cannot be found !!</p>
      <Link to="/"> <button className="btn btn-secondary"> Back to Homepage </button></Link>
    </div>
  );
}
 
export default NotFound;