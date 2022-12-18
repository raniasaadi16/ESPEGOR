import React, { useEffect } from 'react';
import { SiDiscord } from 'react-icons/si'
import { useRouter } from 'next/router';

const Discord = () => {
    const router =useRouter()



    const discordLogin = ()=> {
        window.open(process.env.NEXT_PUBLIC_DISCORD_URI, '_self')
    }
    useEffect(() => {
        console.log(router.asPath)
        //redirect uri must be /register/?code=

        
        // if(history.location.search.split('=')[1]){
        //     async function discordLogin (){
        //         await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/register/discord`, {code: history.location.search.split('=')[1]}).then(res=>{
        //             if (res.data.logged === true){
        //                 const cookies = new Cookies();
        //                 cookies.set('auth_token', res.data.token);
        //                 const type = res.data.type;
        //                 setUserType(type)
        //                 switch (type) {
        //                     case 0:
        //                         history.push("/");
        //                         break;
        //                     case 1:
        //                         history.push('organizer/home');
        //                         break;
        //                     case 2:
        //                         history.push('/dashboard');
        //                         break;
        //                 }
        //             }else{
        //                 seterr(res.data.msg)
        //             }
        //         });
        //     }
        //     discordLogin()
        // }
    }, [router]);
    return (
        <button onClick={discordLogin} className='bg-purple-700 px-3 py-3 rounded text-lg'><SiDiscord/></button>
    );
}

export default Discord;
