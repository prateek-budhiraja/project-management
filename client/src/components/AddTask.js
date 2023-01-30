import React, { useState } from "react";

export default function AddTask({ project, handleAddTask }) {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState("");
	return (
		<>
			<button
				className="text-green-600 font-semibold"
				type="button"
				onClick={() => setShowModal(true)}
			>
				ADD TASK
			</button>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Add Task</h3>
								</div>
								{/*body*/}
								<div className="relative p-6 flex gap-4 items-center">
									<label htmlFor="task">Enter Task Name</label>
									<input
										type="text"
										name="task"
										id="task"
										value={name}
										placeholder="Bug fix #334"
										className="border-2 px-2 py-1 rounded border-black"
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => {
											handleAddTask(project._id, name);
											setShowModal(false);
											setName("");
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
