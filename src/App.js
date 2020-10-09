import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";

function App() {
	const [keyword, setKeyword] = useState("");
	const [weatherData, setWeatherData] = useState("");
	const getWeatherData = async (e) => {
		e.preventDefault();
		console.log("keyword", keyword);
		let url = `http://localhost:5000/city?q=${keyword}`;
		let response = await fetch(url);
		let data = await response.json();
		console.log("its data", data);
		console.log("current pos");
		setWeatherData(data);
	};

	const getLocation = () => {
		navigator.geolocation.getCurrentPosition((post) => {
			getWeather(post.coords.longitude, post.coords.latitude);
		});
	};

	const getWeather = async (longitude, latitude) => {
		let url;
		if (latitude) {
			url = `http://localhost:5000/?lat=${latitude}&lon=${longitude}`;
		} else {
			url = `http://localhost:5000/?q=saigon`;
		}
		console.log(url);
		let response = await fetch(url);
		let data = await response.json();
		console.log("current location data", data);
		setWeatherData(data);
	};

	useEffect(() => {
		getLocation();
	}, []);
	return (
		<div>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form inline onSubmit={(event) => getWeatherData(event)}>
						<FormControl
							type="text"
							placeholder="Search"
							className="mr-sm-2"
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>

			<div className="tempBox">
				<h1>{weatherData && weatherData.data.name}</h1>
				<img
					src={
						weatherData &&
						`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`
					}
				/>
				<h3>{weatherData && weatherData.data.weather[0].main}</h3>
				<h3>Temperature: {weatherData && weatherData.data.main.temp}°C </h3>
				<h3>
					Feels Like: {weatherData && weatherData.data.main.feels_like}°C Max:{" "}
					{weatherData && weatherData.data.main.temp_max}°C Min:{" "}
					{weatherData && weatherData.data.main.temp_min}°C
				</h3>
			</div>
		</div>
	);
}

export default App;
