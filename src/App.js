import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { formatPlain } from './generators/renderer';

import Home from './components/Home';
import Addition from './components/Addition';
//import Subtraction from './components/Subtraction';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

function App() {

  return (
    <Home />
  );
}

export default App;

// vim: ft=javascriptreact
