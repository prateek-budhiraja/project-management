import React, { useState } from "react";

export default function ResetPassword({ handleChangePassword, user }) {
	const [showModal, setShowModal] = useState(false);
	const [password, setPassword] = useState("");
	return (
		<div>
			<button
				onClick={() => setShowModal(true)}
				className="text-blue-600 text-right"
			>
				Reset Password
			</button>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Reset Password</h3>
								</div>
								{/*body*/}
								<div className="relative p-6 flex gap-4 items-center">
									<label htmlFor="modal">Enter new password</label>
									<input
										type="text"
										name="password"
										id="password"
										value={password}
										placeholder="********"
										className="border-2 px-2 py-1 rounded border-black"
										onChange={(e) => setPassword(e.target.value)}
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
											console.log("button clicked");
											console.log(password);
											handleChangePassword(user._id, password);
											setShowModal(false);
											setPassword("");
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
