import { IComment, IResponse } from "../constants/typescript-types"
import { ADD_RESPONSES, SET_RESPONSES_OVER, SET_RESPONSE_LIKES, SET_IS_RESPONSE_LIKED, CREATE_RESPONSE } from "./types"


interface IAction {
   type: string,
   payload: any
}


export function responsesReducer(state: IComment, action: IAction): IComment {
   let responses

   switch (action.type) {
      case ADD_RESPONSES:
         return { ...state, responses: [...state.responses as IResponse[], ...action.payload.responses] }

      case SET_RESPONSES_OVER:
         return { ...state, isResponsesOver: true }

      case CREATE_RESPONSE:
         responses = [...state.responses as IResponse[], action.payload.response]
         return { ...state, responses }

      case SET_RESPONSE_LIKES:
         responses = state.responses as IResponse[]
         responses[action.payload.responseIndex].likesCount = action.payload.likesCount
         return { ...state, responses }

      case SET_IS_RESPONSE_LIKED:
         responses = state.responses as IResponse[]
         responses[action.payload.responseIndex].isLiked = action.payload.isLiked
         return { ...state, responses }

      default:
         return state
   }
}