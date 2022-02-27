import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Input from "../component/Forms/Input"

test("Entering a new email displays that email.", () => {
  const input = render(
    <Input
      type="email"
      variant="standard"
      placeholder="admin@test.com"
      onChange={() => {
        return "hello"
      }}
    />,
  )
  const inputElem = expect(screen.getByTestId("input-component"))
  console.log(inputElem)
})
