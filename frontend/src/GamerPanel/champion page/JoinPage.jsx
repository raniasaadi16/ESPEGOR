import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import API from '../../Services/AuthIntercepteurs';

export const JoinPage = (props) => {

    let history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    const [golds, setGolds] = useState(0);
    const [diamonds, setDiamonds] = useState(0);


    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/balance`).then(res => {
        setGolds(res.data.golds);
        setDiamonds(res.data.diamonds);
      });
    }, []);

    console.log('Lame');


    



    return (
        <div className="f-c-c f-cl join-page">
            <h2>Join Competition</h2>
            <p className="joined">You Joined Successfully</p>
            <p>Your Balance Now is : </p>
            <div className="balance f gap10 mt-1">
                <div className="f-c-c"><img src="./../coin.png" alt="" width="15"/><span className="ml-1"> {golds}</span></div>
                <div className="f-c-c"><img src="./../diamond.png" alt="" width="15"/><span className="ml-1"> {diamonds}</span></div>
            </div>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}
