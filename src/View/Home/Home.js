import React, { Fragment, useEffect, useState } from "react";
import { ColorPalette } from "./Components";
const Home = () => {
  const [colorListB, setColorListB] = useState([]);
  let tempColorList = [];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    generateColor();
  });

  const generateColor = () => {
    const value = 8;
    var v = 255 / value;
    for (var rStep = 0, r = 0; rStep < v; rStep++) {
      for (var gStep = 0, g = 0; gStep < v; gStep++) {
        for (var bStep = 0, colorListB = 0; bStep < v; bStep++) {
          tempColorList.push(`${r},${g},${colorListB}`);
          colorListB += value;
        }
        g += value;
      }
      r += value;
    }
    setColorListB(tempColorList);
  };

  return (
    <Fragment>
      <section className="banner_part">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12 d-flex flex-row flex-wrap mt-1">
              <ColorPalette colorList={colorListB} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
