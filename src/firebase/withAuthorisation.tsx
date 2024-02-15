import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { TAuthUser, IStore } from '../constants/typescript-types'

type TCondition = (authUser: TAuthUser) => boolean

export const withAuthorisation = (condition: TCondition) => (Component: React.FC) => {

   const WithAuthorisation: React.FC = (props) => {
      const history = useHistory()
      const authUser = useSelector((store: IStore) => store.authUserStore.authUser)
      const isConfirm = condition(authUser)

      if (!isConfirm) {
         history.push('/login')
      }

      return isConfirm ? <Component {...props} /> : null
   }

   return WithAuthorisation
}