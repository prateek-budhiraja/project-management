import Project from "../model/project.model.js";
import User from "../model/user.model.js";

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
 * @route http://localhost:4000/api/projects/create
 * @description Create new project (only by lead)
 * @parameters project_name
 * @returns Project
 **************************************************/

export const createProject = async (req, res) => {
	const { name } = req.body;

	const lead = await User.create({
		name: "Prateek",
		email: "prateek@gmail.com",
		password: "prateek",
	});

	const project = await Project.create({
		name,
		lead,
	});

	res.status(200).json({
		success: true,
		project,
	});
};
