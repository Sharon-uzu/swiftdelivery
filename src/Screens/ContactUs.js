import React from 'react';



const ContactUs = () => {
  return (
    <div>
        <section className='cont-screen' id='contact'>
          <div className='cont-l'>
            <div className='cont-l-top'>
              <h1>Have Questions?</h1>
              <p>Reach out to our train agent for instant Assistance and Solutions.</p>
            </div>

          </div>

          <div className="cont-r">
            <form className='form'>
                <input type="text" placeholder='Full name'/>
                <input type="email" name="" id="" placeholder='Email'/>
                {/* <input type="tel" placeholder='Phone number'/> */}
                <textarea name="" id="" cols="30" rows="10" placeholder='Message'></textarea>
                <button type='submit'>Send</button>
            </form>
          </div>


        </section>
    </div>
  )
}

export default ContactUs