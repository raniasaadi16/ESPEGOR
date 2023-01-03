import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'

export const PrivateRoute = ({component: Component, userType, ...rest}) => {

    const isLogin = () => {
        const cookies = new Cookies();
        let check = cookies.get('auth_token');
        var routeCheck = typeof check === 'undefined' ? false : true;
        
        return routeCheck;
    }

    return (
        <Route 
            {...rest}
            render={ props => (
                !isLogin() ? <Redirect to="/login" /> : userType === 0 ? <Component {...props} /> : <Redirect to="/dashboard" />
            )}
        >
         </Route>
    );
}