import React from 'react'
import { useAuth0 } from '../react-auth0-spa'

const NavBar = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0

  return (
    <div>
      {
        !isAuthenticated && (
          <button onClick={ () => loginWithRedirect({}) }>login</button>
        )
      }
      { isAuthenticated && <button onClick={ () => logout() }>logout</button> }
    </div>
  )
}

export default NavBar