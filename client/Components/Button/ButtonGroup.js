import React from "react"
import styled from "styled-components"

const GroupElement = styled.div`
  display: flex;

  > * {
    margin-right: 8px;
  }
`

const ButtonGroup = ({ children }) => {
  return <GroupElement>{children}</GroupElement>
}

export default ButtonGroup
