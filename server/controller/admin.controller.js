import asyncHandler from "../service/asyncHandler.js";
import User from "../model/user.model.js";
import Project from "../model/project.model.js";
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
