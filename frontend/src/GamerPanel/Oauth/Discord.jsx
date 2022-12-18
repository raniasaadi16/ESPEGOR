import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { SiDiscord } from 'react-icons/si'
const Discord = ({seterr}) => {
    const history = useHistory()
    const { setUserType } = useContext(UserContext)


    const discordLogin = ()=> {
        window.open(process.env.REACT_APP_DISCORD_URI)
    }
    useEffect(() => {
        if(history.location.search.split('=')[1]){
            async function discordLogin (){
                await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/register/discord`, {code: history.location.search.split('=')[1]}).then(res=>{
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
                });
            }
            discordLogin()
        }
    }, [history]);
    return (
        <button onClick={discordLogin} className='bg-purple-700 px-3 py-3 rounded text-lg'><SiDiscord/></button>
    );
}

export default Discord;
