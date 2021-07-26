import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/LoginAuth';

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           isLogin() ? <Component {...props} /> : <Redirect to="/login" />
        )} />
    );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return(
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />
        )} />
    );
};

export { PrivateRoute, PublicRoute };