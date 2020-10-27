import React, { Fragment, useEffect, useState } from "react";

const ColorPalette = (props) => {
  const { colorList } = props;
  const [dWidth, setDWidth] = useState(0);

  useEffect(() => {
    let displayLength = parseInt((window.innerWidth - 124) / 30);
    console.log(displayLength);
    setDWidth(displayLength);
  }, []);

  return (
    <Fragment>
      {colorList.map((color, index) => (
        <div
          style={{
            background: `rgb(${color})`,
            width: `${dWidth}px`,
            height: "24px",
            overflow: "hidden",
          }}
        >
          {/* `rgb(${color})` */}
        </div>
      ))}
    </Fragment>
  );
};

export default ColorPalette;
