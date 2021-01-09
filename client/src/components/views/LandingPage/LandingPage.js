import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents } from "./Sections/Datas";
function LandingPage() {
  const [productInfo, setproductInfo] = useState([]);
  const [skip, setskip] = useState(0);
  const [limit, setlimit] = useState(8);
  const [postSize, setpostSize] = useState(0);
  const [filters, setfilters] = useState([]);
  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };
    getPRoducts(body);
  }, []);

  const loadMoreHandler = () => {
    let tmpSkip = skip + limit;
    let body = {
      skip: tmpSkip,
      limit: limit,
      loadMore: true,
    };
    getPRoducts(body);
    setskip(tmpSkip);
  };

  const getPRoducts = (body) => {
    Axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setproductInfo([...productInfo, ...response.data.productInfo]);
        } else {
          setproductInfo(response.data.productInfo);
          console.log(response.data.productInfo);
        }
        setpostSize(response.data.postSize);
      } else {
        alert("상품 목록을 가져오는데 실패 했습니다.");
      }
    });
  };

  const renderCards = productInfo.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={product.price} />
        </Card>
      </Col>
    );
  });

  const handleFilters = () => {};

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>

      {/* Filter*/}

      <CheckBox
        list={continents}
        handleFilters={(filter) => {
          handleFilters(filters, "continents");
        }}
      />

      {/* RadioBox*/}

      {/* Search*/}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      {postSize >= limit && (
        <div style={{ justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
