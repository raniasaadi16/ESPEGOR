import React from 'react'
import { Navbar } from '../Global Components/navbar'
import { Form } from './Form'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

export const Register = () => {
    
    const cookies = new Cookies();
    let check = cookies.get('auth_token');
    typeof check === 'undefined' ? check = false : check = true;

    if (check){
        return <Redirect to='/' />;
    }

    return (
        <div id="register">
            <Navbar />
            <div className="login-form f-c-c">
                <div className="wrapper">
                    <div className="top f-cl f-c-c">
                        <img src="./../logo.png" alt="" />
                        <h3>Sign up</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, unde.</p>
                    </div>
                    <div className="bottom">
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}
