/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/counter'
import * as types from '../../app/constants/ActionTypes'

describe('counter reducer', () => {
  const initialState = 0

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle INCREMENT', () => {
    const action = {
      type: types.INCREMENT
    }
    expect(reducer(initialState, action)).toEqual(
      initialState + 1
    )
  })

  it('should handle DECREMENT', () => {
    const action = {
      type: types.DECREMENT
    }
    expect(reducer(initialState, action)).toEqual(
      initialState - 1
    )
  })
})
