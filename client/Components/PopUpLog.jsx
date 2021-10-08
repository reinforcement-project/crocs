import React, { useState, useEffect } from "react"
import styled from "styled-components"

// Styles
const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const ModalContent = styled.div`
  background-color: #fff;
`
const LoginForm = styled.form`
  width: 400px;
  border: 1px dotted silver;
  padding: 26px 32px 32px;
  border-radius: 2px;
`
const FormLabel = styled.label`
  display: block;
  margin-bottom: 16px;
`
const FormInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid black;
  border-bottom-width: 2px;
  padding: 6px 8px;
  margin-top: 4px;
  border-radius: 2px 2px 3px 3px;

  &::focus {
    outline: 3px auto blue;
    outline-offset: 2px;
    border-color: transparent;
  }
`
const SubmitButton = styled.button`
  display: block;
  margin-top: 40px;
  width: 100%;
  background: black;
  color: white;
  padding: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 3px;

  &::focus {
    outline: 3px auto blue;
    background: blue;
    outline-offset: 2px;
  }
`

const PopUpLog = ({ auth, setAuth, onClose, show }) => {
  if (!show) {
    return null
  }

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
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <LoginForm>
          {errorOnLogin && (
            <div className="loginerror-message">
              Information you provided does not match our records.
            </div>
          )}
          <FormLabel>
            Email:
            <FormInput
              className="input"
              type="email"
              placeholder="me@you.com"
              onChange={emailEntered}
            />
          </FormLabel>
          <FormLabel>
            Password:
            <FormInput
              className="input"
              type="password"
              onChange={passwordEntered}
            />
          </FormLabel>
          <SubmitButton type="submit" onClick={(e) => submitInfo(e)}>
            Log In
          </SubmitButton>
        </LoginForm>
      </ModalContent>
    </Modal>
  )
}

export default PopUpLog
