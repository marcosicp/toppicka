import { projectFirestore, increment } from "./firebaseConfig";
import firebase from "firebase";

export function saveUser(user) {
  return projectFirestore
    .collection(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid,
    })
    .then(() => user);
}

export function likePostUser(uid, postID) {
  projectFirestore
    .collection("posts")
    .doc(postID)
    .update({
      likes: increment,
    });

  return projectFirestore
    .collection("postsLikes")
    .doc(uid)
    .update({
      posts: firebase.firestore.FieldValue.arrayUnion(postID),
    });
}

export function userComment(uid, postID, comment) {
    return projectFirestore
      .collection("postsLikes")
      .doc(uid)
      .update({
        posts: firebase.firestore.FieldValue.arrayUnion(postID),
      });
  }

export function dislikePostUser(uid, postID) {
  projectFirestore
    .collection("posts")
    .doc(postID)
    .update({
      likes: firebase.database.ServerValue === 0 ? 0 : firebase.firestore.FieldValue.increment(-1),
    });
  return projectFirestore
    .collection("postsLikes")
    .doc(uid)
    .update({
      posts: firebase.firestore.FieldValue.arrayRemove(postID),
    });
}

export function saveQuiz(quiz, quizID, userUID) {
  return projectFirestore.collection("cycleadores-quiz").add({
    uid: userUID,
    respuestas: quiz,
    quizId: quizID,
    creado: Date.now(),
  });
}

export function getPosts() {
  return projectFirestore.collection(`posts`).get();
}

export function getPostsLikedByUID(uid) {
  return projectFirestore
    .collection(`postsLikes`)
    .where("uid", "==", uid)
    .get();
}

export function getAllQuiz() {
  return projectFirestore.collection(`quiz`).get();
}

export function getPedidos(userUID) {
  return projectFirestore
    .collection(`domiciliario`)
    .where("uid", "==", userUID)
    .get();
}

export function getPedidosTodos() {
  return projectFirestore.collection(`domiciliario`).get();
}

export function getCycleadorByUID(user) {
  return projectFirestore.collection(`cycleadores`).doc(user.uid).get();
}
