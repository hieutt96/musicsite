import postJSON from '../ajax/postJSON';
import getJSON from '../ajax/getJSON';
import putJSON from '../ajax/putJSON';
import { hashHistory } from 'react-router';

export const updateInfo = (info) => (dispatch, getState) => {
	putJSON('/api/user/info', info, (err, status, response) => {
		if (err) {
			console.log(err);
		}
		if (response.errCode === 0) {
			let user = response.data.user;
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			console.log(response)
		}
	});
}