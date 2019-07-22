import React from "react";
import ReactDOM from "react-dom";
import Initializing from "./Initializing";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import * as serviceWorker from "./serviceWorker";
import { API_URL } from "./config";
const client = new ApolloClient({
  uri: API_URL,
  fetchOptions: {
    credentials: "include"
  },
  request: async operation => {
    const token = `${localStorage.getItem("TOKEN")}`;
    operation.setContext({
      headers: {
        authorization: token || null
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Initializing />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
