import React, { useContext } from "react";
import "./Header.css";
import { useHistory } from 'react-router-dom'
import { Avatar } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import { FirebaseContext } from "./firebase/FirebaseContext";

function Header() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory()
  const loggedInUserCookie = localStorage.getItem("user");
  let loggedInUserObject = {};

  if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
    loggedInUserObject = JSON.parse(loggedInUserCookie);
  }

  const signOut = () => {

    firebase.doSignOut()
	.then(() => {
		localStorage.clear();
    history.push("/login")
  })
	.catch((error) => alert(error.message));
    
  };

  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
      sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  }

  return (
    <div className="header">
      {/*  splitting header into 3 components */}

      <div className="header__left">
        <button className="icono" id="sidebarToggle">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="100%" height="100%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<line x1="4" y1="6" x2="20" y2="6" />
						<line x1="4" y1="12" x2="20" y2="12" />
						<line x1="4" y1="18" x2="20" y2="18" />
					</svg>
        </button>
				<img
				className="i1"
				src="img/toppicka-logo.jpg"
				alt=""
				/>
			</div>

      {/* <div className="header__center">
        <div className="header__option header__option--active">
          <HomeIcon fontSize="large" />
        </div>

        <div className="header__option">
          <FlagIcon fontSize="large" />
        </div>

        <div className="header__option">
          <SubscriptionsIcon fontSize="large" />
        </div>

        <div className="header__option">
          <StorefrontIcon fontSize="large" />
        </div>

        <div className="header__option">
          <SupervisedUserCircleIcon fontSize="large" />
        </div>
      </div> */}

      <div className="header__right">
        <div className="header__info">
          <Avatar src={loggedInUserObject.photoURL} />
          <h4>{loggedInUserObject.displayName}</h4>
        </div>
{/* 
        <IconButton>
          <AddIcon />
        </IconButton>

        <IconButton>
          <ForumIcon />
        </IconButton>

        <IconButton>
          <NotificationsActiveIcon />
        </IconButton> */}

        {/* <IconButton>
          
          <ExpandMoreIcon>
            <TreeItem nodeId="1" label="Madhya Pradesh" />
          </ExpandMoreIcon>
        </IconButton> */}
        <TreeView
          defaultExpandIcon={<ChevronRightIcon />}
          defaultCollapseIcon={<ExpandMoreIcon />}
        >
          <TreeItem nodeId="0">
            <TreeItem nodeId="1" onClick={signOut} label="SALIR" />
            {/* <TreeItem nodeId="2" label="Goa" />
              <TreeItem nodeId="3" label="Delhi" />
              <TreeItem nodeId="4" label="Mumbai, etc" /> */}
          </TreeItem>
        </TreeView>
      </div>
    </div>
  );
}

export default Header;
