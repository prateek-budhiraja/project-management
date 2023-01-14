import User from "../model/user.model.js";
import asyncHandler from "../service/asyncHandler.js";
import AuthRole from "../util/authRole.js";
import { options } from "../config/cookieOptions.js";
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
 * @LOGIN
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/auth/login
 * @description Login a user
 * @parameters email, password
 * @returns User
 **************************************************/

export const login = asyncHandler(async (req, res) => {
	const { password, email } = req.body;
	if (!(email && password)) {
		throw new PropertyRequiredError("Email and Password");
	}

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new CustomError("Invalid Credentials", 403);
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		throw new CustomError("Invalid Credentials", 403);
	}

	user.password = undefined;

	const token = await user.getJwtToken();

	res.cookie("token", token, options);

	res.status(201).json({
		success: true,
		user,
	});
});

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
		role: role || AuthRole.USER,
	});

	if (!user) {
		throw new UnexpectedError("Unable to create new user");
	}

	user.password = undefined;

	const token = await user.getJwtToken();

	res.cookie("token", token, options);

	res.status(201).json({
		success: true,
		user,
	});
});

/**************************************************
 * @PROFILE
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/auth/profile
 * @description Profile page for user
 * @parameters
 * @returns User
 **************************************************/

export const profile = asyncHandler(async (req, res) => {
	const { user } = req;
	res.status(200).json(user);
});

/**************************************************
 * @UPDATE_ROLE
 * @REQUEST_TYPE PATCH
 * @route http://localhost:<PORT>/api/auth/update/<UID>
 * @description Update User account
 * @parameters name, email, password, role
 * @returns User
 **************************************************/

export const updateRole = asyncHandler(async (req, res) => {
	const { uid } = req.params;
	if (!uid) {
		throw new PropertyRequiredError("User ID");
	}

	const { role } = req.body;
	if (!role) {
		throw new PropertyRequiredError("Role");
	}

	const updatedUser = await User.findByIdAndUpdate(
		uid,
		{
			role,
		},
		{ new: true, runValidators: true }
	);

	if (!updatedUser) {
		throw new UnexpectedError("Unable to update role");
	}

	res.status(201).json({
		success: true,
		user: updatedUser,
	});
});
