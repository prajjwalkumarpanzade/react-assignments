import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Todo App</h1>
      <div className="links">
        <Link to="/" >Home</Link>
        <Link to="/create"> <button>Add Todo</button></Link>
      </div>
    </nav>
  );
}
 
export default Navbar;