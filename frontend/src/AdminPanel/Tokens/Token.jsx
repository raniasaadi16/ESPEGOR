import React, { useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form';
import { ImagePopup } from '../Offers/ImagePopup';

export const Token = () => {
    const [img, setImg] = useState('');

    return (
        <div id="token">
            <Sidebar index={4} />
            <Page SetImg={setImg} />
            <Form />
            <ImagePopup img={`${process.env.REACT_APP_SERVER_END_POINT}/assets/transitions/${img}`} />
        </div>
    );
}
