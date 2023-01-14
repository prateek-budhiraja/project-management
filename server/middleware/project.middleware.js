import Project from "../model/project.model.js";
import asyncHandler from "../service/asyncHandler.js";
import { UnexpectedError } from "../util/customError.js";

export const setProject = asyncHandler(async (req, res, next) => {
	req.project = await Project.findById(req.params?.pid);
	if (!req.project) {
		throw new UnexpectedError("Unable to fetch project");
	} else {
		next();
	}
});
