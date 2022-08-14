import axios from 'axios';
import React, { useState } from 'react'

import ReactQuill from 'react-quill';

export const Form = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [profile, setProfile] = useState(null);

    const Register = (e) => {

        e.preventDefault();

        const fm = new FormData();
        fm.append('name', name);
        fm.append('email', email);
        fm.append('password', password);
        fm.append('profile', profile);
        fm.append('bio', description);

        axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/register`, fm).then(res=>{
            console.log(res.data);
        });
    }
    
    return (
        <div className="form" onSubmit={Register}>
           <form className="f-cl">
                <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <div>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} 
                        style={{height:"20vh", background: "white", color: "black", border: "0px solid transperent"}}/>
                </div>
                <div className="uploadFile f-c-c">
                    <label htmlFor="profile"><img src="./../profile-pic.svg" alt="" width="200" /></label>
                    <input type="file" name="profile" id="profile" accept="image/*" onChange={(e) => setProfile(e.target.files[0])} />
                </div>
                <button type="submit" className="btn">Sign up</button>
            </form>
        </div>
    );
}
