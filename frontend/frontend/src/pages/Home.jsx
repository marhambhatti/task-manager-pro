import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import "./home.css";

function Home() {
  const hasToken = Boolean(localStorage.getItem("token"));

  return (
    <main className="home-page">
      <section className="home-hero">
        <img className="home-hero__image" src={heroImage} alt="" />
        <div className="home-hero__shade" />

        <nav className="home-nav" aria-label="Primary navigation">
          <Link className="home-brand" to="/">
            Task Manager Pro
          </Link>
          <div className="home-nav__links">
            <Link to="/login">Login</Link>
            <Link className="home-nav__button" to={hasToken ? "/dashboard" : "/register"}>
              {hasToken ? "Dashboard" : "Get Started"}
            </Link>
          </div>
        </nav>

        <div className="home-hero__content">
          <p className="home-kicker">Plan smarter. Finish calmer.</p>
          <h1>Task Manager Pro</h1>
          <p className="home-copy">
            A focused workspace for assignments, projects, priorities, and daily tasks.
          </p>

          <div className="home-actions">
            <Link className="home-action home-action--primary" to={hasToken ? "/dashboard" : "/register"}>
              {hasToken ? "Open Dashboard" : "Create Account"}
            </Link>
            <Link className="home-action home-action--secondary" to="/login">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="home-overview" aria-label="Project overview">
        <div className="home-overview__item">
          <span>01</span>
          <strong>Add tasks fast</strong>
          <p>Capture work before it slips away.</p>
        </div>
        <div className="home-overview__item">
          <span>02</span>
          <strong>Keep ownership clear</strong>
          <p>Your dashboard is protected with login access.</p>
        </div>
        <div className="home-overview__item">
          <span>03</span>
          <strong>Move onward</strong>
          <p>Start at home, then continue into your task dashboard.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
