import React from 'react';
import Header from '../Header/Header';
import Shop from '../Shop/Shop';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import NoMatch from '../NoMatch/NoMatch';
import OrderReview from '../OrderReview/OrderReview';
import ManageInventory from '../ManageInventory/ManageInventory';
import { useState } from 'react';
import Shipment from '../Shipment/Shipment';
import PrivareRoute from '../PrivateRoute/PrivareRoute';
import Login from '../Login/Login';

export const UserContext = React.createContext();

const View = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <UserContext.Provider className="container" value={[loggedInUser, setLoggedInUser]}>

            <Router>
                <Header />
                <Switch>

                    <Route exact path="/">
                        <Shop />
                    </Route>

                    <Route path="/shop">
                        <Shop />
                    </Route>

                    <Route path="/order-review">
                        <OrderReview />
                    </Route>

                    <PrivareRoute path="/shipment">
                        <Shipment />
                    </PrivareRoute>

                    {/* <Route path="/shipment">
                        <Shipment />
                    </Route> */}

                    <PrivareRoute path="/manage-inventory">
                        <ManageInventory />
                    </PrivareRoute>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>

    );
};

export default View;