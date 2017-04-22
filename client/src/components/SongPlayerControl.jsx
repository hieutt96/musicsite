import React from 'react';
import {  } from 'react-bootstrap'; 

class SongPlayerControl extends React.Component {

	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
	}

	prev() {

	}

	next() {

	}

	play() {
		this.audio.play();
	}

	pause() {
		
	}

	render() {
		let song = this.props.song;
		return (
			<div className="SongPlayer_Control">
				<audio controls ref={(audio) => { this.audio = audio }}>
				 	<source src={song.link} type="audio/mpeg" />
				Your browser does not support the audio element.
				</audio>
				<div className="SongPlayer_Control_Progress">
					<div className="SongPlayer_Control_ProgressFull"></div>
					<div className="SongPlayer_Control_ProgressPass" width='30%'></div>
					<div className="SongPlayer_Control_ProgressHolder" ></div>
				</div>
				<div className="SongPlayer_Control_Prev"><span className="fa fa-step-backward" onClick={this.prev}></span></div>
				<div className="SongPlayer_Control_Play"><span className="fa fa-play" onClick={this.play}></span></div>
				<div className="SongPlayer_Control_Next"><span className="fa fa-step-forward" onClick={this.next}></span></div>
				<div className="SongPlayer_Control_Time">01:02/03:32</div>
				<div className="SongPlayer_Control_Volume">
					<span className="fa fa-volume-up SongPlayer_Control_VolumeIcon"></span>
					<span className="SongPlayer_Control_VolumeSlide"></span>
				</div>
				<div className="SongPlayer_Control_Random"><span className="fa fa-random"></span></div>
				<div className="SongPlayer_Control_Download"><span className="fa fa-download"></span></div>
			</div>
		);

	}
}

export default SongPlayerControl;

// <audio id="player" src="vincent.mp3"></audio>
// <div> 
//   <button onclick="document.getElementById('player').play()">Play</button> 
//   <button onclick="document.getElementById('player').pause()">Pause</button> 
//   <button onclick="document.getElementById('player').volume += 0.1">Vol+ </button> 
//   <button onclick="document.getElementById('player').volume -= 0.1">Vol- </button> 
// </div>