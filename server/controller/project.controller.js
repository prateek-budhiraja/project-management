import Project from "../model/project.model.js";
import User from "../model/user.model.js";
import asyncHander from "../service/asyncHandler.js";
import AuthRole from "../util/authRole.js";
import { PropertyRequiredError, UnexpectedError } from "../util/customError.js";
import { TaskStatus } from "../util/status.js";

/**************************************************
 * @HOME
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/home
 * @description Home route for API
 * @parameters
 * @returns
 **************************************************/

export const home = (_req, res) => {
	res.status(204).send("api home"); //no content
};

/**************************************************
 * @CREATE_PROJECT
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/project/create
 * @description Create new project (only by lead)
 * @parameters name
 * @returns Project
 **************************************************/

export const createProject = asyncHander(async (req, res) => {
	const { name } = req.body;

	if (!name) {
		throw new PropertyRequiredError("Project name");
	}

	const project = await Project.create({
		name,
		lead: req.user,
	});

	res.status(201).json({
		success: true,
		project,
	});
});

/**************************************************
 * @ADD_TASK
 * @REQUEST_TYPE PATCH
 * @route http://localhost:4000/api/project/:pid/task/add
 * @description Add a new task
 * @parameters name
 * @returns Project
 **************************************************/

export const addTask = asyncHander(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		throw new PropertyRequiredError("Task Name");
	}

	const task = {
		name,
		assigned_to: req.user,
		status: TaskStatus.PENDING,
	};

	if (req.user?.role === AuthRole.ADMIN || req.user?.role === AuthRole.LEAD) {
		task.status = TaskStatus.APPROVED;
	}

	const project = await Project.findByIdAndUpdate(
		req.params.pid,
		{
			$push: { tasks: task },
		},
		{ new: true }
	);

	if (!project) {
		throw new UnexpectedError("Unable to add task");
	}

	res.status(201).json({
		success: true,
		project,
	});
});
