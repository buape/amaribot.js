class APIError extends Error {
    constructor(response) {
        super();
        this.name = this.constructor.name;
        this.status = response.status;
        this.message = response.data?.error
    }
}

module.exports = APIError;