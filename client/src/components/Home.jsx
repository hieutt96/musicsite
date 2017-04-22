import React, { Component } from 'react';
import Header from './Header';
import SongList from './SongList';
import SongItem from './SongItem';
import MVList from './MVList';
import SongPlayer from './SongPlayer';
import VideoPlayer from './VideoPlayer';
import MVCover from './MVCover';
import Footer from './Footer';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<SongList query="NEW" />
			</div>
		);
	}
}

// export default Home;
import { connect } from 'react-redux';
import {  } from '../actions/listen';

export default connect(
	(state) => ({
		// Map state to props
		// currentList: state.listen.currentList
	}), {
		// Map dispatch to props
	}
)(Home);
