/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import GuestLayout from "../Layout/Guest";

const routes = [
  {
    path: "/auth",
    component: GuestLayout,
    // AuthLayout,
    routes: [
      {
        component: () => <Redirect to="/auth" />,
      },
    ],
  },
  {
    route: "*",
    component: GuestLayout,
    routes: [
      {
        path: "/",
        exact: true,
        component: lazy(() => import("../View/Home")),
        isPrivate: false,
      },
      {
        component: () => <Redirect to="/" />,
      },
    ],
  },
];

export default routes;
