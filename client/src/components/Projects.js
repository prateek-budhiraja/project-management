import axios from "axios";
import React, { useEffect, useState } from "react";
import Project from "./Project";

export default function Projects() {
	const [userProjects, setUserProjects] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const { data } = await axios.get("/projects");
			setUserProjects(data.projects);
		}
		fetchData();
	}, []);

	return (
		<>
			{userProjects.map((project) => (
				<Project project={project} key={project._id} />
			))}
		</>
	);
}
