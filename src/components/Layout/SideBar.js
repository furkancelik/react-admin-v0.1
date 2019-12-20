import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

function SideBar({ location: { pathname } }) {
  const activeLink = pathname.split("/");

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <NavLink to="/" className="brand-link">
        <span className="text-center d-block brand-text font-weight-light">
          YönetimPaneli
        </span>
      </NavLink>

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

            {/* <li className="nav-item">
              <NavLink
                to={"/admin/category"}
                isActive={(_, { pathname }) => {
                  return ["sub-category", "category"].includes(
                    pathname.split("/")[2]
                  );
                }}
                className={`nav-link`}
                activeClassName="active">
                <FontAwesomeIcon
                  fixedWidth
                  className={"nav-icon"}
                  icon={["fas", "network-wired"]}
                />
                <p>Kategoriler</p>
              </NavLink>
            </li> */}

            <li className="nav-item">
              <Link
                onClick={e => {
                  e.preventDefault();
                  localStorage.removeItem("TOKEN");
                  window.location = "/";
                }}
                className={`nav-link`}>
                <FontAwesomeIcon
                  fixedWidth
                  className={"nav-icon"}
                  icon={["fas", "power-off"]}
                />
                <p>Çıkış Yap</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default withRouter(SideBar);
