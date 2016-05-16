/* eslint-env mocha */
import expect from 'expect'
import * as actions from '../../app/actions/counter'
import * as types from '../../app/constants/ActionTypes'

describe('counter actions', () => {
  describe('decrement', () => {
    it('should create action DECREMENT', () => {
      expect(actions.decrement()).toEqual({
        type: types.DECREMENT
      })
    })
  })

  describe('increment', () => {
    it('should create action INCREMENT', () => {
      expect(actions.increment()).toEqual({
        type: types.INCREMENT
      })
    })
  })
})
