import { CHANGE_AUTH_USER, SET_AUTH_USER_USERNAME, ADD_COMMENTS, ADD_POST, SET_COMMENTS_OVER, CREATE_COMMENT, SET_COMMENT_LIKES, SET_IS_COMMENT_LIKED, ADD_RESPONSES, SET_RESPONSES_OVER, CREATE_RESPONSE, SET_RESPONSE_LIKES, SET_IS_RESPONSE_LIKED } from "./types";
import { TAuthUser, IComment, IResponse, IPost } from "../constants/typescript-types";

// authUser -----------------------------------------------------------------------
export const changeAuthUser = (user: TAuthUser) => ({
   type: CHANGE_AUTH_USER,
   payload: user
})

export const setAuthUserUsername = (username: string) => ({
   type: SET_AUTH_USER_USERNAME,
   payload: username
})

// comments -----------------------------------------------------------------------
export const addComments = (comments: IComment[]) => ({
   type: ADD_COMMENTS,
   payload: comments
})

export const addPost = (posts: IPost[]) => ({
   type: ADD_POST,
   payload: posts
})

export const setCommentsOver = () => ({ type: SET_COMMENTS_OVER })

export const createComment = (comment: IComment) => ({
   type: CREATE_COMMENT,
   payload: comment
})

export const setCommentLikes = (commentIndex: number, likesCount: number) => ({
   type: SET_COMMENT_LIKES,
   payload: { index: commentIndex, likesCount }
})

export const setIsCommentLiked = (commentIndex: number, isLiked: boolean) => ({
   type: SET_IS_COMMENT_LIKED,
   payload: { index: commentIndex, isLiked }
})

// responses -----------------------------------------------------------------------
export const addResponses = (commentIndex: number, responses: IResponse[]) => ({
   type: ADD_RESPONSES,
   payload: { commentIndex, responses }
})

export const setResponsesOver = (commentIndex: number) => ({
   type: SET_RESPONSES_OVER,
   payload: { commentIndex }
})

export const createResponse = (commentIndex: number, response: IResponse) => ({
   type: CREATE_RESPONSE,
   payload: { commentIndex, response }
})

export const setResponseLikes = (commentIndex: number, responseIndex: number, likesCount: number) => ({
   type: SET_RESPONSE_LIKES,
   payload: { commentIndex, responseIndex, likesCount }
})

export const setIsResponseLiked = (commentIndex: number, responseIndex: number, isLiked: boolean) => ({
   type: SET_IS_RESPONSE_LIKED,
   payload: { commentIndex, responseIndex, isLiked }
})