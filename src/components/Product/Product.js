import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    // console.log(props);
    const { img, name, price, seller, stock, category } = props.product;
    return (
        <div className='product-container'>
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h4>{category.toUpperCase()}</h4>
                <p className='name'>{name}</p>
                <p><small>By: {seller}</small></p>
                <p>Price: ${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                
                <button onClick={() => props.handleAddCart(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} />  add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;