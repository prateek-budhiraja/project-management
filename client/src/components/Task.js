import React from "react";

export default function Task({ task }) {
	return (
		<div>
			{task.name} {task.status}
		</div>
	);
}
