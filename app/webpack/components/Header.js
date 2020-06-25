import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import logo from 'images/text-with-whisk-color.png'

const Header = () => (
  <nav className='navbar navbar-expand-sm sticky-top navbar-light'>
    <Container>
      <div id='nav-logo'>
        <NavLink to='/' exact>
          <img src={logo} />
        </NavLink>
      </div>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavDropdown'>
        <ul className='navbar-nav'>
          <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='/#' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              Dropdown
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
              <NavLink to='/' exact className='dropdown-item'>Home</NavLink>
              <NavLink to='/images/new' className='dropdown-item'>Upload Image</NavLink>
            </div>
          </li>
          <li className='nav-item'>
            <NavLink to='/sign_in' className='nav-link'>Sign in</NavLink>
          </li>
        </ul>
      </div>
    </Container>
  </nav>
);

export default Header;
