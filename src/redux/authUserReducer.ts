import { CHANGE_AUTH_USER, SET_AUTH_USER_USERNAME } from "./types";
import { TAuthUser, IStore } from "../constants/typescript-types";


interface IAction {
   type: string,
   payload: TAuthUser | string
}

type TState = IStore['authUserStore']


const INITIAL_STATE = {
   authUser: null,
   username: null
}

export function authUserReducer (state: TState = INITIAL_STATE, action: IAction) {
   switch(action.type) {
      case CHANGE_AUTH_USER:
         return { authUser: action.payload, username: null } as TState
      case SET_AUTH_USER_USERNAME:
         return { ...state, username: action.payload } as TState
      default:
         return state
   }
}