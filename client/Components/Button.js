import React from "react"
import styled from "styled-components"

import { COLORS } from "../utils/constants"

const SIZES = {
  small: {
    "--borderRadius": 4 + "px",
    "--fontSize": 16 / 16 + "rem",
    "--padding": "4px 12px",
  },
  medium: {
    "--borderRadius": 4 + "px",
    "--fontSize": 18 / 16 + "rem",
    "--padding": "12px 20px",
  },
  large: {
    "--borderRadius": 8 + "px",
    "--fontSize": 21 / 16 + "rem",
    "--padding": "16px 32px",
  },
}

const Button = ({ variant, size, onClick, children }) => {
  const styles = SIZES[size]

  let Component
  if (variant === "fill") {
    Component = FillButton
  } else if (variant === "outline") {
    Component = OutlineButton
  } else if (variant === "ghost") {
    Component = GhostButton
  } else {
    throw new Error(`Unrecognized Button variant: ${variant}`)
  }

  return (
    <Component style={styles} onClick={onClick}>
      {children}
    </Component>
  )
}

const ButtonBase = styled.button`
  font-size: var(--fontSize);
  font-family: "Roboto", sans-serif;
  padding: var(--padding);
  border-radius: var(--borderRadius);
  border: 2px solid transparent;

  &:focus {
    outline-color: ${COLORS.primary};
    outline-offset: 4px;
  }
`

const FillButton = styled(ButtonBase)`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};

  &:hover {
    background-color: ${COLORS.primaryHover};
  }
`
const OutlineButton = styled(ButtonBase)`
  background-color: ${COLORS.white};
  color: ${COLORS.primary};
  border: 2px solid currentColor;

  &:hover {
    background-color: ${COLORS.offwhite};
  }
`
const GhostButton = styled(ButtonBase)`
  color: ${COLORS.gray};
  background-color: transparent;
  outline-color: ${COLORS.gray};

  &:hover {
    background: ${COLORS.transparentGray15};
    color: ${COLORS.black};
  }
`

export default Button
