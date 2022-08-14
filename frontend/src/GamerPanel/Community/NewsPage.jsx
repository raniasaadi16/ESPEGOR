import React, { useEffect, useState } from 'react'
import API from '../../Services/AuthIntercepteurs';
import { Post } from './Post'

export const NewsPage = () => {


    const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/followed/page/posts/`).then(res => {
            const list = res.data;
            list.forEach(element => {
                setPosts((list) => [...list, element]);
            });
        });

    }, []);


    return (
        <div className="news f gap10">
            {
                posts.map((item, i) => {
                    return <Post data={item} key={i} />
                })
            }
        </div>
    )
}
