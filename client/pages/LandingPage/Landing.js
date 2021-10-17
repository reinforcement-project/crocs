import React, { useState } from "react";
import PropTypes from "prop-types";
import { data } from "./Data";
import Button from "../../components/Button/Button";
import ButtonGroup from "../../components/Button/ButtonGroup";
import Login from "../../components/Forms/Login";
import Signup from "../../components/Forms/Signup";
import { Container } from "../../GlobalStyles";
import Modal from "../../components/ModalForPortal";
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
} from "./Landing.elements";

function Landing({ auth, setAuth, setCurrentUser }) {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  return (
    <>
      <InfoSec lightBg={data.lightBg}>
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
                    onClick={() => {
                      setIsLogin(true);
                    }}
                    variant="fill"
                    size="medium"
                  >
                    Login
                  </Button>
                  <Modal
                    onClose={() => {
                      setIsLogin(false);
                    }}
                    open={isLogin}
                  >
                    <Login
                      setCurrentUser={setCurrentUser}
                      setAuth={setAuth}
                    ></Login>
                  </Modal>
                  <Button
                    onClick={() => {
                      setIsSignUp(true);
                    }}
                    variant="fill"
                    size="medium"
                  >
                    Sign Up
                  </Button>
                  <Modal
                    onClose={() => {
                      setIsSignUp(false);
                    }}
                    open={isSignUp}
                  >
                    <Signup
                      setCurrentUser={setCurrentUser}
                      auth={auth}
                      setAuth={setAuth}
                    ></Signup>
                  </Modal>
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
  );
}

Landing.propTypes = {
  auth: PropTypes.bool,
  setAuth: PropTypes.func,
  setCurrentUser: PropTypes.func,
};
export default Landing;
