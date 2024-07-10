const express = require('express');
const { createAccount, getAccountList } = require('../services/account');
const { PaginationRequest } = require('../Object/Pagination');

const accountRouter = express();
accountRouter.use(express.json());

accountRouter.get("/", async (req, res) => {
    const { page, size } = req.query;
    const paginateRequest = new PaginationRequest(page, size);
   
    const data = await getAccountList(paginateRequest);
    res.json(data)

})

accountRouter.post("/", async (req, res) => {
    const { username, password, email, phone } = req.body;
    const createAccountRes = await createAccount(username, password, email, phone)
    res.json(createAccountRes)
})


module.exports = accountRouter