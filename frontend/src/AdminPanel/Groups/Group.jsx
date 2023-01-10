import React, { useEffect, useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form';
import { ImagePopup } from '../Offers/ImagePopup';
import API from '../../Services/AuthIntercepteurs';

export const Group = () => {

    const [img, setImg] = useState('');

    const [group, setGroup] = useState(null);


    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);
    const [groups, setGroups] = useState([]);
    const [msg, setmsg] = useState('');


    useEffect(() => {

        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/get/groups?page=${currentPage}`).then(res => {
            const data = res.data.groups;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            setGroups(data)
        });
        return () => {
            setShowpagination(false);
            setGroups([]);
        }
    }, [currentPage, msg]);

    return (
        <div id="group">
            <Sidebar index={6} />
            <Page setmsg={setmsg} SetImg={setImg} SetGroup={setGroup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} showpagination={showpagination} groups={groups} />
            <Form group={group} msg={msg} setmsg={setmsg} />
            <ImagePopup img={`${process.env.REACT_APP_SERVER_END_POINT}/assets/transitions/${img}`} />
        </div>
    );
}
