import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props} // the path prop passed in from App
      render={routeProps => (
        TokenService.hasAuthToken()
          ? <Component {...routeProps} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: routeProps.location }
              }}
            />
      )}
    />
  )
}
