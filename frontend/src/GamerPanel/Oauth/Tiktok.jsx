import React from 'react';
import { FaTiktok } from 'react-icons/fa'
const Tiktok = ({seterr}) => {
    const tiktokLogin = ()=> {
        window.open('https://www.tiktok.com/auth/authorize?client_key=aw04cjmdo7dcxkjg&response_type=code&scope=user.info.basic&redirect_uri=http://localhost:3000/register')
    }
    return (
        <button onClick={tiktokLogin} className='my-4 bg-purple-700'><FaTiktok/></button>
    );
}

export default Tiktok;
