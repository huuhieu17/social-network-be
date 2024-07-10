class ResponseData {
    constructor(message, status, data){
        this.message = message;
        this.status = status;
        this.data = data ?? null;
    }
}

module.exports = ResponseData;