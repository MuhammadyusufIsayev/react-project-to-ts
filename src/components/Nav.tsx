import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <div className='navv'>
      <img src="/Logo.svg" alt="Logo" />
      <ul>
        <Link to='/'>
          <li><img src="/first.svg" alt="Home" /></li>
        </Link>
        <Link to='/products'>
          <li><img src="/add.svg" alt="Products" /></li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
