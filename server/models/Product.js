const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxLength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      maxLength: 100,
      default: 0,
    },
    continents: {
      type: Number,
      default: 1,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//text 검색 시 인덱스 설정
productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 2,
      //검색 중요도 , title이 더 중요하게 설정
      //title은 5배로 , description 은  2배로 설정 ,,
      //default값은 1
    },
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
