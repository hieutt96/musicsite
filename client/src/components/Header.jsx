import React from 'react';
import TopNavbar from './TopNavbar';
import SecondNavbar from './SecondNavbar';

class Header extends React.Component {
	render() {
		console.log('Render Header')
		return (
			<div className="Header">
				<TopNavbar />
				<SecondNavbar />
			</div>
		);
	}
}

export default Header;