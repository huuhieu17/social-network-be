const { PaginationResponse } = require("../Object/Pagination");
const ResponseData = require("../Object/ResponseData");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken")
const authenticate = (req, res, next) => {
  
  const token = req.header && req.header("Authorization") && req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(200).json({
      message: "Access denied. No token provided.",
      status: "401",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(200).json({
      message: "Invalid token.",
      status: "400",
    });
  }
};

const findByUsername = async (username) => {
  const responseData = new ResponseData();
  const data = await Account.findOne({ username }).select("-password");
  responseData.data = data ? data.toJSON() : null;
  responseData.status = 200;
  responseData.message = "OK";
  return responseData;
};

const getAccountList = async (paginationRequest) => {
  const result = new PaginationResponse();
  const responseData = new ResponseData();
  try {
    result.totalElement = await Account.countDocuments().exec();
    result.data = await Account.find()
      .limit(paginationRequest.size)
      .skip(paginationRequest.size * paginationRequest.page)
      .exec();
    responseData.data = result;
    responseData.message = "OK";
    responseData.status = 200;
    return responseData;
  } catch (e) {
    console.log(e);
    responseData.data = [];
    responseData.message = `Error: ${JSON.stringify(e)}`;
    responseData.status = 500;
    return responseData;
  }
};

const createAccount = async (username, password, email, phone) => {
  const responseData = new ResponseData();
  try {
    const account = new Account({
      username,
      password,
      email,
      phone,
    });
    const result = await account.save();
    responseData.data = result;
    responseData.message = "Tạo thành công";
    responseData.status = 200;
    return responseData;
  } catch (e) {
    console.log(`Lỗi, ${e}`);
    responseData.data = null;
    responseData.message = `Lỗi, ${e}`;
    responseData.status = 500;
    return responseData;
  }
};

const findById = async (id) => {
  const responseData = new ResponseData();
  const data = await Account.findOne({ _id: id }).select("-password");
  const result = data.toJSON();
  responseData.data = data ? result : null;
  responseData.status = 200;
  responseData.message = "OK";
  return responseData;
};

module.exports = {
  authenticate,
  createAccount,
  getAccountList,
  findByUsername,
  findById,
};
