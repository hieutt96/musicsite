import React from 'react';
import { Pagination } from 'react-bootstrap'; 
import SongItem from './SongItem';
import postJSON from '../ajax/postJSON';
import getJSON from '../ajax/getJSON';

class SongList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			songs: []
		};
		this.getList = this.getList.bind(this);
		this.getNewestSong = this.getNewestSong.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.listenSong = this.listenSong.bind(this);
	}

	componentDidMount() {
		this.getList();
	}

	getList() {
		if (this.props.query === 'NONE') {

		} else {
			this.getNewestSong();
		}
	}

	getNewestSong() {
		postJSON('/api/song/find', {
			page: this.state.page - 1
		}, (err, status, response) => {
			if (err) {
				return console.log(err);
			}
			if (response.errCode === 0) {
				let songs = this.state.songs;
				songs[this.state.page] = response.data;
				this.setState({
					songs: songs
				});
			} else {
				console.log(response);
			}
		});
	}

	handleSelect(page) {
		if (this.state.songs[page]) {
			return this.setState({
				page: page
			});
		}
		if (page !== this.state.page) {
			this.setState({
				page: page
			}, () => {
				this.getList();
			});
		}
	}

	listenSong(song) {
		this.props.listenSong(song);
	}

	render() {
		console.log('render song list')
		if (this.props.query === 'NONE') {
			return null;
		}
		let list = null;
		if (this.state.songs[this.state.page]) {
			list = this.state.songs[this.state.page].map((song, i) => {
				return <SongItem key={i} song={song} listen={this.listenSong}/>
			});
		}

		return (
			<div className="SongList">
				<div>List nhac</div>
				{list ? list : ''}
				<Pagination prev next first last ellipsis boundaryLinks items={100} maxButtons={5} activePage={this.state.page} 
						onSelect={this.handleSelect} />
			</div>
		);
	}
}

// export default SongList;

import { connect } from 'react-redux';
import { listenSong, playVideo, listenPlaylist } from '../actions/listen';

export default connect(
	(state) => ({
		// Map state to props
		// currentList: state.listen.currentList
	}), {
		// Map dispatch to props
		listenSong: listenSong,
		playVideo: playVideo,
		listenPlaylist: listenPlaylist
	}
)(SongList);
