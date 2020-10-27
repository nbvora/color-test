import React, { Suspense, Fragment } from "react";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
// import TopBar from "./Components/TopBar";
import Footer from "./Components/Footer";
import Loader from "../../Components/Loader";

const Guest = (props) => {
  const { route } = props;

  return (
    <Fragment>
      <Suspense fallback={<Loader show={true} />}>
        {renderRoutes(route.routes)}
      </Suspense>
      <Footer />
    </Fragment>
  );
};

Guest.propTypes = {
  route: PropTypes.object,
};

export default Guest;
