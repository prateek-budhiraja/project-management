import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddProject({ fetchData }) {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState("");
	const handleAddProject = async (name) => {
		await axios
			.post("/project/create", {
				name,
			})
			.then(() => {
				fetchData();
				toast.success("Project added successfully");
			})
			.catch((err) =>
				toast.error(err?.response?.data?.message || "Something went wrong")
			);
	};
	return (
		<div className="px-6 py-4 flex justify-between items-center">
			<h1 className="text-2xl font-semibold">Your Projects</h1>
			<>
				<button
					className="text-green-600 font-semibold"
					type="button"
					onClick={() => setShowModal(true)}
				>
					ADD PROJECT
				</button>
				{showModal ? (
					<>
						<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
							<div className="relative w-auto my-6 mx-auto max-w-3xl">
								{/*content*/}
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									{/*header*/}
									<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
										<h3 className="text-3xl font-semibold">Add Project</h3>
									</div>
									{/*body*/}
									<div className="relative p-6 flex gap-4 items-center">
										<label htmlFor="project">Enter Project Name</label>
										<input
											type="text"
											name="project"
											id="project"
											value={name}
											placeholder="Project alpha"
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
												handleAddProject(name);
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
		</div>
	);
}
