import React from 'react'
import { FirebaseConstructor } from './FirebaseConstructor'

export const Firebase = new FirebaseConstructor()
export const FirebaseContext = React.createContext<FirebaseConstructor>(Firebase)