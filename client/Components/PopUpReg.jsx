import React, { useState, useEffect } from "react"
import SkillButton from "./SkillButton"

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
const RegistrationForm = styled.form`
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

/*
signup pop up component
 */
const PopUpReg = ({ onClose, show, auth, setAuth }) => {
  if (!show) {
    return null
  }

  // initial state info for authorization
  const info = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    skillsToTeach: {},
  }
  //state to hold info for authorization
  const [data, setData] = useState(info)
  //state to handle skills available in database
  const [skills, setSkills] = useState([])

  const [skillId, setSkillId] = useState({})
  //loading component while awaiting data
  const [isLoading, setIsLoading] = useState(true)
  //state to conditionally render error message on unsuccessfull signup
  const [errorOnSignup, setErrorOnSignup] = useState(false)

  //getting skills on mount from backend
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const res = await fetch("/api/allSkills/all")
      const response = await res.json()
      const skillNames = []
      for (let i = 0; i < response.length; i++) {
        skillNames.push(response[i].name)
        setSkillId((prevstate) => {
          prevstate[response[i].name] = response[i]._id
          return prevstate
        })
      }
      setSkills(skillNames)
    } finally {
      setIsLoading(false)
    }
  }

  //if skills to teach weren't added to array - add, otherwise remove from array
  const skillButtonClick = (e) => {
    data.skillsToTeach[e]
      ? setData((prevstate) => {
          delete prevstate.skillsToTeach[e]
          return prevstate
        })
      : setData((prevstate) => {
          prevstate.skillsToTeach[e] = skillId[e]
          return prevstate
        })
  }

  const passwordEntered = (e) => {
    setData((data) => ({ ...data, password: e.target.value }))
  }

  const emailEntered = (e) => {
    setData((data) => ({ ...data, email: e.target.value }))
  }

  const firstNameEntered = (e) => {
    setData((data) => ({ ...data, firstName: e.target.value }))
  }

  const lastNameEntered = (e) => {
    setData((data) => ({ ...data, lastName: e.target.value }))
  }
  // func to find right cookie on successfull auth that holds token;
  const findCookie = (cookies) => {
    let res = cookies.split("; ")
    let rightCookie = ""
    for (let i = 0; i < res.length; i++) {
      if (res[i].includes("ssid=")) {
        rightCookie = res[i].trim()
      }
    }
    res = rightCookie.split("=")[1]
    return res
  }
  // func to submit auth info. updates states of errors on unsuccessful signup.
  // on successful signup stores cookie as token in localStorage;
  // finds if user is admin, has messages and stores data in localStorage;
  // sets auth to true and redirects to '/main';

  const submitInfo = async () => {
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const resp = await res.json()
      if (!resp.hasLogged) {
        setErrorOnSignup(true)
      } else if (resp.hasLogged === "format") {
        setErrorOnSignup("format")
      } else if (resp.hasLogged === "empty") {
        setErrorOnSignup("empty")
      } else if (resp.hasLogged) {
        const rightCookie = findCookie(document.cookie)
        localStorage.setItem("email", `${data.email}`)
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
        props.setAuth(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (
      errorOnSignup === true ||
      errorOnSignup === "format" ||
      errorOnSignup === "empty"
    ) {
      setTimeout(() => {
        setErrorOnSignup(false)
      }, 3000)
    }
  }, [errorOnSignup])

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <RegistrationForm>
          {errorOnSignup === true && (
            <div className="loginerror-message">
              This email is registered in our system. Please try to login.
            </div>
          )}
          {errorOnSignup === "empty" && (
            <div className="loginerror-message">All fields are required.</div>
          )}
          {errorOnSignup === "format" && (
            <div className="errordiv">
              <div className="loginerror-message">
                Incorrect email format. Please enter valid email.
              </div>
            </div>
          )}
          <FormLabel>
            Email:
            <FormInput
              type="email"
              placeholder="Enter email"
              onChange={emailEntered}
            />
          </FormLabel>
          <FormLabel>
            Password:
            <FormInput
              type="password"
              placeholder="Enter password"
              onChange={passwordEntered}
            />
          </FormLabel>
          <FormLabel>
            First Name:
            <FormInput
              type="name"
              placeholder="Enter first name"
              onChange={firstNameEntered}
            />
          </FormLabel>
          <FormLabel>
            Last Name:
            <FormInput
              type="name"
              placeholder="Enter last name"
              onChange={lastNameEntered}
            />
          </FormLabel>
          <div className="form-group-add">
            Please select skills you can help others with
          </div>
          <div>
            {skills.map((skill) => (
              <SkillButton
                key={skill}
                id={skill}
                onClick={skillButtonClick}
                skill={skill}
              />
            ))}
          </div>
          <SubmitButton
            type="button"
            className="signupbutton"
            onClick={submitInfo}
          >
            Sign Up
          </SubmitButton>
        </RegistrationForm>
      </ModalContent>
    </Modal>
  )
}

export default PopUpReg
