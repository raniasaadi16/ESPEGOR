import Interweave from 'interweave'
import React, { useEffect, useState } from 'react'
import { AiOutlineLike, AiOutlinePicture } from 'react-icons/ai'
import { BiDislike } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { FaWpforms } from 'react-icons/fa'
import { MdOutlineAddPhotoAlternate, MdPeopleOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import API from '../../Services/AuthIntercepteurs'
import { Navbar } from '../Global Components/navbar'
import { PagePost } from './PagePost'

export const PagePage = () => {


    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const [posts, setPosts] = useState([]);

    const [infos, setInfos] = useState({});

    const [preview, setpreview] = useState('');
    const page_id = useParams('page_id');

    
    const PopupNewGroup = () => {
        document.getElementById("popup-form").style.display = 'block';
    };

    const PopupCloseNewGroup = () => {
        document.getElementById("popup-form").style.display = 'none';
    };

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setFile(e.target.files[0]);
        }else{
           console.log('err')
        }
    };


    const CreateNewPostPage = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('picture', file);

        API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/page/post/${page_id.id}`, formData).then(res => {
            window.location.reload();
        });

    }

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/page/posts/${page_id.id}`).then(res => {
            const list = res.data;
            list.forEach(element => {
                setPosts((list) => [...list, element]);
            });
        });


        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/page/info/${page_id.id}`).then(res => {
            setInfos(res.data);
        });


    }, []);





    return (
        <div className="grouppage f">
            <Navbar />
            <div className="container">
                <div className="wrapper f">
                    <div className="left">
                        <div className="background">
                            <div className="icon">
                                <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/community/nigh.png`} alt="" />
                            </div>
                            <div className="name">
                                <span>{infos.name}</span>
                            </div>
                            <div className="description">
                                <Interweave content={infos.description} />
                            </div>
                            
                            <div className="created_at">
                                <span>{infos.created_at}</span>
                            </div>

                            <div className="infos">
                                <div className="section f-c-c">
                                    <MdPeopleOutline />
                                    <span className="ml-1">{infos.followers}</span>
                                </div>
                                <div className="section f-c-c">
                                    <AiOutlinePicture />
                                    <span className="ml-1">{infos.posts}</span>
                                </div>
                                <div className="section f-c-c">
                                    <AiOutlineLike />
                                    <span className="ml-1">{infos.total_likes}</span>
                                </div>
                                <div className="section f-c-c">
                                    <BiDislike />
                                    <span className="ml-1">{infos.total_dislikes}</span>
                                </div>
                            </div>
                            <br />
                            <button onClick={PopupNewGroup}>Add New Post</button>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="post-holder f-cl gap10">
                            {
                                posts.map((item, index)=> {
                                    return <PagePost key={index} data={item} />
                                })
                            }
                        </div>
                    </div>
                </div>
                <div id="popup-form" className="c-popup-form">
                    <div className="f-c-c">
                        <div className="form-content">
                            <div className="pop-top f-b-c">
                                <FaWpforms />
                                <CgClose className="close" onClick={PopupCloseNewGroup}/>
                            </div>
                            <div className="pop-label">
                                <p>{"Create a New Post In This Page"}</p> 
                                <span>Please fill in the form to create a new Post</span>
                            </div>
                            <div className="form">
                                <form className="double-form f-cl gap10" encType="multipart/form-data">
                                    <div className="form-input f-cl">
                                        <label htmlFor="name">Title</label>
                                        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="file-submit f-cl">
                                        <label className="uploadLabel f-c-c">
                                            <MdOutlineAddPhotoAlternate />
                                            <span className="upload-file-span ml-1">Select Group Icon</span>
                                            <input type="file" className="uploadButton" name="icon"
                                                onChange={upload} />
                                        </label>
                                        {preview && (
                                            <img src={preview} alt="" style={{width: '100%', margin: '5px 0'}} />
                                        )}
                                    </div>
                                    <div className="c-button">
                                        <button className='w-100' onClick={CreateNewPostPage}>Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
