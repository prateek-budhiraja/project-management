import axios from "axios";
import React, { useEffect, useState } from "react";

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
				<p key={project._id}>{project.name}</p>
			))}
		</>
	);
}
