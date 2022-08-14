import React, { useEffect, useState } from 'react'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdAdd, MdOutlineAddPhotoAlternate, MdOutlineChecklist } from 'react-icons/md'
import { CgClose } from 'react-icons/cg'
import { Pagination } from '../Compoments/Pagination'
import { Group } from './Group'
import ReactQuill from 'react-quill'
import API from './../../Services/AuthIntercepteurs';


export const GroupHolder = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState(null);


    // paginations
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);


    const [groups, setGroups] = useState([]);

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/get/groups?page=${currentPage}`).then(res => {
            const groupList = res.data.groups;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            groupList.forEach(element => {
                setGroups((list) => [...list, element]);
            });
        });

        return () => {
            setGroups([]);
        }

    }, [currentPage]);

    // const PopupNewGroup = () => {
    //     document.getElementById("popup-form").style.display = 'block';
    // };

    // const PopupCloseNewGroup = () => {
    //     document.getElementById("popup-form").style.display = 'none';
    // };

    const CreateNewGroup = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('icon', icon);

        API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/create/group`, formData);
    }

    const GetAllGroups = () => {
        setGroups([]);
        setCurrentPage(1);
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/get/groups?page=${currentPage}`).then(res => {
            const groupList = res.data.groups;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            groupList.forEach(element => {
                setGroups((list) => [...list, element]);
            });
        });
    }

    const GetJointGroup = () => {
        setGroups([]);
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/joint/groups`).then(res => {
            const groupList = res.data;
            groupList.forEach(element => {
                setGroups((list) => [...list, element]);
            });
        });
    }

    return (
        <>
            <div className="content">
                <div className="top-section f-b-c">
                    <h3>Group List</h3>
                    <div className="options f gap10">
                        <button className="f-c-c" onClick={GetAllGroups}><ImProfile size={18}/></button>
                        <button className="f-c-c" onClick={GetJointGroup}><MdOutlineChecklist size={18}/></button>
                    </div>
                </div>
                <div className="holder">
                    <div className="wrapper">
                        {groups.map((item, index) => {
                            return <Group key={index} data={item} />
                        })}
                    </div>
                </div>
                {
                    (showpagination&&pages>1)&&<Pagination currentPage={currentPage} pages={pages} SetCurrentPage={setCurrentPage} />
                }
                <br /><br />
            </div>
        </>
    )
}
