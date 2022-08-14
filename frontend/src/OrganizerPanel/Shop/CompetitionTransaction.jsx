import React from 'react'

export const CompetitionTransaction = () => {

    return (
        <div className="competition-transaction">
            <div className="name f-n-c">
                <img src="./../profile-pic.svg" alt="" width="20" />
                <p>Mohamed Tahar Et Bouiba</p>
            </div>
            <div className="his-competition f-b-c">
                <h3>Free Fire Max</h3>
                <div className="tokens f">
                    <div className="golds f-n-c">
                        <img src="./../coin.png" alt="" width="14" height="14" />
                        <span>130</span>
                    </div>
                    <div className="diamonds f-n-c">
                        <img src="./../diamond.png" alt="" width="14" height="14" />
                        <span>30</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
