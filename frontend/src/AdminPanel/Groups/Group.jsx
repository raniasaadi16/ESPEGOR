import React, { useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form';
import { ImagePopup } from '../Offers/ImagePopup';

export const Group = () => {

    const [img, setImg] = useState('');

    const [group, setGroup] = useState(null);


    return (
        <div id="group">
            <Sidebar index={6} />
            <Page SetImg={setImg} SetGroup={setGroup} />
            <Form group={group} />
            <ImagePopup img={`${process.env.REACT_APP_SERVER_END_POINT}/assets/transitions/${img}`} />
        </div>
    );
}
