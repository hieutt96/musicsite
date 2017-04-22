import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.submit = this.submit.bind(this);
		this.doLogin = this.doLogin.bind(this);
		this.close = this.close.bind(this);
	}
	
	submit(e) {
		e.preventDefault();
		this.doLogin();
	}

	doLogin() {
		let info = {
			username: this.state.username,
			password: this.state.password
		};
		this.props.setInfo(info);
		this.props.doLogin();
	}

	close() {
		this.props.doClose();
	}

	render() {
		return (
			<div className="Login">
				<div>Login Admin</div>
				<div>{this.props.status}</div>
				<Modal show={this.props.show}>
					<Modal.Header>Login Admin</Modal.Header>
					<Modal.Body>
						<form onSubmit={this.submit} id="login-form">
							<FormGroup>
								<ControlLabel>Ten dang nhap</ControlLabel>
								<FormControl type="text" placeholder="Enter username" ref={(input) => { this.usernameInput = input; }} 
										required onChange={(e) => this.setState({
											username: e.target.value
										})} value={this.state.username} />
								<br/>
								<ControlLabel>Mat khau</ControlLabel>
								<FormControl type="password" placeholder="Enter password" ref={(input) => { this.passwordInput = input; }} 
										required onChange={(e) => this.setState({
											password: e.target.value
										})} value={this.state.password} />
								<br/>
								<Button type="submit">Login</Button>
							</FormGroup>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
					</Modal.Footer>
				</Modal>				
			</div>
		);
	}
}

import { connect } from 'react-redux';
import { doLogin, setInfo, doClose } from '../../actions/admin';

export default connect(
	(state) => ({
		// Map state to props
		status: state.admin.status,
		show: state.admin.show,
		loginInfo: state.admin.loginInfo,
	}), {
		// Map dispatch to props
		doLogin: () => doLogin,
		setInfo,
		doClose: () => doClose
	}
)(Login);