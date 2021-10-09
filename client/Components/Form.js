import React from "react"
import styled from "styled-components"

const FormElement = styled.form`
  width: 400px;
  border: 1px dotted silver;
  padding: 26px 32px 32px;
  border-radius: 2px;
`

const Form = ({ children }) => <FormElement> {children} </FormElement>

export default Form
