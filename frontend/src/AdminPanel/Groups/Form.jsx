import React, { useEffect, useState } from 'react'
import {FaWpforms} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import ReactQuill from 'react-quill'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import API from '../../Services/AuthIntercepteurs'
import Popup from '../../Components/Popup'


export const Form = ({group}) => {
    const id = group ? group.id : undefined;
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState(null);
    const [preview, setpreview] = useState('');
    const [err, seterr] = useState('');

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setIcon(e.target.files[0]);
        }else{
           seterr('please insert a valid file')
        }
    };
    const closeGame = () => {
        document.getElementById("popup-form").style.display = 'none';
    }

    const CreateNewGroup = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('picture', icon);

        if (id) {
            await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/update/group/${id}`, formData).then(res => {
               
            });
        } else {
            await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/create/group`, formData).then(res => {
            });
        }
        window.location.reload();
    }


    
    useEffect(() => {        
        setName(id?group.name:'');
        setDescription(id?group.description:'');
        setIcon(null);
        setpreview(group? group.icon : '')
    }, [group]);


    return (
        <div id="popup-form">
            <Popup err={err} seterr={seterr} />
            <div className="f-c-c">
                <div className="form-content">
                    <div className="pop-top f-b-c">
                        <FaWpforms />
                        <CgClose onClick={closeGame} className="close" />
                    </div>
                    <div className="pop-label">
                        <p>{"Create a New Group"}</p> 
                        <span>Please fill in the form to create a new group</span>
                    </div>
                    <div className="form">
                        <form>
                            <div className="form-input f-cl">
                                <label htmlFor="name">Group Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="desc f-cl">
                                <label htmlFor="desc">Group Description</label>
                                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                            </div>
                            <div className="file-submit f-cl">
                                <label class="uploadLabel f-c-c">
                                    <MdOutlineAddPhotoAlternate />
                                    <span className="upload-file-span ml-1">Select Group Icon</span>
                                    <input type="file" class="uploadButton" name="icon" accept='image/*'
                                            onChange={upload} />
                                </label>
                                {preview && (
                                        <img src={preview} alt="" style={{width: '100%', margin: '5px 0'}} />
                                    )}
                            </div>
                            <div className="c-button">
                                <button className='w-100' onClick={CreateNewGroup}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
