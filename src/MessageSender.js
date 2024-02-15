import React, { useState, useContext } from "react";
import "./MessageSender.css";
import { Avatar } from "@material-ui/core";
import firebase2 from "firebase/app";
import { communicationService } from "./CommunicationService";
import { FirebaseContext } from "./firebase/FirebaseContext";

function MessageSender() {
  const firebase = useContext(FirebaseContext);

  const [input, setInput] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const loggedInUserCookie = localStorage.getItem("user");

  let loggedInUserObject = {};
  if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
    loggedInUserObject = JSON.parse(loggedInUserCookie);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //preventing for a refresh

    firebase.db
      .collection("posts")
      .add({
        message: input,
        timestamp: firebase2.firestore.FieldValue.serverTimestamp(),
        profilePic: loggedInUserObject.photoURL,
        username: loggedInUserObject.displayName,
        likes: 0,
        image: ImageUrl,
      })
      .then((data) => {
        communicationService.sendMessage();
      })
      .catch((error) => {});

    setInput("");
    setImageUrl("");
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top ">
        <Avatar src={loggedInUserObject.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender__input"
            placeholder={`Tu reseña, ${loggedInUserObject.displayName} ?`}
          />

          <input
            className="imgholder"
            value={ImageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={"Imagen URL"}
          />

          <button onClick={handleSubmit} type="submit">
            Hidden Submit
          </button>
        </form>
      </div>

      {/* <div className="messageSender__bottom ">
				<div className="messageSender__option">
					<VideocamIcon style={{ color: 'red' }} />
					<h3>Live Video</h3>
				</div>

				<div className="messageSender__option">
					<PhotoLibraryIcon style={{ color: '#27ae60' }} />
					<h3>Photo/Video</h3>
				</div>

				<div className="messageSender__option">
					<InsertEmoticonIcon style={{ color: 'orange' }} />
					<h3>Feeling/Activity</h3>
				</div>
			</div> */}
    </div>
  );
}

export default MessageSender;
