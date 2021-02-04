import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty } from "antd";
import Paypal from "../../utils/Paypal";

const CartPage = (props) => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const [showTotal, setShowTotal] = useState(false);
  useEffect(() => {
    let cartItems = [];
    //리덕스 User state에 cart 안에 상품이 들어있느지 확인.
    //Auth 에서 가져온 props data
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowTotal(false);
      }
    });
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Card</h1>
      <div>
        <UserCardBlock
          product={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {showTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h2>Total Amount: ${total}</h2>
          </div>
        ) : (
          <>
            <br />
            <Empty description={false} />
            <br />
            <h2>카트에 상품이 없습니다.</h2>
          </>
        )}
        {showTotal && <Paypal total={total} onSuccess={transactionSuccess} />}
      </div>
    </div>
  );
};

export default CartPage;
