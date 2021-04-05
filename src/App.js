import React, {Component} from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap'
import './App.css';
import Menu from './components/MenuComponent'

function App() {
  return (
    <div className>
      <Navbar dark  color="success">
        <div className="container">
          <NavbarBrand href="/">Ristorante</NavbarBrand>
        </div>
      </Navbar>
      <Menu />
    </div>
  );
}

export default App;
