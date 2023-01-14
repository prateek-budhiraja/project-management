import Project from "../model/project.model.js";
import User from "../model/user.model.js";
import asyncHander from "../service/asyncHandler.js";
import { PropertyRequiredError } from "../util/customError.js";

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
