import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class Admin extends React.Component {

	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		this.props.doLogout();
	}

	render() {
		return (
			<div className="Admin">		
				<div className="Logout">
					<Button onClick={this.logout}>Logout</Button>
				</div>	
			</div>
		);
	}
}

import { connect } from 'react-redux';
import { doLogout } from '../../actions/admin';

export default connect(
	(state) => ({
		// Map state to props
	}), {
		// Map dispatch to props
		doLogout: () => doLogout
	}
)(Admin);
