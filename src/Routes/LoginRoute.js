import React from "react";
import { Redirect, Route } from "react-router-dom";
const LoginRoute = ({ component: Component, trackPage, ...rest }) => {
  const userToken = 2;
  return (
    <Route
      {...rest}
      render={(props) => {
        trackPage(props.location.pathname);
        return !userToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default LoginRoute;
