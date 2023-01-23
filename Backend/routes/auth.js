const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET = "CP and development both are important";
//Route:1 Create a User using POST "/api/auth". Dosen't require Auth
router.post(
  "/createUser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors return bad request and errors
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      // check whether user exists with this email or not
      let user = await User.findOne({ email: req.body.email });
      // console.log(user)
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      //password hashing for security
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);
      success=true
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route:2 login user
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be bland").exists(),
  ],
  async (req, res) => {
    //If there are errors return bad request and errors
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      // console.log("user",user);
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "Please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
//Route:3 get logged in user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
