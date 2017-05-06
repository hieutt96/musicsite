import postJSON from '../ajax/postJSON';
import getJSON from '../ajax/getJSON';
import { hashHistory } from 'react-router';

export const setCurrentList = (list) => {
	return {
		type: 'SET_CURRENT_LIST',
		list
	}
}

export const listenSong = (song) => (dispatch, getState) => {
	dispatch(setCurrentList([song]));
	hashHistory.push('/song/' + song.songId);
	console.log('push')
}

export const playVideo = (video) => (dispatch, getState) => {
	dispatch(setCurrentList([video]));
	hashHistory.push('/video/' + video.songId);
}

export const listenPlaylist = (playlist) => (dispatch, getState) => {
	dispatch(setCurrentList(playlist));
	hashHistory.push('/playlist/' + playlist.playlistId);
}

export const clearCurrentList = () => {
	return {
		type: 'CLEAR_CURRENT_LIST'
	}
}