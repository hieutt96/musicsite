import React from 'react';
import {  } from 'react-bootstrap'; 
import SongItem from './SongItem';
import Header from './Header';
import Footer from './Footer';
import SongPlayerControl from './SongPlayerControl';
import postJSON from '../ajax/postJSON';
import getJSON from '../ajax/getJSON';
import { hashHistory } from 'react-router';

class SongPlayer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status: ''	
		};
		this.compareAndGetSong = this.compareAndGetSong.bind(this);
	}

	compareAndGetSong(songId) {
		let currSong = this.props.currentList[0];
		if (!currSong || songId != currSong.songId) {
			getJSON('/api/song/' + songId, (err, status, response) => {
				if (err) {
					console.log(err);
				}
				let song;
				if (response.data) {
					if (response.data.song) {
						song = response.data.song
					}
				} 
				if (!song) {
					this.setState({
						status: 'NOT FOUND'
					})
				} else {
					this.props.setCurrentList([song])
				}
			});
		} else {
			this.setState({
				status: 'OK'
			});
		}
	}

	componentDidMount() {
		let songId = this.props.params.songId;
		this.compareAndGetSong(songId);
	}

	componentWillReceiveProps(nextProps) {
		let songId = nextProps.params.songId;
		this.compareAndGetSong(songId);
	}

	

	render() {
		let songs = this.props.currentList;
		if (!songs) {
			return null;
		} 
		let currSong = songs[0];
		if (!currSong || currSong.songId != this.props.params.songId) {
			return <div>{this.state.status}</div>;
		} else {
			return (
				<div className="SongPlayer">
					<div>SongPlayer</div>
					<div>{this.state.status}</div>
					<div className="SongPlayer_MainScreen">
						<div className="SongPlayer_MainScreen_Cover">
							<img src={currSong.cover} alt="img" />
						</div>
						<div className="SongPlayer_MainScreen_Lyric">
							<div>Lyric</div>
							<div>Con gio nhe nhang om mai dau </div>
						</div>
					</div>
					<SongPlayerControl song={currSong}/>
					<div className="SongPlayer_Playing">
						<div className="SongName"><h3>{currSong.name}</h3></div>
						<div className="Artist">{currSong.singer ? currSong.singer : ''}</div>
					</div>
					<div className="SongPlayer_Playlist">
						<SongItem />
						<SongItem />
						<SongItem />
					</div>
					<audio controls>
					  <source src="1.mp3" type="audio/mpeg" />
					Your browser does not support the audio element.
					</audio>
				</div>
			);
		}
	}
}

// export default SongPlayer;
import { connect } from 'react-redux';
import { listenSong, playVideo, listenPlaylist, getSong, clearCurrentList, setCurrentList } from '../actions/listen';

export default connect(
	(state) => ({
		// Map state to props
		currentList: state.listen.currentList
	}), {
		// Map dispatch to props
		// getSong: getSong
		clearCurrentList,
		setCurrentList
	}
)(SongPlayer);

