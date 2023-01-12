import User from "../model/user.model.js";
import asyncHandler from "../service/asyncHandler.js";
import role from "../util/authRole.js";
import {
	CustomError,
	PropertyRequiredError,
	UnexpectedError,
} from "../util/customError.js";

/**************************************************
 * @HOME
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/auth
 * @description Home route for auth API
 * @parameters
 * @returns
 **************************************************/

export const home = (_req, res) => {
	res.status(204).send("api auth home");
};

/**************************************************
 * @SIGNUP
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/auth/signup
 * @description Create new user
 * @parameters name, email, password
 * @returns User
 **************************************************/

export const signup = asyncHandler(async (req, res) => {
	const { name, email, password, role } = req.body;
	if (!(name && email && password)) {
		throw new PropertyRequiredError("Name, Email and Password");
	}

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new CustomError("Invalid Credentials", 403);
	}

	const user = await User.create({
		name,
		email,
		password,
		role: role || role.USER,
	});

	if (!user) {
		throw new UnexpectedError("Unable to create new user");
	}

	user.password = undefined;

	res.status(201).json({
		success: true,
		user,
	});
});
