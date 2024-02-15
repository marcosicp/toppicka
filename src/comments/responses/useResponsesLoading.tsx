import { useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import app from 'firebase/app'

import { IComment, IResponse } from '../../constants/typescript-types'
import { FirebaseContext } from '../../firebase/FirebaseContext'
import { setResponsesOver, addResponses } from '../../redux/actions'


export function useResponsesLoading(comment: IComment, commentIndex: number) {
   
   const dispatch = useDispatch()
   const {responses, isResponsesOver} = comment
   
   const firebase = useContext(FirebaseContext)

   const limit: number = 10

   const responsesRef = firebase.responsesRef(comment.docRef as app.firestore.DocumentReference)
   const [query, setQuery] = useState(responsesRef.orderBy('created').limit(limit))
   const [loading, setLoading] = useState<boolean>(false)
   
   
   function loadResponses() {
      if (loading) return
      setLoading(true)
      
      query.get().then((documentSnapshots) => {
         if (documentSnapshots.docs.length < limit) {
            dispatch(setResponsesOver(commentIndex))
         }
         if (!documentSnapshots.docs.length) return
         
         const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
         setQuery(responsesRef.orderBy('created').limit(limit).startAfter(lastVisible))
         
         const loadedResponses = documentSnapshots.docs.map((doc) => ({...doc.data(), docRef: doc.ref} as IResponse))
         dispatch(addResponses(commentIndex, loadedResponses))
         
         setLoading(false)
      })
   }
   

   useEffect(() => {
      if (!responses?.length) loadResponses()
      //eslint-disable-next-line
   }, [])

   return {responses, loadResponses, isResponsesOver, isLoading: loading}
}