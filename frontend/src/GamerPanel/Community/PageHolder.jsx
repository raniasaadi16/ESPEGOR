import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaWpforms } from 'react-icons/fa'
import { MdAdd, MdOutlineAddPhotoAlternate } from 'react-icons/md'
import ReactQuill from 'react-quill'
import API from '../../Services/AuthIntercepteurs'
import { Pagination } from '../Compoments/Pagination'
import { Page } from './Page'

export const PageHolder = () => {
    
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


    
    // paginations
    const [currentPage, setCurrentPage] = useState(1);
    const [ppages, setPpages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);


    const [pages, setPages] = useState([]);




    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/get/pages?page=${currentPage}`).then(res => {
            const pagesList = res.data.pagesList;
            setPpages(parseInt(res.data.pages));
            setShowpagination(true);
            pagesList.forEach(element => {
                setPages((list) => [...list, element]);
            });
        });

        return () => {
            setPages([]);
        }

    }, [currentPage]);


    const PopupNewPage = () => {
        document.getElementById("popup-form").style.display = 'block';
    };

    const PopupCloseNewGroup = () => {
        document.getElementById("popup-form").style.display = 'none';
    };

    const CreateNewPage = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('picture', icon);

        await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/create/page`, formData);
        window.location.reload()
    }


    return (
        <>
            <div className="content">
                <div className="top-section f-b-c">
                    <h3>Page List</h3>
                    <button className="f-c-c" onClick={PopupNewPage}><MdAdd  size={18}/><span className='ml-1'>Create New Page</span></button>
                </div>
                <div className="holder">
                    <div className="wrapper">
                        {pages.map((item, i) => {
                            return <Page key={i} data={item} />
                        })}
                    </div>
                </div>
                {
                    (showpagination&&ppages>1)&&<Pagination currentPage={currentPage} pages={ppages} SetCurrentPage={setCurrentPage} />
                }
                <div id="popup-form" className="c-popup-form">
                    <div className="f-c-c">
                        <div className="form-content">
                            <div className="pop-top f-b-c">
                                <FaWpforms />
                                <CgClose className="close" onClick={PopupCloseNewGroup} />
                            </div>
                            <div className="pop-label">
                                <p>{"Create a New Group"}</p> 
                                <span>Please fill in the form to create a new page</span>
                            </div>
                            <div className="form">
                                <form className="double-form f-cl gap10" encType="multipart/form-data">
                                    <div className="form-input f-cl">
                                        <label htmlFor="name">Page Name</label>
                                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="desc f-cl">
                                        <label htmlFor="desc">Page Description</label>
                                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                                    </div>
                                    <div className="file-submit f-cl">
                                        <label class="uploadLabel f-c-c">
                                            <MdOutlineAddPhotoAlternate />
                                            <span className="upload-file-span ml-1">Select Page Icon</span>
                                            <input type="file" class="uploadButton" name="icon" accept='image/*'
                                                 onChange={upload} />
                                        </label>
                                        {preview && (
                                        <img src={preview} alt="" style={{width: '100%', margin: '5px 0'}} />
                                        )}
                                    </div>
                                    <div className="c-button">
                                        <button className='w-100' onClick={CreateNewPage}>Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        </>
    )
}
