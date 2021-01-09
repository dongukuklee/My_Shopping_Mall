import React from "react";
import { Carousel } from "antd";
const propTypes = {};

const defaultProps = {};

const ImageSlider = (props) => {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ImageSlider.propTypes = propTypes;
ImageSlider.defaultProps = defaultProps;
// #endregion

export default ImageSlider;
