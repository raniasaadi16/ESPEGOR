import React, { useEffect, useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import {MdRadioButtonUnchecked} from 'react-icons/md'
import {FaTimes} from 'react-icons/fa'
import {BsCheckLg} from 'react-icons/bs'
import { UncheckedOffer } from './UncheckedOffer'
import { AcceptedOffer } from './AcceptedOffer'
import { RejectedOffer } from './RejectedOffer'
import { Pagination } from '../Compoments/Pagination'

import axios from 'axios'

export const Page = (props) => {

    const addToken = () => {
        document.getElementById("popup-form").style.display = 'block';
    };

    const [transitions, setTransitions] = useState([]);
    const [status, SetStatus] = useState(0);


    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);
    const [reloadPage, setReloadPage] = useState(0);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_SERVER_END_POINT}/transition/type?page=${currentPage}`, {status}).then( res => {
            const data = res.data.transitions;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            data.forEach(element => {
                setTransitions((list) => [...list, element]);
            });
        });
        return () => {
            setShowpagination(false);
            setTransitions([]);
        }
    }, [status, currentPage, reloadPage]);

    const ChangeStatusAttribut = (value) =>{
        SetStatus(value);
    };

    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Tokens</span>
                <button className="f-n-c" onClick={addToken}><AiOutlinePlus /><span>Give away Tokens</span></button>
            </div>
            <div className="token-navbar">
                <ul className="token-links">
                    <li className={status===0?"f-n-c token-navbar-active":"f-n-c"} onClick={() => ChangeStatusAttribut(0)}><MdRadioButtonUnchecked /><span>Unchecked Requests</span></li>
                    <li className={status===2?"f-n-c token-navbar-active":"f-n-c"} onClick={() => ChangeStatusAttribut(2)}><BsCheckLg /><span>Accepted Requests</span></li>
                    <li className={status===1?"f-n-c token-navbar-active":"f-n-c"} onClick={() => ChangeStatusAttribut(1)}><FaTimes /><span>Rejected Requests</span></li>
                </ul>
            </div>
            <div className="token-holder f-cl">
                <div className="wrapper">
                    {
                        status === 0&&transitions.map((item, index) => {
                            return <UncheckedOffer key={index} SetImg={props.SetImg} data={item} reloadPage={reloadPage} SetReloadPage={setReloadPage} />;
                        })
                    }
                    {
                        status === 1&&transitions.map((item, index) => {
                            return <RejectedOffer key={index} SetImg={props.SetImg} data={item} reloadPage={reloadPage} SetReloadPage={setReloadPage} />;
                        })
                    }
                    {
                        status === 2&&transitions.map((item, index) => {
                            return <AcceptedOffer key={index} SetImg={props.SetImg} data={item} reloadPage={reloadPage} SetReloadPage={setReloadPage} />;
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
