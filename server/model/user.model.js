import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/index.js";
import role from "../util/authRole.js";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	email: {
		type: String,
		unique: [true, "Email already exists"],
		lowercase: true,
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: "Please enter a valid email",
		},
	},
	role: {
		type: String,
		enum: Object.values(role),
		default: role.USER,
		required: [true, "User role is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		select: false,
	},
});

// encrypt the password before saving it to db
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods = {
	// compare encrypted password
	comparePassword: async function (plainPassword) {
		return await bcrypt.compare(plainPassword, this.password);
	},

	// generate jwt token
	getJwtToken: async function () {
		return JWT.sign(
			{
				_id: this._id,
				email: this.email,
				role: this.role,
			},
			config.JWT_SECRET,
			{
				expiresIn: config.JWT_EXPIRY,
			}
		);
	},
};

export default mongoose.model("User", userSchema);
