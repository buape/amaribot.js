import { RequestHandler } from "../RequestHandler"

export class BaseHandler {
	public _handler: RequestHandler
	constructor(handler: RequestHandler) {
		this._handler = handler
	}
}
