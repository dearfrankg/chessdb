/* eslint-env mocha */
import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {App} from '../../app/containers/App'
import Header from '../../app/components/Header'

function setup () {
  let props = {
    counter: 5,
    increment: expect.createSpy(),
    decrement: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<App {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('App container', () => {
  afterEach(() => {
    expect.restoreSpies()
  })

  it('should render correctly', () => {
    const { output, props } = setup()

    expect(output.type).toBe('div')
    expect(output.props.className).toNotExist()

    let [ header, decButton, incButton, counter, blocks ] = output.props.children

    expect(header.type).toBe(Header)

    expect(decButton.type).toBe('button')
    expect(decButton.props.children).toBe('-')

    expect(incButton.type).toBe('button')
    expect(incButton.props.children).toBe('+')

    expect(counter.type).toBe('div')
    expect(counter.props.children).toBe(props.counter)

    expect(blocks.length).toBe(5)
    expect(blocks[0].type).toBe('div')
    expect(blocks[0].props.className).toBe('block')
  })

  it('should call decrement when decrement button clicked', () => {
    const { output, props } = setup()
    let [ , decButton ] = output.props.children

    expect(props.decrement).toNotHaveBeenCalled()
    decButton.props.onClick()
    expect(props.decrement).toHaveBeenCalled()
  })

  it('should call increment when increment button clicked', () => {
    const { output, props } = setup()
    let [ ,, incButton ] = output.props.children

    expect(props.increment).toNotHaveBeenCalled()
    incButton.props.onClick()
    expect(props.increment).toHaveBeenCalled()
  })
})
