import React from 'react'
import {CgSearch} from 'react-icons/cg'
import { RiNotification2Line } from 'react-icons/ri';
import { CompetitionTable } from './CompetitionTable';
import { StatisticsBar } from './StatisticsBar';
import { TopOrganizer } from './TopOrganizer';

export const Page = () => {
    return (
        <div className="page">
            <div className="d-navbar f-b-c">
                <div className="d-left"><span>Dashboard</span></div>
                <div className="d-right f-n-c">
                    <div className="d-search f-n-c">
                        <div className="d-input">
                            <input type="text" name="search" id="search" placeholder="Search" />
                        </div>
                        <div className="d-icon f-c-c">
                            <CgSearch />
                        </div>
                    </div>
                    <div className="d-notification f-c-c">
                        <RiNotification2Line />
                        <div className="unchecked-notifications">
                            <span>05</span>
                        </div>
                    </div>
                    <div className="d-profile f-n-c">
                        <div className="d-avatar f-c-c">
                            <img src="./../profile.png" alt="" width="20" />
                        </div>
                        <div className="d-name">
                            <p>Sami Egor <span>org</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="org-dashboard">
                <StatisticsBar />
                <div className="split">
                    <CompetitionTable />
                    <TopOrganizer />
                </div>
            </div>
        </div>
    );
}
