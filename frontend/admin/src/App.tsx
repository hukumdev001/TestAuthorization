import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import store from "@redux/store";

import { createBrowserHistory } from "history";

import Navigation from "./navigation";

// Module Federation Imports
import Layout from "./Layout";

import "./index.scss";

  import "react-toastify/dist/ReactToastify.css";

export const history = createBrowserHistory({ window });

const App = () => {
  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <HistoryRouter history={history}>
        <Layout>
          <ToastContainer />

          <Navigation />
        </Layout>
      </HistoryRouter>
      {/* </BrowserRouter> */}
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
