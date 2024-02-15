import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import app from 'firebase/app'

import { createResponse } from '../../redux/actions'
import { FirebaseContext } from '../../firebase/FirebaseContext'
import { IStore, IResponse } from '../../constants/typescript-types'


type TProps = { commentRef: app.firestore.DocumentReference, commentIndex: number, closeForm: () => void }

export const ResponseForm: React.FC<TProps> = ({ commentRef, commentIndex, closeForm }) => {
   const history = useHistory()
   const dispatch = useDispatch()
   const firebase = useContext(FirebaseContext)

   const { authUser, username } = useSelector((store: IStore) => store.authUserStore)
   const [text, setText] = useState<string>('')


   function handleSubmit(event: React.FormEvent) {
      event.preventDefault()

      if (!text) return
      if (!username || !authUser) {
         if (!authUser) history.push('login')
         return
      }

      const preparedText = text.replace('\n', '__n')
      const response: IResponse = {
         authorUsername: username,
         authorUID: authUser?.uid,
         text: preparedText,
         postID: '',
         created: app.firestore.Timestamp.fromMillis(Date.now())
      }

      firebase
         .doCreateResponse(commentRef, response)
         .then((docRef) => dispatch(createResponse(commentIndex, { ...response, docRef })))
         .then(() => closeForm())
         .catch((error) => console.error("Error adding response: ", error))
   }


   return (
      authUser
         ?
         <form className="message-form" onSubmit={handleSubmit}>
            <textarea
               className="message-form__text"
               value={text}
               onChange={(event) => setText(event.target.value)}
               maxLength={1000}
               placeholder="Write a response..."
            >
            </textarea>

            <button className="message-form__submit" type="submit" disabled={!text}>Reply as {username ? username : 'you'}</button>
         </form>
         :
         <div className="message-form-sign-in">
            {/* <Link to={'login'}>Sign in</Link> to write a response */}
            </div>
   )
}