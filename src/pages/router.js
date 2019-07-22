import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Dashboard from "./Dashboard";
import NoMatch from "./404";

import {
  ProductCreate,
  ProductData,
  ProductDetail,
  ProductEdit
} from "./Product";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
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

export default App;
