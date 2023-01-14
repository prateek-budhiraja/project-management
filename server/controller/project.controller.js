import Project from "../model/project.model.js";
import User from "../model/user.model.js";
import asyncHander from "../service/asyncHandler.js";
import AuthRole from "../util/authRole.js";
import {
	CustomError,
	PropertyRequiredError,
	UnexpectedError,
} from "../util/customError.js";
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

	if (
		req.user?.role === AuthRole.ADMIN ||
		JSON.stringify(req.user?._id) === JSON.stringify(req.project?.lead)
	) {
		task.status = TaskStatus.APPROVED;
	}

	req.project.tasks.push(task);

	const { project } = req;

	await project.save();

	if (!project) {
		throw new UnexpectedError("Unable to add task");
	}

	res.status(201).json({
		success: true,
		project,
	});
});

/**************************************************
 * @ASSIGN_TASK
 * @REQUEST_TYPE PATCH
 * @route http://localhost:4000/api/project/task/:tid/assign
 * @description Assign task to a user
 * @parameters email
 * @returns Task
 **************************************************/

/**************************************************
 * @GET_PROJECTS
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/projects
 * @description Get own tasks (User), Get own projects (lead), Get all projects (admin)
 * @parameters
 * @returns Task
 **************************************************/

export const getProjects = asyncHander(async (req, res) => {
	const projects = await Project.find();

	if (!projects) {
		throw new UnexpectedError("Unable to fetch projects");
	}

	let result;

	if (req.user?.role === AuthRole.ADMIN) {
		result = projects;
	} else if (req.user?.role === AuthRole.LEAD) {
		result = projects.filter(
			(project) =>
				JSON.stringify(project.lead) === JSON.stringify(req.user?._id)
		);
	} else if (req.user?.role === AuthRole.USER) {
		result = projects
			.map((project) => {
				project.tasks = project.tasks.filter(
					(task) =>
						JSON.stringify(task.assigned_to) === JSON.stringify(req.user?._id)
				);
				if (project.tasks.length) {
					return project;
				}
			})
			.filter(Boolean);
	}
	res.json({
		success: true,
		projects: result,
	});
});
