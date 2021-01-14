import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents, price } from "./Sections/Datas";

function LandingPage() {
  const [productInfo, setProductInfo] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
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
    setSkip(tmpSkip);
  };

  const getPRoducts = (body) => {
    Axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProductInfo([...productInfo, ...response.data.productInfo]);
        } else {
          setProductInfo(response.data.productInfo);
          console.log(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
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

  const showFilteredResult = (filters) => {
    let body = {
      skip: 0,
      limit: limit,
      filters: filters,
    };

    getPRoducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };
  const handleFilters = (filters, category) => {
    const newFilters = { ...filters };
    newFilters[category] = filters;

    console.log("필터", filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResult(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>

      {/* Filter*/}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(filters) => {
              handleFilters(filters, "continents");
            }}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => {
              handleFilters(filters, "price");
            }}
          />
        </Col>
      </Row>

      {/* RadioBox*/}

      <SearchFeature refreshFunction={updateSearchTerm} />
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
