import React, { useState } from "react"
// import { Link } from "react-router-dom"
import Button from "../../components/Button/Button"
import ButtonGroup from "../../components/Button/ButtonGroup"
import Modal from "../../components/Modal/Modal"
import Login from "../../components/Forms/Login"
import Signup from "../../components/Forms/Signup"
import { Container } from "../../GlobalStyles"
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
} from "./InfoSection.elements"

function InfoSection({
  auth,
  setAuth,
  primary,
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
  start,
}) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  return (
    <>
      <InfoSec lightBg={lightBg}>
        {showLoginModal && (
          <Modal close={() => setShowLoginModal(false)}>
            <Login auth={auth} setAuth={setAuth}></Login>
          </Modal>
        )}
        {showRegistrationModal && (
          <Modal close={() => setShowRegistrationModal(false)}>
            <Signup auth={auth} setAuth={setAuth}></Signup>
          </Modal>
        )}
        <Container>
          <InfoRow imgStart={imgStart}>
            <InfoColumn>
              <TextWrapper>
                <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>

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
                {/* <Link to="/sign-up">
                  <Button big fontBig primary={primary}>
                    {buttonLabel}
                  </Button>
                </Link> */}
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start={start}>
                <Img src={img} alt={alt} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  )
}

export default InfoSection
