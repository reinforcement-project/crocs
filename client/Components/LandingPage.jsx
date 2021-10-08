import React, { useState, useEffect } from "react"
import PopUpLog from "./PopUpLog"
import PopUpReg from "./PopUpReg"
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
  //states to open/close modal, passed as props to PopUpLog, PopUpReg components;
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="parent landing-page-bg">
      <PopUpLog
        onClose={() => setShowLogin(false)}
        show={showLogin}
        auth={props.auth}
        setAuth={props.setAuth}
      />
      <PopUpReg
        onClose={() => setShowRegister(false)}
        show={showRegister}
        auth={props.auth}
        setAuth={props.setAuth}
      />
      <div className="children">
        <main className="display-xl">
          Connect with your cohort. They have a lot to teach.
        </main>
        <ButtonGroup>
          {/* Example of an alternative approach */}
          {/* onClick{() => setSeenLog(!seenLog)} */}
          <Button
            onClick={() => setShowLogin(true)}
            variant="fill"
            size="medium"
          >
            Login
          </Button>
          <Button
            onClick={() => setShowRegister(true)}
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
