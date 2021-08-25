class User {
    constructor(data = {}) {
        /**
         * The user's Discord ID
         * @type {string}
         */
        this.id = data.id

        /**
         * The user's username
         * @type {string}
         */
        this.username = data.username

        /**
         * The user's exp
         * @type {number}
         */
        this.exp = data.exp

        /**
         * The user's current level
         * @type {number}
         */
        this.level = data.level

        /**
         * Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: data })
    }
}

module.exports = User