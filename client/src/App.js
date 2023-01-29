import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
	return (
		<div className="App">
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
