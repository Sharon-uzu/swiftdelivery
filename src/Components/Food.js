import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { addItem } from '../redux/slices/cartSlice'; // Import the addToCart action from your Redux slice
import baseURL from '../Screens/const/baseUrl';

const Food = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [filteredFood, setFilteredFood] = useState([]);
    const [searchName, setSearchName] = useState('');

    const dispatch = useDispatch(); // Initialize the useDispatch hook

    useEffect(() => {
        axios.get(`${baseURL}properties`) // Assuming 'properties' is the endpoint for food items
            .then(response => {
                setFoodItems(response.data);
                setFilteredFood(response.data);
            })
            .catch(error => {
                console.error('Error fetching food items:', error);
            });
    }, []);

    const handleSearch = () => {
        let filtered = foodItems;
        if (searchName) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }
        setFilteredFood(filtered);
    };

    const handleAddToCart = (item) => {
        dispatch(addItem(item)); // Dispatch the action to add the item to the cart
    };

    return (
        <div>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search by name" 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)} 
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            <section className='food-items' id='food-items'>
                {filteredFood.map((item, index) => (
                    <div className="food-item" key={index}>
                        <img 
                            src={item.images && item.images.length > 0 ? item.images[0] : 'defaultImage.jpg'} 
                            alt="Food Item" 
                            className="food-image"
                        />
                        <div className="food-details">
                            <h2 className="food-name">{item.name}</h2>
                            <h4 className="food-price">${item.price}</h4>
                            <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">Add to cart</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Food;
