const express = require('express');
const { createAccount, getAccountList, authenticate } = require('../services/account');
const { PaginationRequest } = require('../Object/Pagination');

const accountRouter = express();
accountRouter.use(express.json());

/**
 * @openapi
 * /account:
 *  get:
 *     tags:
 *     - Account
 *     description: Lấy danh sách account
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: API is  running
 */
accountRouter.get("/", authenticate, async (req, res) => {
    const { page, size } = req.query;
    const paginateRequest = new PaginationRequest(page, size);
   
    const data = await getAccountList(paginateRequest);
    res.json(data)

})

/**
 * @openapi
 * /account:
 *  post:
 *     tags:
 *     - Account
 *     description: Lấy danh sách account
 *     produces:
*      - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: API is running
 */
accountRouter.post("/", async (req, res) => {
    const { username, password, email, phone } = req.body;
    const createAccountRes = await createAccount(username, password, email, phone)
    res.json(createAccountRes)
})


module.exports = accountRouter