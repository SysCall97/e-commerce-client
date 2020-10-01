import React from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import { useEffect, useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

const OrderReview = () => {
    const [ProductList, setProductList] = useState([]);

    useEffect(() => {
        const savedProductObjects = getDatabaseCart();
        const cartProductKeys = Object.keys(savedProductObjects);

        fetch('https://calm-basin-65973.herokuapp.com/getProductsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartProductKeys)
        })
        .then(res => res.json())
        .then(data => {
            setProductList(cartProductKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedProductObjects[key];
                return product;
            }));
        });
    }, []);

    const handleRemoveItem = (key) => {
        const newListedProductes = ProductList.filter(pd => pd.key !== key);
        setProductList(newListedProductes);
        removeFromDatabaseCart(key);
    }


    return (
        <div className='body-container'>

            <div className="products">
                {
                    ProductList.map(
                        product => <ReviewItem product={product} handleRemoveCart={handleRemoveItem} key={product.key} />
                    )
                }
            </div>


            <div className="cart">
                <Cart products={ProductList}>
                    <Link to="/shipment"><button> Place Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;