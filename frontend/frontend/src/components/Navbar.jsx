import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="dashboard-nav">
      <Link className="dashboard-brand" to="/">
        <span>Task</span> Manager Pro
      </Link>

      <div className="dashboard-nav__actions">
        <Link to="/dashboard">Dashboard</Link>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
