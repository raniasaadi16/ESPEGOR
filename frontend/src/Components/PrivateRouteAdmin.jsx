import React, { useEffect, useState } from 'react'
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'
import API from '../Services/AuthIntercepteurs'

export const PrivateRouteAdmin = ({component: Component, userType, ...rest}) => {


    const isLogin = async () => {
        const cookies = new Cookies();
        let check = cookies.get('auth_token');
        var routeCheck = typeof check === 'undefined' ? false : true;
        
       return routeCheck;
    }
    
    return (
        <Route 
            {...rest}
            render={ props => (
                !isLogin() ? <Redirect to="/login" /> : userType === 2 ? <Component {...props} /> : <Redirect to="/" />
            )}
        >
         </Route>
    );
}