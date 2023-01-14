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
 * @description Update User role
 * @parameters uid, role
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

/**************************************************
 * @DELETE_USER
 * @REQUEST_TYPE DELETE
 * @route http://localhost:<PORT>/api/auth/delete/<UID>
 * @description Delete role
 * @parameters uid
 * @returns Message
 **************************************************/

export const deleteUser = asyncHandler(async (req, res) => {
	const { uid } = req.params;
	if (!uid) {
		throw new PropertyRequiredError("User ID");
	}

	const deletedUser = await User.findByIdAndDelete(uid);

	if (!deletedUser) {
		throw new UnexpectedError("Unable to delete user");
	}

	res.status(200).json({
		success: true,
		message: "User is deleted",
	});
});

/**************************************************
 * @LOGOUT
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/auth/logout
 * @description Logout user
 * @parameters
 * @returns Message
 **************************************************/

export const logout = (req, res) => {
	req.user = undefined;
	res.cookie("token", null, {
		httpOnly: true,
		expires: new Date(Date.now()),
	});

	res.status(200).json({
		success: true,
		message: "User logged out successfully",
	});
};

/**************************************************
 * @GET_ALL_USERS
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/auth/users
 * @description Logout user
 * @parameters
 * @returns Message
 **************************************************/

export const users = asyncHandler(async (_req, res) => {
	const users = await User.find();
	if (!users) {
		throw new UnexpectedError("Unable to fetch user data");
	}
	res.status(200).json({
		success: true,
		users,
	});
});

/**************************************************
 * @UPDATE_PASSWORD
 * @REQUEST_TYPE Patch
 * @route http://localhost:<PORT>/api/auth/update/password/<UID>
 * @description Update user password
 * @parameters uid, password
 * @returns Success message
 **************************************************/

export const updatePassword = asyncHandler(async (req, res) => {
	const { uid } = req.params;
	if (!uid) {
		throw new PropertyRequiredError("User ID");
	}

	const { password } = req.body;

	const user = await User.findById(uid).select("+password");
	if (!user) {
		throw new UnexpectedError("Unable to change password");
	}
	user.password = password;
	await user.save();

	res.status(200).json({
		success: true,
		message: "Password updated successfully",
	});
});
