// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand">Quizie</Link>
      <div className="d-flex align-items-center gap-2">
        {user ? (
          <>
            <Link to="/submissions" className="btn btn-outline-secondary">My Submissions</Link>
            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-outline-success">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
