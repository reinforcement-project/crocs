import React, { useState, useEffect } from "react"

// Components
import Input from "./Input"
import Label from "./Label"
import Button from "../Button"
import Form from "./Form"

const FormLogin = ({ auth, setAuth }) => {
  //data to set initial state
  const [login, setLogin] = useState(info)
  const [errorOnLogin, setErrorOnLogin] = useState(false)
  const info = {
    email: null,
    password: null,
  }

  // func to extract right cookie with token from response;
  const findCookie = (cookies) => {
    let res = cookies.split("; ")
    console.log(res)
    let rightCookie = ""
    for (let i = 0; i < res.length; i++) {
      if (res[i].includes("ssid=")) {
        rightCookie = res[i].trim()
      }
    }
    res = rightCookie.split("=")[1]
    console.log(res)
    return res
  }

  // submitting request to verify user,
  // if success - set auth to true, this will trigger rerender of App component and redirect from landing to main page;
  // if success - set user name in localStorage,
  // if admin - set user status in localStorage,
  // if new messages available - set newMessage property in localStorage
  // get cookie and store in localStorage,
  const submitInfo = async (e) => {
    e.preventDefault()

    try {
      const data = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      })
      const resp = await data.json()
      console.log("resp on log is", resp)
      if (!resp.hasLogged) {
        setErrorOnLogin(true)
      } else if (resp.hasLogged) {
        const rightCookie = findCookie(document.cookie)
        localStorage.setItem("email", `${login.email}`)
        if (rightCookie) {
          localStorage.setItem("token", rightCookie)
          localStorage.setItem(
            "name",
            `${resp.userInfo.firstName} ${resp.userInfo.lastName}`
          )
        }
        if (resp.userInfo.isAdmin) {
          localStorage.setItem("admin", "true")
        }
        if (resp.userInfo.newMessage === true) {
          localStorage.setItem("newMessage", "true")
        }
        setAuth(true)
      }
    } catch (err) {
      console.log(err)
    }
  }
  // if error state changed and error div rendered change it back in 3 sec
  useEffect(() => {
    if (errorOnLogin) {
      setTimeout(() => {
        setErrorOnLogin(false)
      }, 3000)
    }
  }, [errorOnLogin])

  // changing state to send in request
  const emailEntered = (e) => {
    setLogin((login) => ({ ...login, email: e.target.value }))
  }
  // changing state to send in request
  const passwordEntered = (e) => {
    setLogin((login) => ({ ...login, password: e.target.value }))
  }

  return (
    <Form>
      {errorOnLogin && (
        <div className="loginerror-message">
          Information you provided does not match our records.
        </div>
      )}
      <Label>
        Email:
        <Input
          type="email"
          placeholder="me@you.com"
          onChange={(e) => emailEntered(e)}
        />
      </Label>
      <Label>
        Password:
        <Input type="password" onChange={passwordEntered} />
      </Label>
      <Button type="submit" variant="submit" onClick={(e) => submitInfo(e)}>
        Log In
      </Button>
    </Form>
  )
}

export default FormLogin
