import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "./auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/register", {
        name,
        email,
        password,
      });

      toast.success(res.data.message || "Registered Successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
        <p className="auth-kicker">Start organized</p>
        <h1>Create your account</h1>
        <p className="auth-copy">
          Build a private task dashboard for study, work, and personal plans.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>

      <aside className="auth-side">
        <div>
          <span>Built for momentum</span>
          <h2>Turn scattered work into a clean action list.</h2>
        </div>
      </aside>
    </main>
  );
}

export default Register;
