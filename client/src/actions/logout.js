import { hashHistory } from 'react-router';
import getJSON from '../ajax/getJSON';

export const setStatus = (status) => {
	return {
		type: 'SET_LOGOUT_STATUS',
		status
	}
} 

export const doLogout = (dispatch, getState) => {
	getJSON('/api/user/logout', (err, status, response) => {
		if (err) { 
			console.error(err);
			dispatch(setStatus('Error'))
		}
		console.log(response);
		dispatch(setStatus('Logout success'));
		localStorage.removeItem('user');
		hashHistory.push('/home');
		dispatch(setStatus(''));
	});
}