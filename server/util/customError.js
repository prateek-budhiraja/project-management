export class CustomError extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
}

export class UnexpectedError extends Error {
	constructor(message) {
		super("Something went wrong: " + message);
		this.code = 503;
	}
}

export class PropertyRequiredError extends Error {
	constructor(message) {
		super("Invalid request - " + message + " is required!");
		this.code = 403;
	}
}
