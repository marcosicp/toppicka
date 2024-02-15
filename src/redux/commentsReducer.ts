import { IComment, IPost, IStore } from "../constants/typescript-types";
import { ADD_COMMENTS, ADD_POST, SET_COMMENTS_OVER, CREATE_COMMENT, SET_COMMENT_LIKES, SET_IS_COMMENT_LIKED, ADD_RESPONSES, SET_RESPONSES_OVER, SET_RESPONSE_LIKES, SET_IS_RESPONSE_LIKED, CREATE_RESPONSE } from "./types";
import { responsesReducer } from "./responsesReducer";


interface IAction {
   type: string,
   payload: any
}

type TState = IStore['commentsStore']

const INITIAL_STATE: TState = {
   comments: [],
   posts: [],
   isCommentsOver: false
}

export function commentsReducer(state: TState = INITIAL_STATE, action: IAction) {
   let comments: IComment[]
   let post: IPost[]
   let comment: IComment

   switch (action.type) {
      case ADD_POST:
         post = [...state.posts, ...action.payload]
         return { ...state, post }
      case ADD_COMMENTS:
         comments = [...state.comments, ...action.payload]
         return { ...state, comments }

      case SET_COMMENTS_OVER:
         return { ...state, isCommentsOver: true }

      case CREATE_COMMENT:
         comments = [action.payload, ...state.comments]
         return { ...state, comments }
      
      case SET_COMMENT_LIKES:
         comments = state.comments
         comments[action.payload.index].likesCount = action.payload.likesCount
         return { ...state, comments }

      case SET_IS_COMMENT_LIKED:
         comments = state.comments
         comments[action.payload.index].isLiked = action.payload.isLiked
         return { ...state, comments }
      
      case ADD_RESPONSES:
      case SET_RESPONSES_OVER:
      case CREATE_RESPONSE:
      case SET_RESPONSE_LIKES:
      case SET_IS_RESPONSE_LIKED:
         comment = state.comments[action.payload.commentIndex]
         comment = responsesReducer(comment, action)
         comments = state.comments
         comments[action.payload.commentIndex] = comment
         return {...state, comments}

      default:
         return state
   }
}