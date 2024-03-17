import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <h1 className="text-white">Prajjwalkumar's Todo App</h1>
      <div className="links">
        <Link to="/" className="text-white m-2">
          Home
        </Link>
        <Link to="/create">
          <button className="btn btn-secondary text-white m-2">Add Todo</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;