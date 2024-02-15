import { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'

import { TAuthUser } from '../constants/typescript-types'
import { changeAuthUser, setAuthUserUsername } from '../redux/actions'
import { FirebaseContext } from './FirebaseContext'

export function useAuthentication() {
   const dispatch = useDispatch()
   const firebase = useContext(FirebaseContext)

   useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged((authUser: TAuthUser) => {
         dispatch(changeAuthUser(authUser))
         if (!authUser) return

         firebase.userRef(authUser?.uid).get()
            .then((doc) => {
               if (!doc.exists) return
               const username = doc.data()?.username
               dispatch(setAuthUserUsername(username))
            })
      })

      return unsubscribe
      // eslint-disable-next-line
   }, [])
}