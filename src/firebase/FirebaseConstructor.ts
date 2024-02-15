import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { IComment, IResponse } from '../constants/typescript-types';


const config = {
  
  
};

export class FirebaseConstructor {
   auth: app.auth.Auth
   db: app.firestore.Firestore
   parentURL: string

   constructor() {
      app.initializeApp(config)
      this.auth = app.auth()
      this.db = app.firestore()
      this.parentURL = getParentURL()
   }

   

   // *** Auth API ***
   doCreateUserWithEmailAndPassword = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password)

   doSignInWithEmailAndPassword = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password)

   doSignOut = () => this.auth.signOut()

   doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email)

   doPasswordUpdate = (password: string) => this.auth.currentUser?.updatePassword(password)


   // *** Firestore API ***
   userRef = (uid: string) => this.db.collection('users').doc(uid)

   postsRef = () => this.db.collection('posts')

   // comment
   doCreateComment = (postID: string, comment: IComment) => this.commentsRef(postID).add(comment)

   commentsRef = (postID: string) => this.db.collection('posts').doc(postID).collection('comments')

   commentLikesRef = (commentRef: app.firestore.DocumentReference) => commentRef.collection('comments-likes')
   
   // response
   doCreateResponse = (commentRef: app.firestore.DocumentReference, response: IResponse) => this.responsesRef(commentRef).add(response)

   responsesRef = (commentRef: app.firestore.DocumentReference) => commentRef.collection('responses')

   responseLikesRef = (responseRef: app.firestore.DocumentReference) => responseRef.collection('comments-likes')
}


function getParentURL(): string {
   const queryString = window.location.search.substring(1)
   const queries = queryString.split("&")

   for (let query of queries) {
      const pair = query.split('=')
      if (pair[0] === 'parentURL') return pair[1]
   }

   return 'default'
}