import React from "react"
import * as Enzyme from "enzyme"

import Clickable from "../src/Clickable"
import Message from "../src/Message"

describe("<Clickable />", () => {
  let clickable: Enzyme.ShallowWrapper
  const message = "click here to learn a secret"
  const secret = "the owls are not what they seem"

  beforeEach(() => {
    clickable = Enzyme.shallow(
      <Clickable
        message={message}
        secret={secret}
      />
    )
  })

  it("renders only message at first", () => {
    expect(clickable.find(Message).length)
      .toEqual(1)
    expect(clickable.html())
      .toContain(message)
    expect(clickable.html())
      .not
      .toContain(secret)
  })

  it("renders also secret after clicking", () => {
    clickable.simulate("click")
    expect(clickable.find(Message).length)
      .toEqual(1)
    expect(clickable.html())
      .toContain(secret)
  })

  it("hides secret after another click", () => {
    clickable.simulate("click")
    clickable.simulate("click")
    expect(clickable.html())
      .not
      .toContain(secret)
  })
})
