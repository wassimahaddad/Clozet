const jwt = require("jsonwebtoken");
const { PASS_PHRASE } = require("../../config/keys");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    // const token = req.header("Authorization").replace("Bearer ", "");
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, PASS_PHRASE);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token, //if token is in the array of tokens
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;
