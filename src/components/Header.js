import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import {NavLink} from 'react-router-dom';

class Header extends Component {
  render(){
    return(
      <header>
        <div className='center'>

          <div id='logo'>
            <img src={logo} className='app-logo' alt='Logotipo'/>
            <span id='brand'>
              The<strong>Phone</strong>Cave
            </span>
          </div>

          <nav id='menu'>
            <ul>
              <li>
                <NavLink to='/home' activeClassName='active'>Inicio</NavLink>
              </li>
              <li>
                <NavLink to='/telefonos' activeClassName='active'>Telefonos</NavLink>
              </li>
            </ul>
          </nav>
          <div className='clearfix'></div>
        </div>
      </header>
    )
  }
}
export default Header;