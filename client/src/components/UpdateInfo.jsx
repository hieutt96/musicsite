import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import putJSON from '../ajax/putJSON';

class UpdateInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: this.props.user.username || '',
			email: this.props.user.email || '',
			password: this.props.user.password || '****************************',
			displayName: this.props.user.displayName || '',
			gender: this.props.user.gendder || 0,
			birthday: this.props.user.birthday || '1950-01-01',
			livingIn: this.props.user.livingIn || ''
		};
		this.submit = this.submit.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
	}

	submit(e) {
		e.preventDefault();
		this.updateInfo();
	}

	updateInfo() {
		let user = this.state;
		localStorage.removeItem('user');
		localStorage.setItem('user', JSON.stringify(user));
		this.setState({
			username: user.username,
			email: user.email,
			password: user.password,
			displayName: user.displayName,
			gender: user.gender,
			birthday: user.birthday,
			livingIn: user.livingIn
		});
		this.props.setStatus('Update info succes: ' + Date.now());

		// putJSON('/api/user/info', this.state, (err, status, response) => {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	// if (response.errCode === 0) {
		// 	// 	let user = response.data.user;
		// 	// 	localStorage.removeItem('user');
		// 	// 	localStorage.setItem('user', JSON.stringify(user));
		// 	// 	this.setState({
		// 	// 		username: user.username,
		// 	// 		email: user.email,
		// 	// 		password: user.password,
		// 	// 		displayName: user.displayName,
		// 	// 		gender: user.gender,
		// 	// 		birthday: user.birthday,
		// 	// 		livingIn: user.livingIn
		// 	// 	});
		// 	// 	this.props.setStatus('Update info success');
		// 	// } else {
		// 	// 	console.log(response)
		// 	// }
		// 	let user = this.state;
		// 	localStorage.removeItem('user');
		// 	localStorage.setItem('user', JSON.stringify(user));
		// 	this.setState({
		// 		username: user.username,
		// 		email: user.email,
		// 		password: user.password,
		// 		displayName: user.displayName,
		// 		gender: user.gender,
		// 		birthday: user.birthday,
		// 		livingIn: user.livingIn
		// 	});
		// 	this.props.setStatus('Update info success' + Date.now());
		// });			
	}

	render() {
		return (
			<div className="UpdateInfo">
				<form onSubmit={this.submit} id="signup-form">
					<FormGroup>
						<ControlLabel>Username</ControlLabel>
						<FormControl type="text" disabled placeholder="Enter username.." 
								onChange={(e)=> this.setState({
										username: e.target.value
								})} value={this.state.username} />
						<br/>
						<ControlLabel>Email</ControlLabel>
						<FormControl type="text" required disabled placeholder="Enter email.." 
								onChange={(e)=> this.setState({
										email: e.target.value
								})} value={this.state.email} />
						<br/>
						<ControlLabel>Fullname</ControlLabel>
						<FormControl type="text" placeholder="Enter fullname.." required 
								onChange={(e)=> this.setState({
										displayName: e.target.value
								})} value={this.state.displayName} />
						<br/>
						<ControlLabel>Password</ControlLabel>
						<FormControl type="password" placeholder="Enter password.." required 
								onChange={(e)=> this.setState({
										password: e.target.value
								})} value={this.state.password} />
						<br/>
						<ControlLabel>Gender&nbsp;&nbsp;&nbsp; </ControlLabel>
						<select onChange={(e) => this.setState({
							gender: e.target.value
						})} value={this.state.gender}>
							<option value="0">Male</option>
			                <option value="1">Female</option>
			                <option value="2">Other</option>
						</select>
						<br/>
						<ControlLabel>Birthday</ControlLabel>
						<FormControl type="date" required 
								onChange={(e)=> this.setState({
										birthday: e.target.value
								})} value={this.state.birthday} />
						<br/>
						<ControlLabel>Address</ControlLabel>
						<FormControl type="text" placeholder="Enter address.."  required 
								onChange={(e)=> this.setState({
										livingIn: e.target.value
								})} value={this.state.livingIn} />
						<br/>
						<Button type="submit">Submit</Button>
					</FormGroup>
				</form>
			</div>
		);
	}
}

// export default UpdateInfo;
import { connect } from 'react-redux';
import { setStatus } from '../actions/login';

export default connect(
	(state) => ({
		// Map state to props
	}), {
		// Map dispatch to props
		setStatus
	}
)(UpdateInfo);
