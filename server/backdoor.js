import User from "./model/user.model.js";
import AuthRole from "./util/authRole.js";
import { UnexpectedError } from "./util/customError.js";

export async function createFirstAdmin() {
	const email = "admin@admin.com";
	const existingAdmin = await User.findOne({ email });
	if (existingAdmin) {
		return;
	}

	const user = await User.create({
		name: "admin",
		email,
		password: "admin",
		role: AuthRole.ADMIN,
	});
}
