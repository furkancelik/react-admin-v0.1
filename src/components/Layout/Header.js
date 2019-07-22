import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light border-bottom">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href={"#/"}>
            <FontAwesomeIcon icon={["fas", "bars"]} />
          </a>
        </li>
        {/* <li className="nav-item d-none d-sm-inline-block">
          <a href="#/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#/" className="nav-link">
            Contact
          </a>
        </li> */}
      </ul>

      {/* <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <FontAwesomeIcon icon={["fas", "search"]} />
            </button>
          </div>
        </div>
      </form> */}
    </nav>
  );
}
