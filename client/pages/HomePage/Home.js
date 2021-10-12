import React, { useState } from "react"
import { data } from "./Data"
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
} from "./Home.elements"

function Home({ auth, setAuth }) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  return (
    <>
      <InfoSec lightBg={data.lightBg}>
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
          <InfoRow imgStart={data.imgStart}>
            <InfoColumn>
              <TextWrapper>
                <TopLine lightTopLine={data.lightTopLine}>
                  {data.topLine}
                </TopLine>
                <Heading lightText={data.lightText}>{data.headline}</Heading>
                <Subtitle lightTextDesc={data.lightTextDesc}>
                  {data.description}
                </Subtitle>
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
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start={data.start}>
                <Img src={data.img} alt={data.alt} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  )
}

export default Home
