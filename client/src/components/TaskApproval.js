import React from "react";

export default function TaskApproval({ task, handleApprove }) {
	return (
		<>
			{task.status === "PENDING" ? (
				<div className="grid grid-cols-3 justify-between mb-2">
					<h1>{task.name}</h1>
					<button className="text-left underline">{task.email}</button>
					<button
						onClick={() => handleApprove(task._id)}
						className="text-right"
					>
						Approve
					</button>
				</div>
			) : null}
		</>
	);
}
