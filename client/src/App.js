import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<div className="App">
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
