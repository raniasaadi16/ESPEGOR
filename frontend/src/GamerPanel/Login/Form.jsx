import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';



export const Form = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const SubmitForm = (e) => {
        e.preventDefault();
        
        const user = {
            email,
            password,
        };
 
        axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/signin`, user, {headers: {
            "Access-Control-Allow-Origin": "https://egorfront.vercel.app"
        }}).then(res => {
            if (res.data.logged === true){
                const cookies = new Cookies();
                cookies.set('auth_token', res.data.token);
                const type = res.data.type;

                switch (type) {
                    case 0:
                        history.push("/");
                        break;
                    case 1:
                        history.push('organizer/home');
                        break;
                    case 2:
                        history.push('/dashboard');
                        break;
                }
            }
        });
    }

    return (
        <div className="form">
            <form className="f-cl" onSubmit={SubmitForm}>
                <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                <div className="rem-for f-b-c">
                    <div className="remember f-n-c">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                    </div>
                    <div className="forget">
                        <p>Forget Password ? </p>
                    </div>
                </div>
                <button>Sign in</button>
            </form>
        </div>
    )
}
