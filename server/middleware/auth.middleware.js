import JWT from "jsonwebtoken";
import asyncHandler from "../service/asyncHandler.js";
import { CustomError, UnexpectedError } from "../util/customError.js";
import config from "../config/index.js";
import User from "../model/user.model.js";
import AuthRole from "../util/authRole.js";

// check if user is logged in, also sets req.user
export const isLoggedIn = asyncHandler(async (req, _res, next) => {
	let token;
	if (
		req.cookies?.token ||
		(req.headers?.authorization &&
			req.headers?.authorization.startsWith("Bearer"))
	) {
		token = req.cookies?.token || req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		throw new CustomError("Not authorized to access this route", 401);
	}

	try {
		const decodedJwtPayload = await JWT.verify(token, config.JWT_SECRET);
		if (!decodedJwtPayload) {
			throw new Error();
		}
		req.user = await User.findById(decodedJwtPayload._id, "name email role");
		next();
	} catch (err) {
		throw new UnexpectedError("Not authorized to access this route");
	}
});

// check if the user is ADMIN
export const isAdmin = (req, res, next) => {
	if (req.user?.role === AuthRole.ADMIN) {
		next();
	} else {
		res.status(403).json({
			success: false,
			message: "Not authorized to access this route",
		});
	}
};
