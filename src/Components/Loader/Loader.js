import React from "react";

const Loader = ({ show }) => {
  return (
    <div className="loader" style={{ display: show ? "block" : "none" }}>
      <div className="loader_inner">
        <div className="loader_content">
          <div className="loadmore-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
