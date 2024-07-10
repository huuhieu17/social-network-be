const express = require("express");
const ResponseData = require("../Object/ResponseData");
const { findByUsername, createAccount, findById, authenticate } = require("../services/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = express();
authRouter.use(express.json());

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const account = await findByUsername(username);
  const responseData = new ResponseData();

  const accountPassword = account.data?.password || "";
  const isMatch = await bcrypt.compare(password, accountPassword);
  if (!account || !account.data || !isMatch) {
    responseData.data = null;
    responseData.message = "Thông tin tài khoản mật khẩu không chính xác";
    responseData.status = 401;
    return res.json(responseData);
  }

  const token = jwt.sign({ id: account.data._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  delete account.data?.password;
  responseData.data = { ...account.data, token };
  responseData.message = "Đăng nhập thành công";
  responseData.status = 200;
  return res.json(responseData);
});

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await createAccount(username, password, email);
  return res.json(result);
});

/**
 * @openapi
 * /auth/me:
 *  get:
 *     tags:
 *     - Authenticate
 *     description: Thông tin user
 *     responses:
 *       200:
 *         description: API is  running
 */

// Get user info
authRouter.get("/me", authenticate, async (req, res) => {
  const responseData = new ResponseData();
  const { headers } = req;
  const token = headers.authorization;
  const parseJwt = jwt.decode(token.replace("Bearer ", ""));
  const {id} = parseJwt;
  if(!id){
    responseData.data = null;
    responseData.message = "Không tìm thấy thông tin user";
    responseData.status = 401;
    return res.json(responseData);
  }
  const account = await findById(id);
  return res.json(account)

});

module.exports = authRouter;
