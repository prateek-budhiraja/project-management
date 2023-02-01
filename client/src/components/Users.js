import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";

export default function Users() {
	const [users, setUsers] = useState([]);
	const fetchUsers = async () => {
		await axios
			.get("/auth/users")
			.then((result) =>
				result.data.success ? setUsers(result.data.users) : ""
			)
			.catch((err) => console.log(err));
	};

	const handleChangePassword = async (uid, password) => {
		await axios
			.patch(`/auth/update/password/${uid}`, { password })
			.then((result) =>
				result.data.success
					? toast.success("Password changed successfully")
					: toast.error(result.data.message)
			)
			.catch(() => toast.error("Something went wrong"));
	};

	const handleRoleChange = async (uid, e) => {
		const role = e.target.value;
		await axios
			.patch(`/auth/update/role/${uid}`, {
				role,
			})
			.then((result) =>
				result.data.success
					? toast.success("Role changed successfully")
					: toast.error(result.data.message || "ERROR")
			)
			.catch(() => toast.error("Something went wrong"));
		setUsers([]);
	};

	const handleDelete = async (uid) => {
		console.log("in handle delete");
		await axios.delete(`/auth/delete/${uid}`);
	};

	useEffect(() => {
		fetchUsers();
	}, [users]);

	return (
		<>
			{users.map((user) => (
				<div className="grid grid-cols-4" key={user._id}>
					<h2>{user.email}</h2>
					<select
						value={user.role}
						id="status"
						name="status"
						className="border-2 border-black rounded-lg"
						onChange={(e) => handleRoleChange(user._id, e)}
					>
						<option value="USER">USER</option>
						<option value="LEAD">LEAD</option>
						<option value="ADMIN">ADMIN</option>
					</select>
					<ResetPassword
						handleChangePassword={handleChangePassword}
						user={user}
						key={user._id}
					/>
					<button
						onClick={(e) => handleDelete(user._id, e)}
						className="text-red-600 text-right"
					>
						DELETE
					</button>
				</div>
			))}
		</>
	);
}
