import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Internal imports
import history from "./Store/history/index";
import routes from "./Routes/Routes";
import PrivateRoute from "./Routes/PrivateRoutes";
import LoginRoute from "./Routes/LoginRoute";
import Loader from "./Components/Loader";
import { setStartLoader, setStopLoader } from "./Store/action/loader";

// Style imports
import "./App.css";
import "./index.css";

const resolvePrivateRoutes = (routes) => {
  if (routes && Array.isArray(routes)) {
    return routes.map((route) => {
      if (route.isPrivate) {
        route.render = (props) => (
          <PrivateRoute component={route.component} {...props} />
        );
      }
      if (route.isAuth) {
        route.render = (props) => (
          <LoginRoute component={route.component} {...props} />
        );
      }
      if (route.routes) {
        resolvePrivateRoutes(route.routes);
      }
      return route;
    });
  }
};

function App(props) {
  const { loaderStatus } = props;
  return (
    <Router history={history} basename={process.env.PUBLIC_URL}>
      <Loader show={loaderStatus} />
      {renderRoutes(resolvePrivateRoutes(routes))}
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    toast: state.loader.toast,
    loaderStatus: state.loader.loaderStatus,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setStartLoader,
      setStopLoader,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
