import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import createStore from './store'

const app = document.getElementById('app')
const store = createStore()

store.observe(store => {
  ReactDOM.render(
    <App store={store} />, app
  )
})
