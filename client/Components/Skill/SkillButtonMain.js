import React, { useState } from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  background: ${(p) => (p.selected ? "#5c93f0" : "white")};
  border: 1px solid #5c93f0;
  color: ${(p) => (p.selected ? "white" : "#5c93f0")};
  border-radius: 20px;
  height: 40px;
  padding: 0px 16px;
  margin: 0.3vh 0.3vw;
  &:hover {
    background: #5c93f0;
    color: white;
  }
`;

const SkillButton = ({ selected, handleClick, children }) => {
  return (
    <ButtonStyled selected={selected} onClick={handleClick}>
      {children}
    </ButtonStyled>
  );
};

export default SkillButton;
