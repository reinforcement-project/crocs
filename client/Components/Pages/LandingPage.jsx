import React, { useState, useEffect } from "react"

// Components
import Modal from "../Modal"
import Login from "../Forms/Login"
import Signup from "../Forms/Signup"
import Button from "../Button"
import ButtonGroup from "../ButtonGroup"

const LandingPage = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  return (
    <div className="parent landing-page-bg">
      {showLoginModal && (
        <Modal close={() => setShowLoginModal(false)}>
          <Login auth={props.auth} setAuth={props.setAuth}></Login>
        </Modal>
      )}
      {showRegistrationModal && (
        <Modal close={() => setShowRegistrationModal(false)}>
          <Signup auth={props.auth} setAuth={props.setAuth}></Signup>
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
