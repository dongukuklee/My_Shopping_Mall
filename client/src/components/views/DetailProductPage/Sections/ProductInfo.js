import React, { useState, useEffect } from "react";
import { Button, Descriptions } from "antd";
const ProductInfo = (props) => {
  const ClickHandler = (e) => {
    e.preventDefault();
    console.log("장바구니에 추가 하였씁니다.");
  };
  return (
    <div>
      <Descriptions title="ProductInfo">
        <Descriptions.Item label="Price">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold"> {props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={ClickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
