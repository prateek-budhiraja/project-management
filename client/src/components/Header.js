import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ user }) {
	const navigate = useNavigate();

	const handleSignout = async () => {
		await axios.post("/auth/logout");
		localStorage.clear();
		navigate("/");
	};

	return (
		<div className="flex justify-between bg-white shadow-md border-b-1 border-black py-4 lg:px-6 px-2 text-base lg:text-xl">
			<a className="text-blue-600" href="#">
				PM
			</a>
			<div className="flex lg:gap-6 gap-2">
				<p className="text-gray-600">{user?.email}</p>
				{user?.role === "ADMIN" ? <a href="admin">Admin</a> : ""}
				<button onClick={handleSignout} className="text-red-600">
					Signout
				</button>
			</div>
		</div>
	);
}
