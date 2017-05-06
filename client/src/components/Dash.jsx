import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import MVList from './MVList';
import UpdateInfo from './UpdateInfo';
import AddSong from './AddSong';

class Dash extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		try {
			this.user = JSON.parse(localStorage.getItem('user'));
		} catch(err) {
			console.log(err);
		}
		return (
			<div className="UserDash">
				<Button>Create playlist</Button>
				<Button>Update info</Button>
				<UpdateInfo user={this.user}/>
				<div className="Playlist">
					<MVList />
				</div>
				<AddSong />
			</div>
		);
	}
}

export default Dash;