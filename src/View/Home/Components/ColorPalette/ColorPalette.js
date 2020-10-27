import React, { Fragment } from "react";

const ColorPalette = (props) => {
  const { colorList } = props;

  return (
    <Fragment>
      <div
        style={{ width: "128px", height: "256px" }}
        className="d-flex flex-row flex-wrap"
      >
        {colorList.map((color, index) => (
          <div
            style={{
              background: `rgb(${color})`,
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            {/* `rgb(${color})` */}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ColorPalette;
