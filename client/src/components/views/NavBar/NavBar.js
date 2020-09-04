import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const NavBar = () => {
  const histoty = useHistory();
  const auth = useContext(AuthContext);

  const logoutSubmit = (e) => {
    e.preventDefault();
    auth.logout();
    histoty.push("/login");
  };

  return (
    <nav>
      <div className="nav-wrapper grey darken-1" style={{ padding: "0 2rem" }}>
        <a href="/" className="brand-logo">
          Links Shortener - lnks.sh
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">My Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutSubmit}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
