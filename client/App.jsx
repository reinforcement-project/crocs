import React, { useState, useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import LandingPage from "./Components/LandingPage"
import MainPage from "./Components/MainPage"
import "./index.scss"
import ErrorPage from "./Components/ErrorPage"
import RequestsPage from "./Components/RequestsPage"
import Settings from "./Components/Settings"
import { CircularProgress } from "@material-ui/core"

const App = (props) => {
  // console.log('app.jsx rendered');
  const [auth, setAuth] = useState(false)
  const authToken = localStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(true)
  const [isRead, setIsRead] = useState(false)

  useEffect(() => {
    fetchData()
    // console.log('useeffect called in app.jsx');
  })

  const fetchData = async () => {
    try {
      if (authToken) {
        const isToken = await fetch("auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: authToken }),
        })
        const isTokenVerif = await isToken.json()
        if (isTokenVerif === true) {
          setIsRead(false)
          setAuth(true)
        } else {
          localStorage.removeItem("token")
          setAuth(false)
        }
      } else {
        setAuth(false)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="maindiv">
      {isLoading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
        <Switch>
          <Route exact path="/">
            {auth ? (
              <Redirect to="/main" />
            ) : (
              <LandingPage auth={auth} setAuth={setAuth} />
            )}
          </Route>

          <Route exact path="/main">
            {auth ? (
              <MainPage auth={auth} setAuth={setAuth} isRead={isRead} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/requests">
            {auth ? (
              <RequestsPage
                auth={auth}
                setAuth={setAuth}
                isRead={isRead}
                setIsRead={setIsRead}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/settings">
            {auth ? (
              <Settings auth={auth} setAuth={setAuth} isRead={isRead} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/404" component={ErrorPage} />
          <Redirect to="/404" />
        </Switch>
      )}
    </div>
  )
}

export default App
