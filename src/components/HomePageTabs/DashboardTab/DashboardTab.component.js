import React, { Suspense, useState } from "react";
import EntriesArch from "../../EntriesArch/EntriesArch.component";
import UserDetails from "../../UserDetails/UserDetails.component";
import DashboardGraph from "../DashboardGraph/DashboardGraph.component";
import './DashboardTab.style.css';

const DashboardTab = () => {
    const [entries, setEntries] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

    return (
        <Suspense>
            <div className="dashboard-tab-container tab-container ">

                <UserDetails />
                <DashboardGraph />
                <DashboardGraph />
                <DashboardGraph />
                <DashboardGraph />
                <DashboardGraph />
                
            </div>
        </Suspense>
    )
}

export default DashboardTab;