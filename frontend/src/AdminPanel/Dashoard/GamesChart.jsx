import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export const GamesChart = () => {

    const chartColors = ['#2697fc', '#ff265c', '#26ff79', '#db26ff'];

    const data = {
        datasets: [{
          label: 'Games Stat',
          data: [200, 150, 80, 150],
          backgroundColor: chartColors,
          hoverOffset: 0,
        }]
      };

    return (
        <div className="game-chart" >
            <Doughnut data={data} width="400" height="400" />
            <div className="chart-infos f-cl-c">
                <div className="info1 f-n-c i-bo">
                    <div className="squar" style={{background: chartColors[0]}}></div>
                    <div className="chart-tooltip">
                        <p>Lorem, ipsum.</p>
                        <span>67</span>
                    </div>
                </div>
                <div className="info2 f-n-c i-bo">
                    <div className="squar" style={{background: chartColors[1]}}></div>
                    <div className="chart-tooltip">
                        <p>Lorem, ipsum.</p>
                        <span>43</span>
                    </div>
                </div>
                <div className="info3 f-n-c i-bo">
                    <div className="squar" style={{background: chartColors[2]}}></div>
                    <div className="chart-tooltip">
                        <p>Lorem, ipsum.</p>
                        <span>37</span>
                    </div>
                </div>
                <div className="info4 f-n-c i-bo">
                    <div className="squar" style={{background: chartColors[3]}}></div>
                    <div className="chart-tooltip">
                        <p>Lorem, ipsum.</p>
                        <span>437</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
