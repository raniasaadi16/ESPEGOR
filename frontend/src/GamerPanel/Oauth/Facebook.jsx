import React from 'react';
import Cookies from 'universal-cookie';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FacebookLogin } from 'react-facebook-login-component';
import { BsFacebook } from 'react-icons/bs'
export default function Facebook({seterr, signup}) {
    const { setUserType } = useContext(UserContext)
    const history = useHistory();

    const responseFacebook = async (response) => {
        await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/register/fb`, {accessToken: response.accessToken, userID: response.id}).then(res=>{
            if (res.data.logged === true){
                const cookies = new Cookies();
                cookies.set('auth_token', res.data.token);
                const type = res.data.type;
                setUserType(type)
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
            }else{
                seterr(res.data.msg)
            }
        })      
    }

  return <FacebookLogin socialId={process.env.REACT_APP_FB_APP}
  language="en_US"
  scope="email"
  responseHandler={responseFacebook}
  xfbml={true}
  fields="email,name,picture"
  version="v2.5"
  className=" bg-blue-600 px-3 py-3 rounded text-lg"
  buttonText={<BsFacebook/>}
  />

}
