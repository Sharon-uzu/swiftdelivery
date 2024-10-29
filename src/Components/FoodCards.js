import React from 'react'
import f1 from '../Assets/burger.jpeg'
import f2 from '../Assets/cc.jpeg'
import f3 from '../Assets/sharwama.jpeg'

const FoodCards = () => {

    const Foods= [
        {
            id:1,
            image:f1 ,
            name: 'Burger',
            desc:"it's juicy, meaty, greasily satisfying. The bun should be slightly crunchy on the outside and soft inside.",
            price: 'N2000'
        },
        {
            id:2,
            image:f2 ,
            name: 'Chicken and Chips',
            desc:"Combination featuring fried or grilled chicken served with crispy french fries (chips). It's a flavorful and convenient.",
            price: 'N1800'
        },
        {
            id:3,
            image:f3 ,
            name: 'Sharwama',
            desc:"Marinated & layered stack of meat (lamb, chicken or turkey) cooked vertically on a spit at high temperatures.",
            price: 'N2500'
        },
        {
            id:4,
            image:f1 ,
            name: 'Burger',
            desc:"it's juicy, meaty, greasily satisfying. The bun should be slightly crunchy on the outside and soft inside.",
            price: 'N2000'
        },
        {
            id:5,
            image:f2 ,
            name: 'Chicken and Chips',
            desc:"Combination featuring fried or grilled chicken served with crispy french fries (chips). It's a flavorful and convenient.",
            price: 'N1800'
        },
        {
            id:6,
            image:f3 ,
            name: 'Sharwama',
            desc:"Marinated & layered stack of meat (lamb, chicken or turkey) cooked vertically on a spit at high temperatures.",
            price: 'N2500'
        },
    
        
    ]
  return (
    <div className='f-c'>
        <h1>Popular Nice Meals</h1>

        <div className="food-cards">

        {
            Foods && Foods.map(item => (
            <div className="food-c" key={item.id}>
                <div className="f-cc">
                    <img src={item.image} alt="" />
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <div className="buy">
                        <h4>{item.price}</h4>
                        <button>Buy</button>
                    </div>
                </div>
                
            </div>

        ))
        }


            
        </div>
    </div>
  )
}

export default FoodCards