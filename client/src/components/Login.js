import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		const result = await axios.post("/auth/login", { email, password });
		setEmail("");
		setPassword("");
		if (result?.data.success) {
			navigate("/dashboard");
		}
	};

	return (
		<section className="bg-gray-50">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<h1 className="mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
					Sign in to your account
				</h1>
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<form
							onSubmit={handleLogin}
							className="space-y-4 md:space-y-6"
							action="#"
						>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
									placeholder="name@company.com"
									required=""
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
									required=""
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Sign in
							</button>
							<p className="text-sm font-light text-gray-500">
								Don’t have an account yet?{" "}
								<a
									href="/signup"
									className="font-medium text-blue-600 hover:underline"
								>
									Sign up
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
