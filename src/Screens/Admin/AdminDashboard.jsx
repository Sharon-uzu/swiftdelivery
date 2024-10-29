import React from 'react';
import { FaCubes,FaUsersSlash } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrShop } from "react-icons/gr";
import Sidebar2 from '../../Components/Sidebar2';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {

    const Cards= [

        {
            text:'Properties',
            icon: FaCubes,
            link:'/adminproperties'
            // background:'#6861ce'
        },
        {
          text:'Vendors',
          icon:FaUsersSlash,
          link:'/vendor'
          // background:'#31ce36'
        },
        
        {
          text:'Clients',
          icon:FaUsers,
          link:'/clients'
          // background:'#6861ce'
          
        },
        {
            text:'User',
            icon: GrShop,
            link:'/user'
            // background:'#f25961'
        },
        
        
        
        // {
        //   text:'Bank',
        //   icon: RiBankFill,
        //   link:'/adminbank'
        //   // background:'#f25961'
    
        // }
        
    ];

    
  return (
    <div className='dashb'>
       

    <section className='dashboard'>

      <Sidebar2/>

      <main>
      {/* <Header2/> */}

      <section className='left'>
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

export default AdminDashboard