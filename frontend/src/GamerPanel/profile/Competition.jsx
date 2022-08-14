import React from 'react'

export const Competition = (props) => {
    return (
        <div className="comp">
            <div className="ttop f-b-c">
                <div className="see f-c-c">
                    <img src="./../eye.svg" alt="" width="14" />
                </div>
            </div>    
            <div className="infos">
                <h3 className="f-n-c">
                    <img src={`http://localhost:3000/assets/competitions/ats.jpg`} alt="" width="26" />
                    <span className="ml-1">{props.data.name}</span>
                </h3>
                <p>{props.data.competition_date}</p>
                <div className="status">Finished</div>
            </div>
        </div>     
    );
}
