import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from './App';

import Main from './components/Main';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dash from './components/Dash';
import SongPlayer from './components/SongPlayer';
import VideoPlayer from './components/VideoPlayer';

import Admin from './components/admin/Admin';
import AdminDash from './components/admin/Dash';
import AdminLogin from './components/admin/Login';

import store from './store/config';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const history = syncHistoryWithStore(hashHistory, store);

function checkAdminLogin(nextState, replace, callback) {
	try {
		const admin = JSON.parse(localStorage.getItem('admin'));
		if (!admin) {
			replace('/admin/login');
		}
		callback();
	} catch(err) {
		console.log(err);
		localStorage.clear();
		replace('/admin/login');
		callback();
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<Route path="" component={Main}>
					<IndexRedirect to="home" />
					<Route path="signup" component={Signup} />
					<Route path="login" component={Login} />
					<Route path="home" component={Home} />
					<Route path="user" component={Dash} />
					<Route path="song/:songId" component={SongPlayer} />
					<Route path="video/:songId" component={VideoPlayer} />
					<Route path="playlist/:playlistId" component={SongPlayer} />
				</Route>
				<Route path="/admin" component={Admin} onEnter={checkAdminLogin}>
					<Route path="login" component={AdminLogin} />
				</Route>
			</Route>
		</Router>
	</Provider>,
  document.getElementById('root')
);
