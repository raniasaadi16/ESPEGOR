import React, { useEffect, useState } from 'react';
import API from './../../Services/AuthIntercepteurs';

import Interweave from 'interweave';
import ReactQuill from 'react-quill';

export const InfosHolder = ({transitions}) => {
    const [profileInfo, setProfileInfo] = useState({});
    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/profile`).then(res => {
            console.log(res)
            setProfileInfo(res.data);
            setName(res.data.name);
            setDesc(res.data.bio);
            setProfile(res.data.profile_image);
        });
    }, [transitions]);

    const [editNavbar, setEditNavbar] = useState(0);

    const navigateEditInfoPanel = (index) => {
        setEditNavbar(index);
    }


    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rnewPassword, setRnewPassword] = useState('');

    const EditPassword = (e) => {
        e.preventDefault();
        if (newPassword === rnewPassword){
            if (newPassword.length > 5){

                const record = {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }
        
                API.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/change/password`, record).then((res) => {
                    if (res.data.isCorrect === true){
                        window.location.reload();
                    } else {
                        window.confirm(res.data.msg);
                    }
                });
            } else {
                window.confirm ("Your Password Must Be At Least 6 Characters");
            }
        } else {
            window.confirm ("Your Password Didn't Match");
        }
    }

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const EditInfos = (e) => {
        e.preventDefault();
        const record = {
            name, 
            desc,
        };

        API.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/change/infos`, record).then((res) => {
            if (res.data.isValid){
                window.location.reload();
            } else {
                window.confirm(res.data.msg);
            }
        });
    }

    
    const [profile, setProfile] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [uploadProfiletoggle, setUploadProfiletoggle] = useState(false);

    const EditProfilePicture = async () => {
        setUploadProfiletoggle(false);
        const formData = new FormData();
        formData.append('profile', profileImage);
        var res = await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/player/change/picture`, formData);
        setProfile(res.data.picture);
    }

    const ShowUploadProfileButton = () => {
        setUploadProfiletoggle(true);
    }

    const HideUploadProfileButton = () => {
        setUploadProfiletoggle(false);
    }

    return (
        <>
        <div id="infos">
            <div className="p-left f f-cl">
                <div className="p-profile">
                    <img src={profile} alt="" width="300" />
                    <div className="change-profile f-c-c" onClick={ShowUploadProfileButton}>
                        <label htmlFor="change-profile-id"><img src="./../add-image.svg" alt="" width="20" /></label>
                        <input type="file" name="profile" id="change-profile-id" accept="images/*" 
                            onChange={(e) => {setProfileImage(e.target.files[0])}}
                        />
                    </div>
                    <button className={uploadProfiletoggle ? 'profile-pic-upload' : 'profile-pic-hidden'} onClick={EditProfilePicture}>Upload</button>
                </div>
                <div className="p-left-infos">
                    <div className="in f-n-c">
                        <img src="./../coin.png" alt="" width="16" />
                        <span className="ml-1">Golds : <span className="value">{profileInfo.golds}</span></span>
                    </div>
                    <div className="in f-n-c">
                        <img src="./../diamond.png" alt="" width="16" />
                        <span className="ml-1">Diamonds : <span className="value">{profileInfo.diamonds}</span></span>
                    </div>
                    <div className="in f-n-c">
                        <img src="./../competition-icon.svg" alt="" width="16" />
                        <span className="ml-1">Competitions : <span className="value">{profileInfo.comps}</span></span>
                    </div>
                </div>
            </div>
            <div className="p-right w-100">
                <div className="top f-b-c">
                    <h2 className="name">{profileInfo.name}</h2>
                    <button onClick={() => navigateEditInfoPanel(1)}>Edit Profile</button>
                </div>
                <p className="id">G-{profileInfo.id}</p>
                <p className="email">email: {profileInfo.email}</p>
                <p className="email">phone: {profileInfo.phone}</p>
                <p className="desc">
                    <Interweave content={profileInfo.bio} />
                </p>
            </div>
        </div>
        {
        editNavbar !== 0 &&
        <div className="editprofile">
            <div className="f-b-c">
                <ul className='f gap10'>
                    <li className={editNavbar === 1 && "active"} onClick={() => navigateEditInfoPanel(1)}>Edit Info</li>
                    <li className={editNavbar === 2 && "active"} onClick={() => navigateEditInfoPanel(2)}>Edit Password</li>
                </ul>
                <button className="hide f-c-c" onClick={() => navigateEditInfoPanel(0)}>X</button>
            </div>
            <br />
            {/* Edit Infos */}
            {
            editNavbar === 1 &&
            <div className="editinfo">
                <form>
                    <div className="input f-cl">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input f-cl">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" value={profileInfo.email}  disabled />
                    </div>
                    <div className='input f-cl'>
                        <label htmlFor="description">Description</label>
                        <ReactQuill theme="snow" value={desc} onChange={setDesc}
                            style={{height:"25vh", background: "white", color: "black", border: "0px solid transperent"}}/>
                    </div>
                    <br /><br />
                    <div className="btn">
                        <button onClick={EditInfos}>Edit Your Infos</button>
                    </div>
                </form>
            </div>
            }
            {/* Edit Password */}
            {
            editNavbar === 2 &&
            <div className="editinfo">
                <form>
                    <div className="input f-cl">
                        <label htmlFor="old">Your Current Password</label>
                        <input type="password" name="old" id="old" onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="input f-cl">
                        <label htmlFor="new">Your New Password</label>
                        <input type="password" name="new" id="new" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="input f-cl">
                        <label htmlFor="rnew">Repeat New Password</label>
                        <input type="password" name="rnew" id="rnew" onChange={(e) => setRnewPassword(e.target.value)} />
                    </div>
                    <div className="btn">
                        <button onClick={EditPassword}>Change Your Password</button>
                    </div>
                </form>
            </div>
            }
        </div>
        }
        </>
    )
}
