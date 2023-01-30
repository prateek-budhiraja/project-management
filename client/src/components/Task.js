import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Task({ task }) {
	const [selected, setSelected] = useState(task.status);
	const handleStatusChange = async (e) => {
		const status = e.target.value;
		await axios
			.patch(`/task/${task._id}/status`, {
				status,
			})
			.then((result) => {
				console.log(result);
				if (!result?.data.success) {
					console.log("in if");
					toast.error(result.data.message);
				} else {
					console.log("in else");
					setSelected(status);
					toast.success("State changed successfully");
				}
			})
			.catch((err) => toast.error(err.response.data.message));
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
