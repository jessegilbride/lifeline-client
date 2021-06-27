import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props} // the path prop passed in from App
      render={routeProps => (
        TokenService.hasAuthToken()
          ? <Redirect to={'/'} />
          : <Component {...routeProps} />
      )}
    />
  )
}
