import mongoose from "mongoose";

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
	password: {
		type: String,
		required: [true, "Password is required"],
	},
});

export default mongoose.model("User", userSchema);
