import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ user, setComponent, component }) {
	const navigate = useNavigate();

	const handleSignout = async () => {
		await axios.post("/auth/logout");
		localStorage.clear();
		navigate("/");
	};

	return (
		<div className="flex justify-between bg-white shadow-md border-b-1 border-black py-4 lg:px-6 px-2 text-base lg:text-xl">
			<a className="text-blue-600 font-bold" href="#">
				Project Management
			</a>
			<div className="flex lg:gap-6 gap-2">
				<p className="text-gray-600">{user?.email}</p>
				{user?.role === "ADMIN" ? (
					<button
						onClick={() =>
							setComponent(component === "DASHBOARD" ? "ADMIN" : "DASHBOARD")
						}
					>
						{component === "ADMIN" ? "DASHBOARD" : "Admin View"}
					</button>
				) : user?.role === "LEAD" ? (
					<button
						onClick={() =>
							setComponent(component === "DASHBOARD" ? "LEAD" : "DASHBOARD")
						}
					>
						{component === "LEAD" ? "DASHBOARD" : "Lead View"}
					</button>
				) : (
					""
				)}
				<button onClick={handleSignout} className="text-red-600 font-semibold">
					Signout
				</button>
			</div>
		</div>
	);
}
