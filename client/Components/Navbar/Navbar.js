import React, { useState } from 'react';
import logo from '../../images/logo-graph.png';
import Button from '../Button/Button';
import {
  Nav,
  NavbarContainer,
  NavIcon,
  NavLogo,
  NavMenu,
  NavItem,
  NavLinks,
} from './Navbar.elements';

function Navbar({ setAuth, setCurrentUser, newMessagesInfo }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const newMsgBtnStyle = {
    paddingBottom: '3px',
    borderBottom: '2px solid #7f56d9',
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon src={logo} alt="scratchLogo" />
          </NavLogo>
          <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              {/* Only renders New Messages if there are new messages */}
              {newMessagesInfo[0] && (
                <NavLinks to="/new-messages">
                  <div style={newMsgBtnStyle}>New Messages</div>
                </NavLinks>
              )}
            </NavItem>
            <NavItem>
              <NavLinks to="/settings">Settings</NavLinks>
            </NavItem>
            <NavItem>
              <Button
                variant="fill"
                size="medium"
                onClick={() => {
                  localStorage.clear();
                  setAuth(false);
                  setCurrentUser(null);
                }}
              >
                Log Out
              </Button>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
}

export default Navbar;
