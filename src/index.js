import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "reset-css/reset.css";
import './index.css';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
	<App/>
	</BrowserRouter>,
	document.querySelector('#root')
);
