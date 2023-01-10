import React, { useEffect, useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { Pagination } from '../Compoments/Pagination'

import { GroupRecord } from './GroupRecord'

export const Page = (props) => {

    const addToken = () => {
        // document.getElementById("popup-form").style.display = 'block';
        document.getElementById("popup-form").style.display = 'block';
        props.SetGroup(null);
    };



  


    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Groups</span>
                <button className="f-n-c" onClick={addToken}><AiOutlinePlus /><span>Add New Group</span></button>
            </div>
            
            <div className="group-holder f-cl">
                <div className="wrapper">  
                    {
                        props.groups.map((item, i) => {
                            return <GroupRecord setmsg={props.setmsg} key={i} data={item} SetGroup={props.SetGroup} />;
                        })
                    }
                </div>
            </div>

            {/* Pagination */}
            {(props.showpagination&&props.pages>1)&&
                <div className="token-pagination">
                    <Pagination currentPage={props.currentPage} pages={props.pages} SetCurrentPage={props.setCurrentPage} />
                </div>
            }
        </div>
    );
}
