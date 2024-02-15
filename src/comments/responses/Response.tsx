import React, { useContext, useEffect } from 'react'
import app from 'firebase/app'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { FirebaseContext } from '../../firebase/FirebaseContext'
import { IResponse, IStore } from '../../constants/typescript-types'

import heart from '../../img/heart.svg'
import filledHeart from '../../img/filled-heart.svg'
import { setResponseLikes, setIsResponseLiked } from '../../redux/actions'


type TProps = { response: IResponse, responseIndex: number, commentIndex: number }

export const Response: React.FC<TProps> = ({ response, responseIndex, commentIndex }) => {
   const history = useHistory()
   const dispatch = useDispatch()
   const firebase = useContext(FirebaseContext)
   const authUser = useSelector((store: IStore) => store.authUserStore.authUser)


   useEffect(() => {
      loadResponseLikes()
      // eslint-disable-next-line
   }, [authUser])


   function loadResponseLikes() {
      const responseRef = response.docRef as app.firestore.DocumentReference

      firebase.responseLikesRef(responseRef).get()
         .then((querySnapshot) => {
            const likesCount = querySnapshot.docs.length
            const isLiked = querySnapshot.docs.filter((doc) => doc.data().uid === authUser?.uid).length !== 0
            dispatch( setResponseLikes(commentIndex, responseIndex, likesCount) )
            dispatch( setIsResponseLiked(commentIndex, responseIndex, isLiked) )
         })
   }


   function handleLike() {
      if (!authUser) {
         history.push('login')
         return
      }
      if (response.likesCount === undefined || response.isLiked === undefined) {
         return
      }

      const authUserLikeRef = firebase.responseLikesRef(response.docRef as app.firestore.DocumentReference).doc(authUser.uid)

      if (response.isLiked) {
         dispatch( setResponseLikes(commentIndex, responseIndex, response.likesCount - 1) )
         authUserLikeRef.delete()
      } else {
         dispatch( setResponseLikes(commentIndex, responseIndex, response.likesCount + 1) )
         authUserLikeRef.set({ uid: authUser.uid })
      }

      dispatch( setIsResponseLiked(commentIndex, responseIndex, !response.isLiked) )
   }


   const heartSrc = response.isLiked ? filledHeart : heart
   const preparedText = response.text.split('__n').map((par, index) => <p key={index}>{par}</p>)

   return (
      <div className="message">
         <div className="message__author">{response.authorUsername}</div>
         <div className="message__created">{moment.unix(response.created.seconds).fromNow()}</div>
         <div className="message__text">{preparedText}</div>
         
         <button className="message__like" onClick={handleLike}>
            <img src={heartSrc} alt="like"/>
            <span className="message__likes-count">{response.likesCount}</span>
         </button>
      </div>
   )
}