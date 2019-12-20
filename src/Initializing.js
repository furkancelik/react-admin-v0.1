import React, { useState, useEffect } from "react";
import Router from "./pages/router";
import Login from "./pages/Login";

export default function Initializing() {
  const [login, setLogin] = useState(true);

  async function isLoading() {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  useEffect(() => {
    isLoading();
  }, []);

  if (login === null) return <div>Yükleniyor...</div>;
  if (login) return <Router />;
  return <Login />;
}
