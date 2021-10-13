import React, { useState, useEffect } from "react"
import logo from "../../images/logo-graph.png"
import Button from "../Button/Button"
import {
  Nav,
  NavbarContainer,
  NavIcon,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
} from "./Navbar.elements"

function Navbar({ setAuth, isAdmin, newMessage }) {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener("resize", showButton)

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" onClick={closeMobileMenu}>
            <NavIcon src={logo} alt="scratchLogo" />
          </NavLogo>
          <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              <NavLinks to="/settings">Settings</NavLinks>
            </NavItem>
            <NavItem>
              <Button
                variant="fill"
                size="medium"
                onClick={(e) => {
                  localStorage.clear()
                  setAuth(false)
                }}
              >
                Log Out
              </Button>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
