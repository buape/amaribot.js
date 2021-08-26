class Rewards {
    /**
     *
     * @constructs Rewards
     * @description This is set of the Rewards from a 
     */
    constructor(inputData = {}) {
        /**
         * @description The ID of the guild
         * @type {string}
         */
         this.count = inputData.id

        /**
         * @description The count of rewards the guild has
         * @type {number}
         */
        this.count = inputData.count

        /**
         * @description A map of all the rewards, and an array element is a Reward
         * @type {Map}
         */
        this.roles = new Map()
        inputData.data.forEach(x => {
            this.roles.set(x.level, x.roleId)
        })

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }
}

module.exports = Rewards