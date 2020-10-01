import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { UserContext } from '../View/View';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser] = useContext(UserContext);

    const formContainer = {
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const onSubmit = data => {
        const products = getDatabaseCart();
        
        const newOrder = {...data, ...products}
        console.log(newOrder);
        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
        .then(res => res.json())
        .then(isOrderCompleted => {
            if(isOrderCompleted) {
                processOrder();
                alert('Thank you for order');
            }
        })
    }


    return (
        <div style={formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })} /> <br />
                {errors.name && <span style={{ color: "red" }}>This field is required</span>} <br />

                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} /> <br />
                {errors.email && <span style={{ color: "red" }}>This field is required</span>} <br />

                <input name="address" ref={register({ required: true })} /> <br />
                {errors.address && <span style={{ color: "red" }}>This field is required</span>} <br />

                <input name="phone" ref={register({ required: true })} /> <br />
                {errors.phone && <span style={{ color: "red" }}>This field is required</span>} <br />

                <button type="submit">Confirm Order</button>
            </form>
        </div>
    );
};

export default Shipment;