import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
// import './Resources/css/app.css'
import './Resources/sass/style.scss'
import { firebase } from "./firebase";

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  )
}

firebase.auth().onAuthStateChanged((user)=>{
  ReactDOM.render(
    <React.StrictMode>
      <App user={user}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
})

