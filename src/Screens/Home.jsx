import React from 'react'
import MainHeader from '../Components/MainHeader'
// import HeroTop from '../Components/HeroTop'
import Footer from '../Components/Footer'
import FoodView from '../Components/Food'
import ContactUs from './ContactUs'
import HeroTop from '../Components/HeroTop'
import FoodCards from '../Components/FoodCards'

const Home = () => {
  return (
    <div style={{backgroundColor:'#fff'}}>
      <MainHeader/>
      <HeroTop/>
      <FoodView/>
      <FoodCards/>
      <ContactUs/>
      

      <Footer/>

    </div>
  )
}

export default Home