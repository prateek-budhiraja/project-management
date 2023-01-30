import axios from "axios";
import React from "react";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import { toast } from "react-toastify";

export default function Project({ project, fetchData }) {
	const handleAddTask = async (pid, name) => {
		await axios
			.patch(`/project/${pid}/task/add`, {
				name,
			})
			.then(() => {
				fetchData();
				toast.success("Task added successfully");
			})
			.catch((err) =>
				toast.error(err?.response?.data?.message || "Something went wrong")
			);
	};

	return (
		<div className="border-2 rounded-lg border-black mt-4 mx-5 py-4 px-6">
			<div className="flex justify-between items-center">
				<h1 className="text-xl mb-4 underline">{project.name}</h1>
				<div>
					<AddTask project={project} handleAddTask={handleAddTask} />
				</div>
			</div>
			<Tasks tasks={project.tasks} />
		</div>
	);
}
