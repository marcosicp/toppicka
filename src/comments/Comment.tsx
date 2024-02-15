import React, { useContext, useEffect, useState } from 'react'
import app from 'firebase/app'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { Responses } from './responses/Responses'
import { FirebaseContext } from '../firebase/FirebaseContext'
import { setCommentLikes, setIsCommentLiked } from '../redux/actions'
import { IComment, IStore } from '../constants/typescript-types'

import heart from '../img/heart.svg'
import filledHeart from '../img/filled-heart.svg'


type TProps = { comment: IComment, commentIndex: number }

export const Comment: React.FC<TProps> = ({ comment, commentIndex }) => {
   // const history = useHistory()
   const dispatch = useDispatch()
   const firebase = useContext(FirebaseContext)
   const authUser = useSelector((store: IStore) => store.authUserStore.authUser)

   const [shouldShowResponseForm, setShouldShowResponseForm] = useState<boolean>(false)

   useEffect(() => {
      loadCommentLikes()
   }, [authUser])


   function loadCommentLikes(): void {
      const commentRef = comment.docRef as app.firestore.DocumentReference

      
      // firebase.commentLikesRef(commentRef).get()
      //    .then((querySnapshot) => {
      //       const likesCount = querySnapshot.docs.length
      //       const isLiked = querySnapshot.docs.filter((doc) => doc.data().uid === authUser?.uid).length !== 0
      //       dispatch(setCommentLikes(commentIndex, likesCount))
      //       dispatch(setIsCommentLiked(commentIndex, isLiked))
      //    })
   }


   function handleLike(): void {
      if (!authUser) {
         // history.push('login')
         return
      }
      if (comment.likesCount === undefined || comment.isLiked === undefined) {
         return
      }

      const authUserLikeRef = firebase.commentLikesRef(comment.docRef as app.firestore.DocumentReference).doc(authUser?.uid)

      if (comment.isLiked) {
         dispatch(setCommentLikes(commentIndex, comment.likesCount - 1))
         authUserLikeRef.delete()
      } else {
         dispatch(setCommentLikes(commentIndex, comment.likesCount + 1))
         authUserLikeRef.set({ uid: authUser?.uid })
      }

      dispatch(setIsCommentLiked(commentIndex, !comment.isLiked))
   }

   function handleReply(): void {
      if (!authUser) {
         // history.push('login')
         return
      }
      setShouldShowResponseForm(!shouldShowResponseForm)
   }

   function closeForm(): void {
      setShouldShowResponseForm(false)
   }

   const heartSrc = comment.isLiked ? filledHeart : heart
   const preparedText = comment.text.split('__n').map((par, index) => <p key={index}>{par}</p>)

   return (
      <div className="message">
         <div className="message__author">{comment.authorUsername}</div>
         <div className="message__created">{moment.unix(comment.created.seconds).fromNow()}</div>
         <div className="message__text">{preparedText}</div>

         <button className="message__like" onClick={handleLike}>
            <img src={heartSrc} alt="like" />
            <span className="message__likes-count">{comment.likesCount}</span>
         </button>
         <button className="message__reply" onClick={handleReply}>Reply</button>

         {/* <Responses
            comment={comment}
            commentIndex={commentIndex}
            shouldShowForm={shouldShowResponseForm}
            closeForm={closeForm}
         /> */}
      </div>
   )
}