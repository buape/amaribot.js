class APIError extends Error {
    constructor(response) {
        super();
        this.name = this.constructor.name;
        this.status = response.status;
        this.message = response.data ? response.data.error : undefined
    }
}

module.exports = APIError;