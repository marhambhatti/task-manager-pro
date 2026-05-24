import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="auth-brand" to="/">
          Task Manager Pro
        </Link>
        <p className="auth-kicker">Welcome back</p>
        <h1>Sign in to your workspace</h1>
        <p className="auth-copy">
          Continue planning your assignments, work, and daily priorities.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </section>

      <aside className="auth-side">
        <div>
          <span>Focused task flow</span>
          <h2>Keep today clear and tomorrow ready.</h2>
        </div>
      </aside>
    </main>
  );
}

export default Login;
