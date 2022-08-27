import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { FaWpforms } from 'react-icons/fa';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { useHistory } from "react-router-dom"
import Cookies from 'universal-cookie';
import Loading from '../../Components/Loading';
import Popup from '../../Components/Popup';
import Success from '../../Components/Success'
import API from './../../Services/AuthIntercepteurs';

export const BuyTokensPopup = (props) => {

    const closeTokenScreenShoot = () => {
        document.getElementById("popup-form").style.display = 'none';
    }

    const [err, seterr] = useState('');
    const [screenShoot, setScreenShoot] = useState(null);
    const [preview, setpreview] = useState('');
    const [loading, setloading] = useState(false);
    const [msg, setmsg] = useState('');
    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setScreenShoot(e.target.files[0]);
        }else{
           seterr('please insert a valid file')
        }
    };
    let history = useHistory()

    const submitOffer = async (e) => {
        e.preventDefault();
    

        const cookies = new Cookies();

        if (!cookies.get('auth_token')){
            return history.push("/login");
        } else if(screenShoot===null) {
            return seterr('You Need To Send The Receipt Before You Ask For Tokens');
        }
    
        const formData = new FormData();
        formData.append('offer_id', props.data.id);
        formData.append('price', props.data.new_price);
        formData.append('golds', props.data.gold_amount);
        formData.append('diamonds', props.data.diamonds_amount);
        formData.append('picture', screenShoot);
        setloading(true)
        await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/transition/create`, formData).then(res => {
            if(!res.data.transition){
                seterr(res.data.msg)
            }else{
                setmsg(res.data.msg)
            }
        });
        closeTokenScreenShoot();
        setloading(false)
        setpreview('')
        
       // window.location.reload()
    }

    useEffect(() => {
       seterr('')
       setmsg('')
       setloading(false)
    }, []);


    return (
        <div id="popup-form">
            {loading && <Loading/>}
            <Popup err={err} seterr={seterr} />
            <Success msg={msg} setmsg={setmsg} />
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeTokenScreenShoot} className="close" />
                    </div>
                    <br />
                    <form className="form screenshoot-ul">
                        <p>Make Sure To Do The Following Before You Send Us The ScreenShoot! </p>
                        <ul>
                            <li>You Sent The Right Amount of Money To The Right Account</li>
                            <li>You Select The Right Offer</li>
                            <li>You Took a Clear Picture To The Reciept</li>
                        </ul>
                        <div className="f-b-c f-cl gap10">
                            <label class="uploadLabel f-b-c">
                                <MdOutlineAddPhotoAlternate style={{width: '200px'}}/>
                                <span className="upload-file-span"></span>
                                <input type="file" class="uploadButton" name="icon" accept="image/*" onChange={upload} />
                            </label>
                            {preview && (
                                        <img src={preview} alt="" style={{width: '100%', margin: '5px 0'}} />
                                    )}
                            <button onClick={submitOffer}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
