import React, {useState} from 'react'
import {Link, NavLink } from 'react-router-dom';
// import logo from '../Assets/slash.png'
import { FaBars} from "react-icons/fa";
import { RiCloseFill} from "react-icons/ri";



const MainHeader = () => {

    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click)
        document.body.style.overflow = click ? 'auto' : 'hidden'; // Disable or enable scrolling
    };
    

  return (
    <div className='main-header'>
        <header>
            <nav>
                <div className="m-logo">
                    <Link to='/'><h1>Swift<span>Delivery</span></h1></Link>
                </div>

                {/* <ul className={click ? 'menu active' : 'menu'}> */}
                    <div className='list1'>
                        <div className='list2'>
                        <li><NavLink to='/login' style={{color:'#e63232'}}>Login</NavLink></li>
                        {/* <li className='btn'><NavLink to='/admin'>Get the app</NavLink></li> */}
                    </div>
                    </div>

                {/* </ul> */}
                {/* <div className='bars' onClick={handleClick}>
                    {click ? (<RiCloseFill id='close'/>) : (<FaBars id='bar' style={{color:'#ee2a7b'}}/>)}
                    
                </div> */}
            </nav>
        </header>
    </div>
  )
}

export default MainHeader