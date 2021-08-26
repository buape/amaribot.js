class User {
    /**
     *
     * @constructs User
     * @description A User from the API
     */
    constructor(data = {}) {
        /**
         * @description The user's Discord ID
         * @type {string}
         */
        this.id = data.id

        /**
         * @description The user's username
         * @type {string}
         */
        this.username = data.username

        /**
         * @description The user's exp
         * @type {number}
         */
        this.exp = data.exp

        /**
         * @description The user's current level
         * @type {number}
         */
        this.level = data.level

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: data })
    }
}

module.exports = User