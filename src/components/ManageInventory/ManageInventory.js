import React from 'react';

const ManageInventory = () => {
    const handleAddProduct = () => {
        fetch('https://calm-basin-65973.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if(data) alert('inserted successfully');
        })
    }
    return (
        <div>
            <h1>Developer is sleeping</h1>
            <button onClick={handleAddProduct}>add products</button>
        </div>
    );
};

export default ManageInventory;