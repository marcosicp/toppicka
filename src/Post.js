import React, { useContext, useState, useEffect } from "react";
import "./Post.css";
import { Avatar, Input } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "firebase/firestore";
import firebase2 from "firebase/app";
import { CommentsPage } from "./comments/CommentsPage";
import { FirebaseContext } from "./firebase/FirebaseContext";

function Post({
  profilePic,
  image,
  username,
  userLiked,
  timestamp,
  message,
  likes,
  id,
}) {
  const loggedInUserCookie = localStorage.getItem("user");
  let loggedInUserObject = {};
  if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
    loggedInUserObject = JSON.parse(loggedInUserCookie);
  }

  var postsAll = [];
  const firebase = useContext(FirebaseContext);
  const increment = firebase2.firestore.FieldValue.increment(1);

  const likePost = () => {
    if (!userLiked) {
      firebase.db.collection("posts").doc(id).update({
        likes: increment,
      });

      return firebase.db
        .collection("postsLikes")
        .doc(loggedInUserObject.uid)
        .set({
          posts: firebase2.firestore.FieldValue.arrayUnion(id),
        },{merge: true});
    } else {
      firebase.db
        .collection("posts")
        .doc(id)
        .update({
          likes:
            firebase2.database.ServerValue === 0
              ? 0
              : firebase2.firestore.FieldValue.increment(-1),
        });
      return firebase.db
        .collection("postsLikes")
        .doc(loggedInUserObject.uid)
        .update({
          posts: firebase2.firestore.FieldValue.arrayRemove(id),
        });
    }
  };

  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />

        <div className="post__topInfo">
          <h3> {username}</h3>

          <p> {new Date(timestamp?.toDate()).toUTCString()} </p>
        </div>
      </div>

      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post__image">
        <img src={image} alt="" />
      </div>

      <div className="post__options">
        <div
          className={`${!userLiked ? "post__option" : "post__option_selected"}`}
        >
          <ThumbUpIcon className="like2" onClick={likePost} />
          <p>Like {likes === 0 ? "" : "(" + likes + ")"}</p>
        </div>

        <div className="post__option">
          <ChatBubbleOutlineIcon />
          <p>Comentario</p>
        </div>
      </div>

      <div className="post__options" style={{ alignItems: "center" }}>
        <CommentsPage postAll={postsAll} postIDparam={id} />
      </div>
    </div>
  );
}

export default Post;
