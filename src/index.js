import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
let routeArr = require('./routes/route').routeArr;
const rootRoute = {
  childRoutes:routeArr
}

render((
  <Router
    history={(hashHistory)}
    routes={rootRoute}
  />
), document.getElementById('app'))