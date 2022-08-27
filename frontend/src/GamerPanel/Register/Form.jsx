import axios from 'axios';
import React, { useState } from 'react'

import ReactQuill from 'react-quill';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Popup from '../../Components/Popup';
import { useHistory } from 'react-router-dom';

export const Form = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [profile, setProfile] = useState(null);
    const [value, setvalue] = useState();
    const [err, seterr] = useState('');
    const [preview, setpreview] = useState('');
    const history = useHistory()

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setProfile(e.target.files[0]);
        }else{
           console.log('err')
        }
    };
    const Register = (e) => {

        e.preventDefault();

        const fm = new FormData();
        fm.append('name', name);
        fm.append('email', email);
        fm.append('password', password);
        fm.append('picture', profile);
        fm.append('bio', description);
        fm.append('phone', value);
        if(!value) return seterr('please insert your phone')

        axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/register`, fm).then(res=>{
            if(res.data.logged){
                history.push('/login')
            }
        });
    }
    
    return (
        <div className="form" onSubmit={Register}>
            <Popup err={err} seterr={seterr} />
           <form className="f-cl">
                <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} required/>
                <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="DZ"
                    value={value}
                    onChange={val => setvalue(val)}
                    className='mb-5'/>
                <div>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} 
                        style={{height:"20vh", background: "white", color: "black", border: "0px solid transperent"}}/>
                </div>
                <div className="uploadFile f-c-c">
                    <label htmlFor="profile">
                        {preview ? <img src={preview} alt="" width="200" className='rounded-full' /> : <img src="./../profile-pic.svg" alt="" width="200" />}
                    </label>
                    <input type="file" name="profile" id="profile" accept="image/*" onChange={upload} />
                </div>
                <button type="submit" className="btn">Sign up</button>
            </form>
        </div>
    );
}
