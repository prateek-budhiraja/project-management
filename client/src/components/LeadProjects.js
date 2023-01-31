import React, { useState } from "react";

export default function LeadProjects({
	project,
	handleChangeName,
	handleChangeLead,
}) {
	const [showModal, setShowModal] = useState(false);
	const [modal, setModal] = useState("");
	const [name, setName] = useState("");
	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-2">
				<h1 className="text-xl mb-4 underline">{project.name}</h1>
				<button
					onClick={() => {
						setModal("Project Name");
						setShowModal(true);
					}}
				>
					<img
						className="w-[20px] mb-4"
						src="/images/pencil.svg"
						alt="pencil icon"
					/>
				</button>
			</div>
			{JSON.parse(localStorage.getItem("user")).role === "ADMIN" ? (
				<button
					onClick={() => {
						setModal("Lead");
						setShowModal(true);
					}}
				>
					Change Lead
				</button>
			) : null}
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Edit {modal}</h3>
								</div>
								{/*body*/}
								<div className="relative p-6 flex gap-4 items-center">
									<label htmlFor="modal">Enter {modal}</label>
									<input
										type="text"
										name="modal"
										id="modal"
										value={name}
										placeholder={
											modal === "Project Name"
												? "Project Alpha"
												: "lead@gamil.com"
										}
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
											modal === "Project Name"
												? handleChangeName(project._id, name)
												: handleChangeLead(project._id, name);
											setShowModal(false);
											setName("");
										}}
									>
										Done
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</div>
	);
}
