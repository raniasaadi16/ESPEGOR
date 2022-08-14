import React from 'react'

export const StatisticCard = (props) => {
    return (
        <div className="statistic-card">
            <div className="icon f-n-c">
                <div className="bg-icon f-c-c">
                    <img src={`./../${props.icon}`} alt="" width="25" />
                </div>
                <div className="numbers">
                    {props.number}
                </div>
            </div>

            <div className="s-name">
                {props.label}
            </div>

        </div>
    )
}
