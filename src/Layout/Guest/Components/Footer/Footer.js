import React, { Fragment } from "react";

const Footer = (props) => {
  return (
    <Fragment>
      <footer className="footer_part">
        <div className="container">
          <div className="row justify-content-around"></div>
        </div>
        <div className="copyright_part">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright_text">
                  <p>Copyright &copy; 2020. Color-Test All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
