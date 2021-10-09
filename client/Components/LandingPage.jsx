import React, { useState, useEffect } from "react"

// Components
import Modal from "./Modal"
import FormLogin from "./FormLogin"
import FormRegister from "./FormRegister"
import Button from "./Button"

// Styles
import styled from "styled-components"

const ButtonGroup = styled.div`
  display: flex;

  > * {
    margin-right: 8px;
  }
`

const LandingPage = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  return (
    <div className="parent landing-page-bg">
      {showLoginModal && (
        <Modal close={() => setShowLoginModal(false)}>
          <FormLogin auth={props.auth} setAuth={props.setAuth}></FormLogin>
        </Modal>
      )}
      {showRegistrationModal && (
        <Modal close={() => setShowRegistrationModal(false)}>
          <FormRegister
            auth={props.auth}
            setAuth={props.setAuth}
          ></FormRegister>
        </Modal>
      )}
      <div className="children">
        <main className="display-xl">
          Connect with your cohort. They have a lot to teach.
        </main>
        <ButtonGroup>
          <Button
            onClick={() => setShowLoginModal(true)}
            variant="fill"
            size="medium"
          >
            Login
          </Button>
          <Button
            onClick={() => setShowRegistrationModal(true)}
            variant="fill"
            size="medium"
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default LandingPage
