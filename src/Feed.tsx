import React, { useContext, useState, useEffect } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import { FirebaseContext } from "./firebase/FirebaseContext";
import { communicationService } from "./CommunicationService";
import { IStore } from "./constants/typescript-types";

export const Feed: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const [posts, setPosts] = useState([] as any);
  var postsAll: any[] = [];
  const loggedInUserCookie = localStorage.getItem("user");
  let loggedInUserObject = { uid: "" };
  if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
    loggedInUserObject = JSON.parse(loggedInUserCookie);
  }

  useEffect(() => {
    const subscription = communicationService
      .onMessage()
      .subscribe((message) => {
        if (message) {
          updateView();
        }
      });

    firebase.db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        postsAll = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: { ...doc.data(), liked: false },
        }));
      })
      .bind(
        firebase.db
          .collection("postsLikes")
          .doc(loggedInUserObject.uid)
          .onSnapshot((snapshot2: any) => {
            if (snapshot2 !== undefined && snapshot2.data() !== undefined) {
              let postsmios = snapshot2.data().posts;
              postsmios.forEach((post: any) => {
                var existeDoc = postsAll.find((post2) => post2.id === post);
                if (existeDoc !== undefined) {
                  postsAll.find((post2) => post2.id === post).data.liked = true;
                }
              });

              setPosts(postsAll);
            } else {
              postsAll.forEach((post: any) => {
                post.liked = false;
              });
              setPosts(postsAll);
            }
          })
      );
  }, []);

  function updateView() {
    firebase.db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        return (postsAll = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: { ...doc.data(), liked: false },
        })));
      })
      .bind(
        firebase.db
          .collection("postsLikes")
          .doc(loggedInUserObject.uid)
          .onSnapshot((snapshot2: any) => {
            if (
              snapshot2.data().posts !== undefined &&
              snapshot2.data().posts !== null &&
              snapshot2.data().posts.length >= 1
            ) {
              let postsmios = snapshot2.data().posts;
              postsmios.forEach((post: any) => {
                var existeDoc = postsAll.find((post2) => post2.id === post);
                if (existeDoc !== undefined) {
                  postsAll.find((post2) => post2.id === post).data.liked = true;
                }
              });

              setPosts(postsAll);
            }
          })
      );
  }

  return (
    <div className="feed">
      {/* <StoryReel /> */}

      <MessageSender />

      {posts.map((post: any) => (
        <Post
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
          likes={post.data.likes}
          userLiked={post.data.liked}
          key={post.id}
          id={post.id}
        />
      ))}
    </div>
  );
};
