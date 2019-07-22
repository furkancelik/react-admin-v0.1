import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

function SideBar({ location: { pathname } }) {
  const activeLink = pathname.split("/");

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="#link" className="brand-link">
        <img
          src="/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">YönetimPaneli</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false">
            {/* <li className="nav-item has-treeview menu-open">
              <a href="#/" className="nav-link active">
                <FontAwesomeIcon
                  className={"nav-icon"}
                  icon={["fas", "tachometer-alt"]}
                />
                <p>
                  Stok
                   <FontAwesomeIcon
                    fixedWidth
                    className={"right"}
                    icon={["fas", "angle-left"]}
                  /> 
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#/" className="nav-link active">
                    <FontAwesomeIcon
                      fixedWidth
                      className={"nav-icon"}
                      icon={["far", "circle"]}
                    />
                    <p>Active Page</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#/" className="nav-link">
                    <FontAwesomeIcon
                      fixedWidth
                      className={"nav-icon"}
                      icon={["far", "circle"]}
                    />
                    <p>Inactive Page</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#/" className="nav-link">
                <FontAwesomeIcon
                  fixedWidth
                  className={"nav-icon"}
                  icon={["fas", "th"]}
                />
                <p>Simple Link</p>
              </a>
            </li> */}

            {/* className={`nav-link ${
              ["products", "product"].indexOf(activeLink[1]) >= 0
                ? "active"
                : ""
              }`}
               */}
            <li className="nav-item">
              <NavLink
                to="/product"
                className={`nav-link`}
                activeClassName="active">
                <FontAwesomeIcon
                  fixedWidth
                  className={"nav-icon"}
                  icon={["fas", "box-open"]}
                />
                <p>Stok</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default withRouter(SideBar);
