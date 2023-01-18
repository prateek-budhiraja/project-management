import asyncHandler from "../service/asyncHandler.js";
import User from "../model/user.model.js";
import Project from "../model/project.model.js";
import { TaskStatus } from "../util/status.js";
import { UnexpectedError } from "../util/customError.js";

import fs from "fs";
import path from "path";
import json2csv from "json2csv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**************************************************
 * @EXPORT_PROJECTS
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/admin/export/projects
 * @description Export projects
 * @parameters
 * @returns
 **************************************************/

export const exportProjects = asyncHandler(async (_req, res) => {
	const projects = await Project.find();
	if (!projects) {
		throw new UnexpectedError("Unable to export projects");
	}

	const csv = json2csv.parse(projects);
	if (!csv) {
		throw new UnexpectedError("Unable to export projects");
	}

	let date = new Date();
	date = `${date.getDate()}-${
		date.getMonth() + 1
	}-${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

	const filePath = path.join(
		__dirname,
		"..",
		"public",
		"projects-" + date + ".csv"
	);

	fs.writeFile(filePath, csv, (err) => {
		if (err) {
			throw new UnexpectedError("Unable to export projects");
		} else {
			setTimeout(function () {
				fs.unlinkSync(filePath); // delete this file after 3 minutes
			}, 60000);
			return res.download("public/projects-" + date + ".csv");
		}
	});
});

/**************************************************
 * @EXPORT_USERS
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/admin/export/users
 * @description Export Users
 * @parameters
 * @returns
 **************************************************/

export const exportUsers = asyncHandler(async (_req, res) => {
	const users = await User.find();
	if (!users) {
		throw new UnexpectedError("Unable to export users");
	}

	const csv = json2csv.parse(users);
	if (!csv) {
		throw new UnexpectedError("Unable to export projects");
	}

	let date = new Date();
	date = `${date.getDate()}-${
		date.getMonth() + 1
	}-${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

	const filePath = path.join(
		__dirname,
		"..",
		"public",
		"users-" + date + ".csv"
	);

	fs.writeFile(filePath, csv, (err) => {
		if (err) {
			throw new UnexpectedError("Unable to export projects");
		} else {
			setTimeout(function () {
				fs.unlinkSync(filePath); // delete this file after 3 minutes
			}, 60000);
			return res.download("public/users-" + date + ".csv");
		}
	});
});

/**************************************************
 * @USER_REPORT
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/admin/export/users/report
 * @description Export Users report
 * @parameters
 * @returns
 **************************************************/

export const userReport = asyncHandler(async (_req, res) => {
	const users = await User.find();
	const projects = await Project.find();
	if (!(users || projects)) {
		throw new UnexpectedError("Enable to export user report");
	}

	Object.keys(TaskStatus).forEach((status) => (TaskStatus[status] = 0));

	// creating objects for all users
	var userReport = {};
	users.forEach((user) => {
		userReport[JSON.stringify(user._id)] = { ...TaskStatus, email: user.email };
	});

	// looping through each task of every project and updating values for users
	projects.forEach((project) => {
		project.tasks.forEach((task) => {
			userReport[JSON.stringify(task.assigned_to)][task.status] += 1;
		});
	});

	// write to file and send for download
	const csv = json2csv.parse(userReport);
	if (!csv) {
		throw new UnexpectedError("Unable to export projects");
	}

	let date = new Date();
	date = `${date.getDate()}-${
		date.getMonth() + 1
	}-${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

	const filePath = path.join(
		__dirname,
		"..",
		"public",
		"users_report-" + date + ".csv"
	);

	fs.writeFile(filePath, csv, (err) => {
		if (err) {
			throw new UnexpectedError("Unable to export user report");
		} else {
			setTimeout(function () {
				fs.unlinkSync(filePath); // delete this file after 3 minutes
			}, 60000);
			return res.download("public/users_report-" + date + ".csv");
		}
	});
});
