import { Link } from 'react-router-dom';
import React from 'react';

class SongItem extends React.Component {

	constructor(props) {
		super(props);
		this.listen = this.listen.bind(this);
	}

	listen() {	
		console.log('Listen');
		this.props.listen(this.props.song)
	}

	render() {
		let song = this.props.song;
		if (song) {
			return (
				<div className="SongItem">
					<ul>
						<li className="Name"><span onClick={this.listen}>{song.name}</span></li>
						<li className="Artist"><span>{song.singer}</span></li>
						{/*<li className="IsOfficial"><span>Official</span></li>
						<li className="Quality"><span>HQ</span></li> */}
						<li className="NewWindow"><span className="fa fa-clone"></span></li>
						<li className="AddToFavourite"><span className="glyphicon glyphicon-heart"></span></li>
						<li className="Play"><span className="glyphicon glyphicon-play"></span></li>
						<li className="Listened"><span><i className="fa fa-headphones"></i> {song.listen}</span></li>
					</ul>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default SongItem;