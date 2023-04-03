/**
 * @extends Error
 * @property {string} name The type of error (APIError)
 * @property {number} status HTTP status of the error
 * @property {string} message The message of this error
 */

import { APIError, CustomResponse } from ".."

export class AmariError extends Error {
	name: string
	status: number
	message: string

	constructor(response: CustomResponse, data?: APIError) {
		super()
		this.name = this.constructor.name
		this.status = response.status
		this.message = data ? data.error : "No message provided"
	}
}
