import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";

import Dashboard from "./Dashboard";
import NoMatch from "./404";

import {
  ProductCreate,
  ProductData,
  ProductDetail,
  ProductEdit
} from "./Product";
import sessionWrapperHOC from "./sessionWrapperHOC";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* 
        Eğer / dizini boş ise / adresini /dashboard yönlendirebilirsin!
        <Route exact path="/">
          <Redirect to={{ pathname: "/dashboard" }} />
        </Route> */}
        <Route exact path="/" component={Dashboard} />

        {/*Product Page */}
        <Route exact path="/product" component={ProductData} />
        <Route path="/product/create" component={ProductCreate} />
        <Route path="/product/detail/:id" component={ProductDetail} />
        <Route path="/product/edit/:id" component={ProductEdit} />

        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default sessionWrapperHOC(App);
