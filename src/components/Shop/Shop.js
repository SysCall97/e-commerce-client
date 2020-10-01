import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData/index'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const products = fakeData.slice(0, 10);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const savedProductObjects = getDatabaseCart();
        const cartProductKeys = Object.keys(savedProductObjects);

        setProductList(cartProductKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedProductObjects[key];
            return product;
        }));

    }, []);

    const handleAddCart = (product) => {
        const sameProduct = productList.find(pd => pd.key === product.key);
        let count = 1, newProductList;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const rest = productList.filter(pd => pd.key !== product.key);
            newProductList = [...rest, sameProduct];
            console.log(sameProduct);
        } else {
            product.quantity = count;
            newProductList = [...productList, product];
            console.log(product);
        }
        setProductList(newProductList);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className='body-container'>
            <div className='products'>
                {
                    products.map(
                        product => <Product product={product} handleAddCart={handleAddCart} key={product.key} />
                    )
                }
            </div>
            <div className="cart">
                <Cart products={productList}>
                    <Link to="/order-review">
                        <button>Review your order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;