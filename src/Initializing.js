import React from "react";
import Router from "./pages/router";
import Login from "./pages/Login";

export default function Initializing() {
  const login = true;
  if (login) {
    return <Router />;
  }
  return <Login />;
}
