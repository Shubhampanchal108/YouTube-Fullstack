const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const { uploadFile } = require("../Configs/Cloudinary");
const bcrypt = require("bcrypt");

//SignUp
const UserSignUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const profilePic = req.file || "";

    if (!name || !username || !email || !password) {
      return res.json({ msg: "Fields are required", success: false });
    }

    const userExists = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return res.json({ msg: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const respone = await uploadFile(profilePic.path);
    const profileImg = respone.secure_url;

    const user = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
      profilePic: profileImg,
    });
    await user.save();

    payload = {
      name,
      username,
      email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({
      msg: "SignUp Successfully",
      success: true,
      jwt: token,
      name,
      username,
      email,
      id: user._id,
      profilePic,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

//Get User
const getUser = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.json({ users, success: true });
  } catch (error) {
    console.log(error);
  }
};

//userLogin
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ msg: "fields required", success: false });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.json({ msg: "Sorry user not exists", success: false });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.json({ msg: "Invalid Password", success: false });
    }

    const payload = {
      email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({
      msg: "Login Successfully",
      success: true,
      jwt: token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

//Show single user
const singleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById({ _id: id });

    if (!user) {
      return res.json({ msg: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { UserSignUp, getUser, userLogin, singleUser };
