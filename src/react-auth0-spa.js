/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

const DEFAULT_CALLBACK_REDIRECT = () => window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)
export const Auth0Provider = (
  children,
  onRedirectCallback,
  ...initOptions
) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState()
  const [ user, setUser ] = useState()
  const [ auth0Client, setAuth0 ] = useState()
  const [ loading, setLoading ] = useState(true)
  const [ popUpOpen, setPopUpOpen ] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0(auth0FromHook)

      if(window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()
      setIsAuthenticated(isAuthenticated)
      if(isAuthenticated) {
        const user = auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])
}
