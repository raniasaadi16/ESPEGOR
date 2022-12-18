import { GoogleLogin  } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../redux/actions/AuthActions';

const Google = () => {
    const dispatch = useDispatch()
    
    const responseSuccessGoogle = async (credentialResponse) => {
        dispatch(googleLogin(credentialResponse.credential))
    }
    const responseFailGoogle = (response) => {
        console.log(response)
    }
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
    );
}

export default Google;
