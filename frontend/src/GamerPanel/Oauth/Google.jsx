import { GoogleLogin, useGoogleLogin  } from '@react-oauth/google';
import Cookies from 'universal-cookie';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Google = ({seterr}) => {
    const { setUserType } = useContext(UserContext)
    const history = useHistory();

    
    const responseSuccessGoogle = async (credentialResponse) => {
        console.log(credentialResponse)
        await axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/register/google`, {tokenId: credentialResponse.credential}).then(res=>{
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
    const responseFailGoogle = (response) => {
        console.log(response)
    }
    const login = useGoogleLogin({
        onSuccess: tokenResponse => responseSuccessGoogle(tokenResponse),
        flow: 'auth-code',
    });
    return (
        <GoogleLogin
            onSuccess={responseSuccessGoogle}
            onError={() => {
                console.log('Login Failed');
            }}
            shape='squar'
            type='icon'
            size='large'
            width={180}
        />
        // <button onClick={()=> login()}>Google</button>
    );
}

export default Google;
