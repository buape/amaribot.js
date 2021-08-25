class Rewards {
    constructor(inputData = {}) {
        /**
         * The ID of the guild
         * @type {string}
         */
         this.count = inputData.id

        /**
         * The count of rewards the guild has
         * @type {number}
         */
        this.count = inputData.count

        /**
         * A map of all the rewards
         * An array element is a Reward
         * @type {Map}
         * @property
         */
        this.roles = new Map()
        inputData.data.forEach(x => {
            this.roles.set(x.level, x.roleId)
        })

        /**
         * Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }
}

module.exports = Rewards