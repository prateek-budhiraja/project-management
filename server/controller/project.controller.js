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
 * @route http://localhost:<PORT>/api/home
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
 * @route http://localhost:<PORT>/api/project/create
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
 * @route http://localhost:<PORT>/api/project/:pid/task/add
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
 * @route http://localhost:<PORT>/api/project/task/:tid/assign
 * @description Assign task to a user
 * @parameters email
 * @returns Project
 **************************************************/

export const assignTask = asyncHander(async (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw new PropertyRequiredError("Email");
	}

	const assigned_to = await User.findOne({ email });
	if (!assigned_to) {
		throw new UnexpectedError("Unable to fetch user with email");
	}

	const project = await Project.findOne({ "tasks._id": req.params.tid });
	if (!project) {
		throw UnexpectedError("Unable to fetch Project");
	}

	project.tasks.forEach((task) => {
		if (JSON.stringify(task._id) === JSON.stringify(req.params.tid)) {
			task.assigned_to = assigned_to;
		}
	});

	await project.save();

	res.status(200).json({
		success: true,
		project,
	});
});

/**************************************************
 * @GET_PROJECTS
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/projects
 * @description Get own tasks (User), Get own projects (lead), Get all projects (admin)
 * @parameters
 * @returns Projects
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

/**************************************************
 * @CHANGE_TASK_STATUS
 * @REQUEST_TYPE PATCH
 * @route http://localhost:<PORT>/api/project/task/:tid/status
 * @description Change task status (only by assigned user)
 * @parameters status
 * @returns Project
 **************************************************/

export const changeTaskStatus = asyncHander(async (req, res) => {
	const { status } = req.body;
	if (!status) {
		throw new PropertyRequiredError("Task Status");
	}

	const project = await Project.findOne({ "tasks._id": req.params.tid });
	if (!project) {
		throw new UnexpectedError("Unable to fetch project/task details");
	}

	let modified = false;

	project.tasks.forEach((task) => {
		// console.log(
		// 	JSON.stringify(task.assigned_to) === JSON.stringify(req.user._id) &&
		// 		JSON.stringify(req.params.tid) === JSON.stringify(task._id)
		// );
		if (
			JSON.stringify(task.assigned_to) === JSON.stringify(req.user?._id) &&
			JSON.stringify(req.params?.tid) === JSON.stringify(task._id)
		) {
			task.status = status;
			modified = true;
		}
	});

	if (!modified) {
		throw new CustomError("Unable to modify status", 401);
	}

	await project.save();

	res.status(200).json({
		success: true,
		project,
	});
});

/**************************************************
 * @CHANGE_PROJECT_NAME
 * @REQUEST_TYPE PATCH
 * @route http://localhost:<PORT>/api/project/:pid/name/edit
 * @description Change project name
 * @parameters name
 * @returns Project
 **************************************************/

export const changeProjectName = asyncHander(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		throw new PropertyRequiredError("Project name");
	}

	const project = await Project.findById(req.params?.pid);
	if (!project) {
		throw new UnexpectedError("Unable to edit project name");
	}

	if (
		!(
			req.user?.role === AuthRole.ADMIN ||
			JSON.stringify(project.lead) === JSON.stringify(req.user?._id)
		)
	) {
		throw new CustomError("Not allowed to edit name");
	}

	project.name = name;
	await project.save();

	res.status(200).json({
		success: true,
		project,
	});
});
