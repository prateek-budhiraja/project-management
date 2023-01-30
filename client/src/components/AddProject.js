import axios from "axios";
import React, { useState } from "react";
import AddPopup from "./AddTask";

export default function AddProject() {
	const [name, setName] = useState("");
	const handleAddProject = async (name) => {
		await axios.post("/project/create", {
			name,
		});
	};
	return (
		<div className="px-6 py-4 flex justify-between items-center">
			<h1 className="text-2xl font-semibold">Your Projects</h1>
			<AddPopup handleAddProject={handleAddProject} />
			{/* <button className="text-lg text-green-600 font-semibold">
				ADD PROJECT
			</button> */}
		</div>
	);
}
