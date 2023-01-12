import mongoose, { model, Schema } from "mongoose";
import { ProjectStatus, TaskStatus } from "../util/status.js";

const projectSchema = mongoose.Schema({
	status: {
		type: String,
		enum: Object.values(ProjectStatus),
		default: ProjectStatus.ACTIVE,
		required: [true, "Project Status is required"],
	},
	name: {
		type: String,
		required: [true, "Project name is required"],
	},
	tasks: [
		{
			name: {
				type: String,
				required: [true, "Task name is required"],
			},
			assigned_to: {
				type: Schema.Types.ObjectId,
				ref: "User",
				required: false,
			},
			status: {
				type: String,
				enum: Object.values(TaskStatus),
				required: [true, "Task Status is required"],
			},
		},
	],
	lead: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Project should be assigned to a lead"],
	},
});

export default mongoose.model("Project", projectSchema);
