import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./NavBar.css";

export default function NavBar() {
  const { userState, signOut } = useContext(AuthContext);

  return (
    <nav>
      <div>
        <div>
          <div
            class="shadow--outset"
            style={{ fontSize: "20px", color: "#75809b" }}
          >
            FitCamp
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div class="shadow--inset navbar-buttons">
            {!userState ? (
              <>
                <Link to="/signin">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <Link>
                <Link to="/home">Home</Link>
                <Link to="/progress">Progress</Link>
                <a onClick={signOut}>Log out</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
    /*<nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="#" className="brand-logo">
          Logo
        </a>
        <ul className="right hide-on-med-and-down">
          {!userState ? (
            <>
              <li>
                <Link to="/signin">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/progress">Progress</Link>
              </li>
              <li>
                <a onClick={signOut}>Log out</a>
              </li>
            </>
          )}
        </ul>

      </div>
    </nav>*/
  );
}
