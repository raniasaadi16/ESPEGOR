import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import { BsFacebook } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { fbLogin } from '../../redux/actions/AuthActions';

export default function Facebook() {
    const dispatch = useDispatch()

    const responseFacebook = async (response) => {
        dispatch(fbLogin(response.accessToken, response.id))  
    }

  return <FacebookLogin socialId={process.env.NEXT_PUBLIC_FB_APP}
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
