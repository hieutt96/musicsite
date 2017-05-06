import React from 'react';
import {  } from 'react-bootstrap'; 

class SongPlayerControl extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			playIcon: "fa-play",
			duration: "--:--",
			currentTime: "--:--",
			progress: '0%',
			displayVolumeChooser: 'none',
			volume: 0.7
		};
		this.play = this.play.bind(this);
		this.handlePlayPause = this.handlePlayPause.bind(this);
		this.updateCurrentTime = this.updateCurrentTime.bind(this);
		this.seek = this.seek.bind(this);
		this.showVolumeChooser = this.showVolumeChooser.bind(this);
		this.hideVolumeChooser = this.hideVolumeChooser.bind(this);
		this.setVolume = this.setVolume.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		clearInterval(this.updateInterval);
	}

	secondsToMinutes(sec) {
		sec = Math.round(sec);
		let minute = Math.floor(sec / 60);
		let second = sec % 60;
		if (minute < 10) {
			minute = "0" + minute
		}
		if (second < 10) {
			second = "0" + second
		}
		return minute + ":" + second;
	}

	prev() {

	}

	next() {

	}

	updateCurrentTime() {
		let currentTime = this.secondsToMinutes(this.audio.currentTime);
		this.setState({
			currentTime: currentTime,
			progress: this.audio.currentTime * 100 / this.audio.duration + '%'
		});
	}

	play() {
		let duration = this.secondsToMinutes(this.audio.duration)
		let currentTime = this.secondsToMinutes(this.audio.currentTime)
		this.audio.play();
		this.setState({
			duration: duration,
			currentTime: currentTime,
			playIcon: "fa-pause"
		});
		this.updateInterval = setInterval(this.updateCurrentTime, 1000);
	}

	pause() {
		this.audio.pause();
		this.setState({
			playIcon: "fa-play"
		});
		clearInterval(this.updateInterval);
	}

	handlePlayPause() {
		if (this.state.playIcon === "fa-pause") {
			this.pause();
		} else {
			this.play();
		}
	}

	seek(e) {
		console.log('Seek')
		let full = this.progressFullBar.offsetWidth;
		let seekTo = e.clientX - 35;
		let time = seekTo / full * this.audio.duration;
		this.audio.currentTime = time;
		let currentTime = this.secondsToMinutes(time);
		this.setState({
			currentTime: currentTime,
			progress: Math.round(this.audio.currentTime * 100 / this.audio.duration) + '%'
		});
	}

	showVolumeChooser() {
		this.setState({
			displayVolumeChooser: ''
		});
	}

	hideVolumeChooser() {
		this.setState({
			displayVolumeChooser: 'none'
		});
	}

	setVolume(e) {
		console.log('Set volume')
		let yClick = e.clientY;
		let yTop = this.getPosition(this.volumeFullBar).y;
		let volume = (100 - (yClick - yTop)) / 100;
		this.audio.volume = volume;
		this.setState({
			volume: volume
		});
	}

	getPosition(el) {
	  var xPos = 0;
	  var yPos = 0;
	 
	  while (el) {
	    if (el.tagName == "BODY") {
	      // deal with browser quirks with body/window/document and page scroll
	      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
	      var yScroll = el.scrollTop || document.documentElement.scrollTop;
	 
	      xPos += (el.offsetLeft - xScroll + el.clientLeft);
	      yPos += (el.offsetTop - yScroll + el.clientTop);
	    } else {
	      // for all other non-BODY elements
	      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
	      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
	    }
	 
	    el = el.offsetParent;
	  }
	  return {
	    x: xPos,
	    y: yPos
	  };
	}

	render() {
		let song = this.props.song;
		return (
			<div className="SongPlayer_Control">
				<audio controls ref={(audio) => { 
					this.audio = audio
				}}>
				 	<source src={song.link} type="audio/mpeg" />
				Your browser does not support the audio element.
				</audio>
				<div className="SongPlayer_Control_Progress">
					<div className="SongPlayer_Control_ProgressFull" ref={(div) => this.progressFullBar = div} 
							onClick={this.seek}></div>
					<div className="SongPlayer_Control_ProgressPass" ref={(div) => this.progressPassBar = div} 
							style={{width: this.state.progress}} onClick={this.seek}></div>
					<div className="SongPlayer_Control_ProgressHolder" style={{left: this.state.progress}}></div>
				</div>
				<div className="SongPlayer_Control_Prev"><span className="fa fa-step-backward" onClick={this.prev}></span></div>
				<div className="SongPlayer_Control_Play"><span className={"fa " + this.state.playIcon} onClick={this.handlePlayPause}></span></div>
				<div className="SongPlayer_Control_Next"><span className="fa fa-step-forward" onClick={this.next}></span></div>
				<div className="SongPlayer_Control_Time">{this.state.currentTime + 
						"/" + this.state.duration}</div>
				<div className="SongPlayer_Control_Volume">
					<span className="fa fa-volume-up SongPlayer_Control_VolumeIcon" 
							onMouseEnter={this.showVolumeChooser}
							onMouseLeave={this.hideVolumeChooser} ></span>
					<span className="SongPlayer_Control_VolumeChooser" style={{display: this.state.displayVolumeChooser}}
							onMouseEnter={this.showVolumeChooser}
							onMouseLeave={this.hideVolumeChooser} >
						<span className="SongPlayer_Control_VolumeFull" ref={(span) => this.volumeFullBar = span} 
								onClick={this.setVolume} ></span>
						<span className="SongPlayer_Control_VolumeSlide" ref={(span) => this.volumeSlideBar = span}  
								onClick={this.setVolume} style={{height: this.state.volume * 100 + '%'}}></span>
						<span className="SongPlayer_Control_VolumeHolder"
								style={{bottom: this.state.volume * 100 + '%'}}></span>
					</span>
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