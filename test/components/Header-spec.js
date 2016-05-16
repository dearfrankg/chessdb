/* eslint-env mocha */
import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Header from '../../app/components/Header'

function setup () {
  let props = {
    children: 'Redux Starter App 2016'
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Header {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Header Component', () => {
  it('should render correctly', () => {
    const { output, props } = setup()

    expect(output.type).toBe('h1')
    expect(output.props.className).toNotExist()

    const {children: message} = props
    expect(message).toBe('Redux Starter App 2016')
  })
})
