import logo from 'images/text-with-whisk-color.png';
import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

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
          <li className='nav-item'>
            <NavLink to='/' exact className='nav-link'>Feed Me</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/images/new' className='nav-link'>Add Recipe</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/sign_in' className='nav-link'>Sign in</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/signup' className='nav-link'>Sign up</NavLink>
          </li>
        </ul>
      </div>
    </Container>
  </nav>
);

export default Header;
