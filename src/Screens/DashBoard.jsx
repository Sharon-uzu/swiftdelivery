import React from 'react';
import '../App.css';
import SideBar from '../Components/SideBar';
import { FaCubes } from "react-icons/fa6";

import { IoIosSettings } from "react-icons/io";
import { Link } from 'react-router-dom';


const DashBoard = () => {


  const Cards= [

    {
        text:'Products',
        icon: FaCubes,
        link:'/products'
        // background:'#6861ce'
    },

    

    {
      text:'Settings',
      icon: IoIosSettings,
      link:'/settings'
      // background:'#f25961'

    }
    
];




  return (
    <div className='dashb'>
       

        <section className='dashboard'>

          <SideBar/>

          <main>
          {/* <Header2/> */}

          <section className='left'>
         
              {/* <div className='search'>
                <img src={s} alt="" />
                <input type="search" placeholder='Search' />
              </div> */}

              <div className='cards-container'>
              
                {Cards && Cards.map(({icon, text, background, link},index)=>{
                  return(

                    <Link to={link} className="cardss">
                      <div className='card1'>
                      <div className='icon-card' style={{backgroundColor:background}}>
                      
                        <i className='icons'>{React.createElement(icon)}</i>

                      </div>

                      <div className='card-text'>
                        <p>{text}</p>
                      </div>
                    </div>

                    </Link>
                    

                  )
                })}


              
              </div>
          </section>

          </main>
        
        </section>
    </div>
  )
}

export default DashBoard