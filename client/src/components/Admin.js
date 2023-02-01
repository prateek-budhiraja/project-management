import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Lead from "./Lead";
import Users from "./Users";

export default function Admin() {
	const handleFetchReport = async (select) => {
		let link = "";
		select === "user-report"
			? (link = "/admin/export/users/report")
			: (link = `/admin/export/${select}`);
		await axios
			.get(link, { responseType: "blob" })
			.then((response) => {
				// console.log(response);
				// create file link in browser's memory
				const href = URL.createObjectURL(response.data);

				// create "a" HTML element with href to file & click
				const link = document.createElement("a");
				link.href = href;
				link.setAttribute("download", `${select}.csv`);
				document.body.appendChild(link);
				link.click();

				// clean up "a" element & remove ObjectURL
				document.body.removeChild(link);
				URL.revokeObjectURL(href);
			})
			.catch(() => toast.error("Unable to download report"));
	};

	return (
		<>
			<div className="py-4 px-6">
				<h1 className="text-2xl font-semibold text-center">Admin Dashboard</h1>

				<h2 className="text-xl font-semibold pt-4 text-center">
					Export Reports
				</h2>
				<div className="flex justify-center py-4 gap-4">
					<button
						className="font-semibold border-2 px-4 py-1 rounded-lg border-black"
						onClick={() => {
							handleFetchReport("users");
						}}
					>
						Users
					</button>
					<button
						className="font-semibold border-2 px-4 py-1 rounded-lg border-black"
						onClick={() => {
							handleFetchReport("projects");
						}}
						download
					>
						Projects
					</button>
					<button
						className="font-semibold border-2 px-4 py-1 rounded-lg border-black"
						onClick={() => {
							handleFetchReport("user-report");
						}}
					>
						User report
					</button>
				</div>
				<div>
					<h2 className="text-xl font-semibold pt-4 text-center mb-5">
						User Management
					</h2>
					<Users />
				</div>
			</div>
			<Lead />
		</>
	);
}
