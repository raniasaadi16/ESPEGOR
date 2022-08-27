import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import API from '../../Services/AuthIntercepteurs';

export const Post = (props) => {

    const [reaction, setReaction] = useState(0);

    const PostReaction = (value) => {
        API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/post/page/reaction`, {post_id: props.data.id, reaction: value}).then(res => {
            setReaction(value);
        });
    }

    useEffect(() => {
        const c = props.data.reaction;
        setReaction(c===null?0:c);
    }, []);

    return (
        <div className="post">
            <div className="top f-n-c">
                <img src={props.data.icon} className='h-8 w-8' alt="" />
                <span className="ml-1">{props.data.name}</span>
            </div>
            <p>{props.data.title}</p>
            <div className="post-doc">
                <img src={props.data.path} alt="" />
            </div>
            <div className="post-inter f-b-c">
                <div className="lef f gap10">
                    {
                        reaction === 2 ? <div className="clicked-section f-c-c">
                            <div className="button f-c-c">
                                <AiOutlineLike />
                            </div>
                        </div> : <div className="p-section f-c-c" >
                            <div className="button f-c-c" onClick={(e) => PostReaction(2)}>
                                <AiOutlineLike />
                            </div>
                        </div>
                    }

                    {
                        reaction === 1 ? <div className="clicked-section f-c-c">
                        <div className="button f-c-c" >
                            <BiDislike />
                        </div>
                        </div> : <div className="p-section f-c-c">
                            <div className="button f-c-c" onClick={(e) => PostReaction(1)}>
                                <BiDislike />
                            </div>
                        </div>
                    }
                    
                </div>

                <div className="righ f gap10">
                    <span className="f-c-c"><AiOutlineLike /><span className="ml-1">{props.data.likes}</span></span>
                    <span className="f-c-c"><BiDislike /><span className="ml-1">{props.data.dislikes}</span></span>
                </div>
            </div>
        </div>
    );
}
