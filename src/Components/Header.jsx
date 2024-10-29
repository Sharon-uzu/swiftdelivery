import React from 'react';
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <nav>
            <div>
                <h1>Swift<span>Delivery</span></h1>
            </div>
            {/* <ul>
                <button><Link to='/signup'>Register</Link></button>
                <button className='btn'><Link to='/login'>Login</Link></button>
            </ul> */}
        </nav>
    </div>
  )
}

export default Header