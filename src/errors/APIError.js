/**
 * @extends Error
 * @property {string} name The type of error (APIError)
 * @property {number} status HTTP status of the error
 * @property {string} message The message of this error
 */

class APIError extends Error {
    constructor(response, data) {
        super();
        this.name = this.constructor.name;
        this.status = response.status;
        this.message = data ? data.error : undefined
    }
}

module.exports = APIError;