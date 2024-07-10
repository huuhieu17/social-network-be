const { PaginationResponse } = require("../Object/Pagination");
const ResponseData = require("../Object/ResponseData");
const Account = require("../models/Account")

const getAccountList = async (paginationRequest) => {
    const result = new PaginationResponse();
    const responseData = new ResponseData()
    try{
        result.totalElement = await Account.countDocuments().exec(); 
        result.data = await Account.find().limit(paginationRequest.size).skip(paginationRequest.size * paginationRequest.page).exec();
        responseData.data = result
        responseData.message = "OK"
        responseData.status = 200;
        return responseData
    }catch(e){
        console.log(e)
        responseData.data = [];
        responseData.message = `Error: ${JSON.stringify(e)}`;
        responseData.status = 500
        return responseData
    }
}

const createAccount = async (username, password, email, phone) => {
    const responseData = new ResponseData()
    try{
        const account = new Account({
            username,
            password,
            email,
            phone
        })
        const result = await account.save()
        responseData.data = result;
        responseData.message = "Tạo thành công";
        responseData.status = 200;
        return responseData;
    }catch(e){
        console.log(`Lỗi, ${e}`)
        responseData.data = null;
        responseData.message = `Lỗi, ${e}`
        responseData.status = 500
        return responseData;
    }
}

module.exports = {
    createAccount,
    getAccountList
}