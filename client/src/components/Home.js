import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Projects from "./Projects";

export default function Home() {
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
			<Header user={user} />
			<Projects />
		</>
	);
}
