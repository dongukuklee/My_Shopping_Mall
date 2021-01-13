import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
const continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
];

const propTypes = {};

const defaultProps = {};

const UploadProductPage = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [continent, setContinent] = useState("");
  const [images, setImages] = useState([]);

  const StateChangeHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log("event Tartget name :" + name);
    console.log("event Tartget value :" + value);
    switch (name) {
      case "title":
        setTitle(e.currentTarget.value);
        break;
      case "description":
        setDescription(e.currentTarget.value);
        break;
      case "price":
        setPrice(e.currentTarget.value);
        break;
      case "continent":
        setContinent(e.currentTarget.value);

        break;
      default:
        break;
    }
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !description || !price || !continent || !images) {
      console.log(images);
      return alert("모든 값을 입력해주세요");
    }

    //서버에 채운 값들을 req해준다

    const body = {
      writer: props.user.userData._id,
      title: title,
      description: description,
      price: price,
      images: images,
      continents: continent,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공 했습니다.");
        console.log(response.data);
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패 하였습니다.");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br></br>
        <label>이름</label>
        <Input name="title" onChange={StateChangeHandler} value={title} />
        <br></br>
        <label>설명</label>
        <TextArea
          name="description"
          onChange={StateChangeHandler}
          value={description}
        />
        <br></br>
        <label>가격(₩)</label>
        <Input name="price" onChange={StateChangeHandler} value={price} />
        <br></br>
        <select name="continent" onChange={StateChangeHandler}>
          {continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br></br>
        <Button htmlType="submit">확인</Button>
      </Form>
    </div>
  );
};

UploadProductPage.propTypes = propTypes;
UploadProductPage.defaultProps = defaultProps;

export default UploadProductPage;
