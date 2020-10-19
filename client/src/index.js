import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/override.css'
import App from './components/App';
import { HashRouter as Router } from 'react-router-dom'

const appi = <script>${process.env.REACT_APP_API_URL}</script>

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {appi}
  </Router>,
  document.getElementById('root')
)