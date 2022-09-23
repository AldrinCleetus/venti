import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import "./styles.scss"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
    <App />
    </BrowserRouter>
  
);


