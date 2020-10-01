import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = (props) => {
    // console.log(props.product);
    const {img, name, quantity, price, key} = props.product;
    return (
        <div className='product-container'>
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <p className='name'>{name}</p>
                <p><small>Quantity: {quantity}</small></p>
                <p>Price: ${price}</p>
                
                <button 
                    onClick={ () => props.handleRemoveCart(key) } >
                    <FontAwesomeIcon icon={faRemoveFormat} />  remove from cart
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;