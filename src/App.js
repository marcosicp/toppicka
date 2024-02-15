import React,{ useEffect } from 'react';
import './App.css';
import Login from './Login'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './home';
import { useAuthentication } from './firebase/useAuthentication';
import 'normalize.css'
import './styles/style.scss'

function App() {
	// const[{ user }, dispatch] =useStateValue();
	useAuthentication();
	const loggedInUserCookie = localStorage.getItem("user");
	let loggedInUserObject = {};

	useEffect(() => {
		if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
			loggedInUserObject = JSON.parse(loggedInUserCookie);
		  }else{
			//   window.location.href = "/login";
		  }
	})

	return (
		//BEM naming convention
		<div className="app">
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/login' component={Login} />
				</Switch>
		    </BrowserRouter>	

    
		</div>
	);
}

export default App;
