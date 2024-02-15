import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { useStateValue } from './StateProvider';
import { makeStyles } from '@material-ui/core/styles';

function Sidebar() {
	// const [ { user }, dispatch ] = useStateValue();
	const loggedInUserCookie = localStorage.getItem("user");
	let loggedInUserObject={};

    if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
      loggedInUserObject = JSON.parse(loggedInUserCookie);
	}

	return (
		<div className="sidebar">
			<SidebarRow src={loggedInUserObject.photoURL} title={loggedInUserObject.displayName} />
			{/* <SidebarRow Icon={LocalHospitalIcon} title="COVID-19 Information Center" /> */}
			{/* <SidebarRow Icon={EmojiFlagsIcon} title="Pages" /> */}
			{/* <SidebarRow Icon={PeopleIcon} title="Friends" /> */}
			<SidebarRow Icon={ChatIcon} title="Reviews Likes" />
			{/* <SidebarRow Icon={StorefrontIcon} title="Marketplace" /> */}
			{/* <SidebarRow Icon={VideoLibraryIcon} title="Videos" /> */}
			{/* <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace" /> */}
			<br />

			<div className="suscripciones">
				<div className="titulo">
					<div className="icono">
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-affiliate" width="100%" height="100%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275" />
						<path d="M11.683 12.317l5.759 -5.759" />
						<circle cx="5.5" cy="5.5" r="1.5" />
						<circle cx="18.5" cy="5.5" r="1.5" />
						<circle cx="18.5" cy="18.5" r="1.5" />
						<circle cx="8.5" cy="15.5" r="4.5" />
						</svg>
					</div>
					<h3>Suscripciones</h3>	
				</div>

				<div className="suscripto">
					<img className="avatarSuscripcion" src="img/users/JV.jfif"/>
					<h4 className="nombreSuscripcion"></h4>			
				</div>

				<div className="suscripto">
					<img className="avatarSuscripcion" src="img/users/MC.jfif"/>
					<h4 className="nombreSuscripcion"></h4>			
				</div>

				<div className="suscripto">
					<img className="avatarSuscripcion" src="img/users/JM.jfif"/>
					<h4 className="nombreSuscripcion"></h4>			
				</div>
			</div>

			{/* <div className="name">
				<b>Built by </b> <br />
				<a href="https://github.com/proghead00">
					{' '}
					<b>Susnata Goswami </b>
				</a>
			</div> */}
		</div>
	);
}

export default Sidebar;
