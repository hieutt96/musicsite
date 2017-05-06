import React, { Component } from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class AddSong extends Component {

	constructor(props) {
		super(props);
		this.state = {
			file: {},
			name: '',
			description: '',
			authorId: 1,
			artistIds: [1] 
		};
		this.submit = this.submit.bind(this);
		this.addSong = this.addSong.bind(this);
	}

	submit(e) {
		e.preventDefault();
		this.addSong();
	}

	addSong() {
		console.log('Add song');
		
	}

	render() {
		return (
			<div className="AddSong">
				<form onSubmit={this.submit}>
					<FormGroup>
						<ControlLabel>File</ControlLabel>
						<FormControl type="file" placeholder="Choose song.." required 
								onChange={(e) => {
									this.setState({
										file: e.target.value
									})
								}} value={this.state.file} />
						<br />
						<ControlLabel>Ten bai hat</ControlLabel>
						<FormControl type="text" placeholder="Nhap ten bai hat.." required 
								onChange={(e) => {
									this.setState({
										name: e.target.value
									})
								}} value={this.state.name} />
						<br />
						<ControlLabel>Mo ta bai hat</ControlLabel>
						<FormControl type="text" placeholder="Nhap mo ta.." required
								onChange={(e) => {
									this.setState({
										description: e.target.value
									})
								}} value={this.state.description} />
						<br />
						<Button type="submit">Dang bai hat</Button>
					</FormGroup>
				</form>
			</div>
		);
	}
}

export default AddSong;	