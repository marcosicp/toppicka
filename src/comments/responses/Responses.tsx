import React from 'react'
import app from 'firebase/app'

import { ResponseForm } from './ResponseForm'
import { Response } from './Response'

import { useResponsesLoading } from './useResponsesLoading'
import { IComment } from '../../constants/typescript-types'


type TProps = { comment: IComment, commentIndex: number, shouldShowForm: boolean, closeForm: () => void }

export const Responses: React.FC<TProps> = ({ comment, commentIndex, shouldShowForm, closeForm }) => {
   const { responses, loadResponses, isResponsesOver, isLoading } = useResponsesLoading(comment, commentIndex)

   const responsesTemplate = responses?.map((response, index) => (
      <Response
         key={response.created.nanoseconds}
         responseIndex={index}
         commentIndex={commentIndex}
         response={response}
      />
   ))


   const showLoadButton: boolean = !isResponsesOver && !isLoading

   return (
      <div className="responses">
         {shouldShowForm &&
            <ResponseForm
               commentRef={comment.docRef as app.firestore.DocumentReference}
               commentIndex={commentIndex}
               closeForm={closeForm}
            />
         }
         
         {responsesTemplate}
         {showLoadButton && <button onClick={loadResponses}>Load more responses</button>}
      </div>
   )
}