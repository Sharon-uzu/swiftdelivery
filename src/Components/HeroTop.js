import React from 'react';
import rider from '../Assets/rider-removebg-preview.png'

const HeroTop = () => {
  return (
    <div>
      <div className='hero'>
        <section className='hero-content'>
          <div className='h-l'>
            <img src={rider} alt="" />
          </div>

          <div className="h-r">
            <h1>Food Delivery</h1>
            <p>Search for your <span>favourite</span> restaurant and get your meal delivered to your <span>footstep</span>.</p>
          </div>

          {/* You can add other content here if needed */}
          
        </section>
      </div>
    </div>
  );
}

export default HeroTop;
