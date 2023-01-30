import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProject from "./AddProject";
import Project from "./Project";

export default function Projects() {
	const [userProjects, setUserProjects] = useState([]);
	async function fetchData() {
		const { data } = await axios.get("/projects");
		setUserProjects(data.projects);
	}
	useEffect(() => {
		fetchData();
	}, [userProjects]);

	return (
		<>
			<AddProject fetchData={fetchData} />
			<div className="pb-8">
				{userProjects.map((project) => (
					<Project project={project} key={project._id} fetchData={fetchData} />
				))}
			</div>
		</>
	);
}
