const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  // User Collection 에 해당 유저의 정보를 가져오기

  // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인한다.
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      console.log("상품이 이미 있습니다.");
      User.findOneAndUpdate(
        { _id: req.user.id, "cart.id": req.body.productId }, //user id 가 req.body.id 와 같은 것을 찾고 , cart.id 가 req.body.productId와 같은 것을 찾는다
        { $inc: { "cart.$.quantity": 1 } }, //$inc 는 증가 시켜주는 명령어 , "cart.$.quantity" 의 값을 1 증가 시켜준다.
        { new: true }, // 쿼리를 돌린 후 결과값을 가진 후 업데이트된 정보를 가지려면 {new :true} 를 써줘야함
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    } //상품이 있지 않을때
    else {
      console.log("새로운 상품을 추가합니다.");
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
  //상품이 이미 있을때
});

router.get("/removeFromCart", auth, (req, res) => {
  console.log("router");
  //User collection 에 cart안에 내가 지우려고 한 상품을 지워준다.
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      //데이터를 뺄때는 mongoDB 메소드인 pull을 이용한다.
      $pull: {
        cart: { id: req.query.id },
      },
    },
    { new: true },
    //product collection에서 현재 남아있는 상품들의 정보 가져오기.
    //productId를 이용해서 DB에서 produyctId와 같은 상품의 정보를 가져온다.

    (err, userInfo) => {
      console.log(req.user);
      console.log(req.query.id);
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate("write")
        .exec((err, productInfo) => {
          return res.status(200).json({
            productInfo,
            cart,
          });
        });
    }
  );
});

router.post("/successBuy", auth, (req, res) => {
  //1. User Collection 안에 History 필드 안에 간단한 결제 정보 넣어주기

  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });
  //2. Payment Collection 안에 자세한 결제 정보들 넣어주기
  //3. Product Collection 안에 Sold 필드 정보 업데이트 시켜주기
});
module.exports = router;
