import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const products = props.products;
    const totalProductPrice = products.reduce((total, product) => total + product.quantity*product.price, 0);
    const shipping = products.reduce((total, product) => total + product.quantity*product.shipping, 0);
    const tax = (totalProductPrice + shipping) * 0.01;
    const finalCost = totalProductPrice + shipping + tax;

    return (
        <div className='cart'>
            <div className='cart-top'>
                <h2>Order Summary</h2>
                <p>Items ordered: {products.reduce((total, pd) => total+pd.quantity, 0)}</p>
            </div>
            <div className='cart-bottom'>
                <table>
                    <tbody>
                        <tr>
                            <td>Items:</td>
                            <td>${totalProductPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Shipping:</td>
                            <td>${shipping.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Taxes and Vats:</td>
                            <td>${tax.toFixed(2)}</td>
                        </tr>
                        <tr className='grandTotal'>
                            <td>Order Total:</td>
                            <td>${finalCost.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default Cart;