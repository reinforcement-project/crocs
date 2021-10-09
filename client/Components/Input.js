import React from "react"
import styled from "styled-components"

const InputElement = styled.input`
  display: block;
  width: 100%;
  border: 1px solid black;
  border-bottom-width: 2px;
  padding: 6px 8px;
  margin-top: 4px;
  border-radius: 2px 2px 3px 3px;

  &::focus {
    outline: 3px auto blue;
    outline-offset: 2px;
    border-color: transparent;
  }
`

const Input = ({ type, placeholder, onChange }) => {
  return (
    <InputElement type={type} placeholder={placeholder} onChange={onChange} />
  )
}

export default Input
