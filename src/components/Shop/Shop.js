import React, { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        fetch('https://calm-basin-65973.herokuapp.com/getAllProducts')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);


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