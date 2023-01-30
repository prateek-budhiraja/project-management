import axios from "axios";
import React, { useState } from "react";

export default function Task({ task }) {
	const [selected, setSelected] = useState(task.status);
	const handleStatusChange = async (e, tid) => {
		setSelected(e.target.value);
		await axios.patch(`/task/${tid}/status`);
	};
	return (
		<div className="flex justify-between mb-2">
			<h1>{task.name}</h1>
			<select
				value={selected}
				id="status"
				name="status"
				className="border-2 border-black rounded-lg"
				onChange={handleStatusChange}
			>
				<option value="APPROVED">APPROVED</option>
				<option value="PENDING">PENDING</option>
				<option value="IN_PROGRESS">PROGRESS</option>
				<option value="COMPLETED">COMPLETED</option>
			</select>
		</div>
	);
}
