import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.style.css";
export default function LoginPage({ loading = false, onSubmit = null }) {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit && (await onSubmit({ ...input }));
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    <div className={"hold-transition login-page"}>
      <div class="login-box">
        <div class="login-logo">
          <b>Yönetim</b>Paneli
        </div>

        <div class="card">
          <div class="card-body login-card-body">
            <form action={"/homex"} onSubmit={handleSubmit} method="post">
              <div class="mb-3">
                <input
                  type="text"
                  name={"username"}
                  value={input.username}
                  onChange={handleChange}
                  class="form-control"
                  placeholder="Kullanıcı Adı"
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  name={"password"}
                  value={input.password}
                  onChange={handleChange}
                  class="form-control"
                  placeholder="Şifre"
                />
              </div>
              <div class="row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-block">
                    {loading ? (
                      <FontAwesomeIcon icon={["fas", "spinner"]} spin />
                    ) : (
                      "Giriş Yap"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
