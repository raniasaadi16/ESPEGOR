import React, { useEffect, useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { Pagination } from '../Compoments/Pagination'

import { GroupRecord } from './GroupRecord'
import API from '../../Services/AuthIntercepteurs'

export const Page = (props) => {

    const addToken = () => {
        // document.getElementById("popup-form").style.display = 'block';
        document.getElementById("popup-form").style.display = 'block';
        props.SetGroup(null);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);
    const [reloadPage, setReloadPage] = useState(0);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const formData = new FormData();

        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/get/groups?page=${currentPage}`).then(res => {
            const data = res.data.groups;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            data.forEach(element => {
                setGroups((list) => [...list, element]);
            });
        });
        return () => {
            setShowpagination(false);
            setGroups([]);
        }
    }, [currentPage, reloadPage]);


    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Groups</span>
                <button className="f-n-c" onClick={addToken}><AiOutlinePlus /><span>Add New Group</span></button>
            </div>
            
            <div className="group-holder f-cl">
                <div className="wrapper">  
                    {
                        groups.map((item, i) => {
                            return <GroupRecord key={i} data={item} SetGroup={props.SetGroup} />;
                        })
                    }
                </div>
            </div>

            {/* Pagination */}
            {(showpagination&&pages>1)&&
                <div className="token-pagination">
                    <Pagination currentPage={currentPage} pages={pages} SetCurrentPage={setCurrentPage} />
                </div>
            }
        </div>
    );
}
