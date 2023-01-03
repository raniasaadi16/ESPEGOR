import React from 'react'
import { Organizer } from './Organizer';

export const TopOrganizer = () => {
    return (
        <div className="top-ranked-orgs">
            <div className="top-orgs">
                <p>Top Organizers</p>
            </div>
            <div className="orgs-holder f-cl">
                <Organizer />
                <Organizer />
                <Organizer />
                <Organizer />
                <Organizer />
                <Organizer />
            </div>
        </div>
    );
}
