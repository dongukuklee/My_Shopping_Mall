import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchFeature = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const SearchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "1rem auto",
      }}
    >
      <Search
        placeholder="input search text"
        onChange={SearchHandler}
        style={{ width: 200 }}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchFeature;
