import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/Layout'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

render(
  <Router>
    <Layout />
  </Router>,
  document.getElementById('root')
)
