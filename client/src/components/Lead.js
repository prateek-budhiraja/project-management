import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LeadProjects from "./LeadProjects";
import TaskApproval from "./TaskApproval";

export default function Lead() {
	const [myProjects, setMyProjects] = useState([]);
	async function fetchData() {
		const { data } = await axios.get("/projects");
		if (!data?.success) {
			toast.error("Unable to fetch projects");
		} else {
			setMyProjects(
				data?.projects.filter((project) => {
					if (JSON.parse(localStorage.getItem("user")).role === "ADMIN")
						return project;
					else if (
						project.lead === JSON.parse(localStorage.getItem("user"))._id
					)
						return project;
				})
			);
		}
	}
	useEffect(() => {
		fetchData();
	}, [myProjects]);

	const handleChangeName = async (pid, name) => {
		await axios
			.patch(`/project/${pid}/name/edit`, {
				name,
			})
			.then((result) =>
				result.data.success
					? toast.success("Project name changed successfully 🎉")
					: toast.error(result.data.message)
			)
			.catch(() => toast.error("Something went wrong"));
	};

	const handleChangeLead = async (pid, name) => {
		await axios
			.patch(`/project/${pid}/lead/edit`, {
				email: name,
			})
			.then((result) =>
				result.data.success
					? toast.success("Project lead changed successfully 🎉")
					: toast.error(result.data.message)
			)
			.catch(() => toast.error("Something went wrong"));
	};

	const handleApprove = async (tid) => {
		await axios
			.patch(`/task/${tid}/approve`)
			.then((result) =>
				result.data.success
					? toast.success(`Task Approved successfully`)
					: toast.error(result.data.message)
			)
			.catch(() => toast.error("Something went wrong"));
	};

	return (
		<>
			<h1 className="text-2xl text-center font-semibold py-2">Your Projects</h1>
			{myProjects.map((project) => (
				<div className="border-2 rounded-lg border-black mt-4 mx-5 py-4 px-6">
					<LeadProjects
						project={project}
						handleChangeName={handleChangeName}
						handleChangeLead={handleChangeLead}
					/>
					{project.tasks.map((task) => (
						<TaskApproval task={task} handleApprove={handleApprove} />
					))}
				</div>
			))}
		</>
	);
}
