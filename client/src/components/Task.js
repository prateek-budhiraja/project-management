import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Task({ task }) {
	const [selected, setSelected] = useState(task.status);
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState("");
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

	const handleAssignedToChange = async (email) => {
		await axios
			.patch(`/task/${task._id}/assign`, {
				email,
			})
			.then((result) => {
				result.data.success
					? toast.success(`Task Assigned to ${email} successfully`)
					: toast.error(result.data.message);
			})
			.catch(() => toast.error("Something went wrong"));
	};

	return (
		<>
			{selected !== "PENDING" ? (
				<div className="grid grid-cols-3 justify-between mb-2">
					<h1>{task.name}</h1>
					<button
						onClick={() => setShowModal(true)}
						className="text-left underline"
					>
						{task.email}
					</button>
					<select
						value={selected}
						id="status"
						name="status"
						className="border-2 border-black rounded-lg"
						onChange={handleStatusChange}
					>
						<option value="APPROVED">APPROVED</option>
						<option value="IN_PROGRESS">PROGRESS</option>
						<option value="COMPLETED">COMPLETED</option>
					</select>
				</div>
			) : null}
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Reassign Task</h3>
								</div>
								{/*body*/}
								<div className="relative p-6 flex gap-4 items-center">
									<label htmlFor="project">Enter Email id</label>
									<input
										type="text"
										name="email"
										id="project"
										value={email}
										placeholder="user@service.com"
										className="border-2 px-2 py-1 rounded border-black"
										onChange={(e) => setEmail(e.target.value)}
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
											handleAssignedToChange(email);
											setShowModal(false);
											setEmail("");
										}}
									>
										Assign
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
