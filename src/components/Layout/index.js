import React from "react";
import "../../include/jQuery";
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "bootstrap";
import "admin-lte/dist/js/adminlte.min.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
library.add(fas, fab, far);

export default function Layout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <SideBar />
      <div className="content-wrapper">{children}</div>
      <Footer />
    </div>
  );
}
