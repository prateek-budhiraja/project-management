import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "./Admin";
import Header from "./Header";
import Lead from "./Lead";
import Projects from "./Projects";

export default function Home() {
	const [component, setComponent] = useState("DASHBOARD");
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		try {
			const loggedInUser = JSON.parse(localStorage.getItem("user"));
			setUser(loggedInUser);
			if (!loggedInUser) {
				navigate("/");
			}
		} catch (err) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<Header user={user} component={component} setComponent={setComponent} />
			{component === "ADMIN" ? (
				<Admin />
			) : component === "LEAD" ? (
				<Lead />
			) : (
				<Projects />
			)}
		</>
	);
}
