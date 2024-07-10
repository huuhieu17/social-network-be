class PaginationResponse {
    constructor(totalElement = 0, data) {
        this.totalElement = totalElement,
        this.data = data
    }
}

class PaginationRequest {
    constructor(page = 0, size = 10) {
        this.page = page,
        this.size = size
    }
}

module.exports = {
    PaginationResponse,
    PaginationRequest
};