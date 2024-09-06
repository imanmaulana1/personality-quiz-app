import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='container'>
      <header>
        <h1>Which Element Are You?</h1>
        <p>(based on completely random things)`</p>
        <nav className='nav'>
          <Link to='/'>Home</Link>
          <Link to='/quiz'>Quiz</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
