import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../View/View';

const PrivareRoute = ({ children, ...rest }) => {
    const [loggedInUser] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            loggedInUser.email ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivareRoute;