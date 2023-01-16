import Project from "../model/project.model.js";
import asyncHandler from "../service/asyncHandler.js";
import { UnexpectedError, CustomError } from "../util/customError.js";
import AuthRole from "../util/authRole.js";

export const setProject = asyncHandler(async (req, _res, next) => {
	req.project = await Project.findById(req.params?.pid);
	if (!req.project) {
		throw new UnexpectedError("Unable to fetch project");
	} else {
		next();
	}
});

export const setTProject = asyncHandler(async (req, _res, next) => {
	req.project = await Project.findOne({ "tasks._id": req.params?.tid });
	if (!req.project) {
		throw new UnexpectedError("Unable to fetch project");
	} else {
		next();
	}
});

export const isProjectLead = asyncHandler(async (req, _res, next) => {
	const project = await Project.findById(req.params?.pid);
	if (!project) {
		throw new UnexpectedError("Unable to fetch project");
	}

	if (
		!(
			req.user?.role === AuthRole.ADMIN ||
			JSON.stringify(req.user?._id) === JSON.stringify(project.lead)
		)
	) {
		throw new CustomError("Not authorized to access this route");
	}
	req.project = project;
	next();
});

export const isProjectTLead = asyncHandler(async (req, _res, next) => {
	const project = await Project.findOne({ "tasks._id": req.params?.tid });
	if (!project) {
		throw new UnexpectedError("Unable to fetch project");
	}

	if (
		!(
			req.user?.role === AuthRole.ADMIN ||
			JSON.stringify(req.user?._id) === JSON.stringify(project.lead)
		)
	) {
		throw new CustomError("Not authorized to access this route");
	}
	req.project = project;
	next();
});
