import React from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { useEffect, useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

const OrderReview = () => {
    const [listedProducts, setListedProducts] = useState([]);

    useEffect(() => {
        const savedProductObjects = getDatabaseCart();
        const listedProductKeys = Object.keys(savedProductObjects);

        setListedProducts(listedProductKeys.map(productKey => {
            const product = fakeData.find(pd => pd.key === productKey);
            product.quantity = savedProductObjects[productKey];
            return product;
        }));
    }, []);

    const handleRemoveItem = (key) => {
        const newListedProductes = listedProducts.filter(pd => pd.key !== key);
        setListedProducts(newListedProductes);
        removeFromDatabaseCart(key);
    }


    // const handlePlaceOrder = () => {
    //     processOrder();
    //     if(listedProducts) setPlaceOrder(true);
    //     setListedProducts([]);
    // }

    return (
        <div className='body-container'>

            <div className="products">
                {
                    listedProducts.map(
                        product => <ReviewItem product={product} handleRemoveCart={handleRemoveItem} key={product.key} />
                    )
                }
            </div>


            <div className="cart">
                <Cart products={listedProducts}>
                    <Link to="/shipment"><button> Place Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;