import React from 'react'
import SideBar from '../Components/SideBar';

const Settings = () => {
  return (
    <div className='dashb'>
    
    <section className='dashboard'>
            <SideBar/>
            <main>
                

                <div className='setting'>

                    <h3>Edit Profile</h3>

                    <form className='form'>
                    <div>
                        <input type="text" placeholder='First Name'/>
                    </div>

                    <div>
                        <input type="email" placeholder='Your Email Address' />
                    </div>

                    <div>
                        <input type="tel" placeholder='Phone Number'/>
                    </div>

                    <div>
                        <input type="text" placeholder='Address' />
                    </div>
                    
                    <div>
                        <input type="password" placeholder='Change password' />
                    </div>
                    
                    

                    <div>
                        <input type="file" name="" id="" />
                    </div>

                    <button type="submit">Submit</button>

                    </form>
                </div>

                

            </main>
        </section>
    </div>

  )
}

export default Settings