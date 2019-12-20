import React from "react";
import LoginPage from "../../components/Layout/LoginPage";
import { useQuery, useMutation } from "react-apollo-hooks";
import { LOGIN } from "../../store/queries";

export default function Login() {
  const [login, { loading, error }] = useMutation(LOGIN);

  function setToken(token) {
    localStorage.setItem("TOKEN", token);
    window.location = "/product";
  }

  async function onSubmit(input) {
    try {
      const { data } = await login({ variables: { data: input } });
      setToken(data.login.token);
      if (error) {
        alert(
          `Beklenmedik bir hata meydana geldi ve işleminiz gerçekleştirilemedi!\n ${error}`
        );
      }
    } catch (e) {
      alert(
        `Beklenmedik bir hata meydana geldi ve işleminiz gerçekleştirilemedi!\n ${e}`
      );
    }
  }

  return <LoginPage loading={loading} onSubmit={onSubmit} />;
}
