/** A User from the API
 * @property {string} id - The user's Discord ID
 * @property {string} username - The user's Discord username
 * @property {number} exp - The user's exp
 * @property {number} level - The user's current level
 * @property {number} weeklyExp - The user's weekly exp
 */
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
        this.exp = parseInt(data.exp, 10)

        /**
         * @description The user's current level
         * @type {number}
         */
        this.level = data.level

        /**
         * @description The user's current level
         * @type {number}
         */
        this.weeklyExp = parseInt(data.weeklyExp, 10)

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: data })
    }
}

module.exports = User