import React, { startTransition, useEffect } from "react";
import AuthBox from "../../Hooks/AuthBox.component";
import './home-page.style.css';
import { MdAddCircle, MdSpaceDashboard } from 'react-icons/md';
import { SiGotomeeting } from 'react-icons/si';
import { GiPodiumWinner } from 'react-icons/gi';
import logo from "../../assets/logo.png"
import { FaTheaterMasks, FaArrowAltCircleUp } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import { firebaseAuth } from "../../backend/firebase-handler";
const OperatorsTab = React.lazy(()=>import("../../components/HomePageTabs/OperatorsTab/OperatorsTab.components"));
const DashboardTab = React.lazy(() => import("../../components/HomePageTabs/DashboardTab/DashboardTab.component"));
const ViewEnteriesTab = React.lazy(() => import("../../components/HomePageTabs/ViewEnteriesTab/ViewEntriesTab.component"));
const MeetingsTab = React.lazy(() => import("../../components/HomePageTabs/MeetingsTab/MeetingsTab.component"));

const HomePage = () =>{
    const routes = useParams();
    const navigate = useNavigate();
    

    const handleNavigate = (route) => {
        startTransition(() => {
            navigate(`/${route}`)
        })
    }


    return(
        <AuthBox>
            <div className="homepage-main-container">
                <div className="homepage-sidebar">
                    <img className="homepage-logo" alt="JSI Asra" src={logo} />
                    <div className="homepage-sidebar-container">

                        <div className="homepage-sidebar-options" onClick={_ => handleNavigate("")}>
                            <MdSpaceDashboard size={23} color="white" />
                            <p className="home-page-options-label">Dashboard</p>
                        </div>

                        <div className="homepage-sidebar-options" onClick={_ => handleNavigate("view-entries")} >
                            <MdAddCircle size={23} color="white" />
                            <p className="home-page-options-label">Entries</p>
                        </div>

                        <div className="homepage-sidebar-options" onClick={_ => handleNavigate("operators")}>
                            <FaArrowAltCircleUp size={22} color="white" />
                            <p className="home-page-options-label">Operators</p>
                        </div>
                        <div className="homepage-sidebar-options">
                            <FaArrowAltCircleUp size={22} color="white" />
                            <p className="home-page-options-label">Training and Centers</p>
                        </div>
                        <div className="homepage-sidebar-options" onClick={_ => handleNavigate("meetings")}>
                            <SiGotomeeting size={23} color="white" />
                            <p className="home-page-options-label">Meetings</p>
                        </div>
                        <div className="homepage-sidebar-options" onClick={_ => handleNavigate("success-stories")}>
                            <GiPodiumWinner size={23} color="white" />
                            <p className="home-page-options-label">Success Stories</p>
                        </div>
                        <div className="homepage-sidebar-options" onClick={_ => handleNavigate("street-plays")}>
                            <FaTheaterMasks size={23} color="white" />
                            <p className="home-page-options-label">Street Plays</p>
                        </div>
                        <div className="homepage-sidebar-options" onClick={()=>{firebaseAuth.signOut()}}>
                            <FaTheaterMasks size={23} color="white" />
                            <p className="home-page-options-label">Signout</p>
                        </div>
                    </div>
                </div>
                <div className="homepage-content-container">
                    {
                        routes.selectedTab === 'dashboard'
                        &&
                        <DashboardTab />
                    }
                    {
                        routes.selectedTab === "view-entries"
                        &&
                        <ViewEnteriesTab />
                    }
                    {
                        routes.selectedTab === "operators"
                        &&
                        <OperatorsTab />
                    }
                    {
                        routes.selectedTab === "meetings"
                        &&
                        <MeetingsTab type = {"meetings"} />
                    }
                    {
                        routes.selectedTab === "success-stories"
                        &&
                        <MeetingsTab type = {"success-stories"} />
                    }
                    {
                        routes.selectedTab === "street-plays"
                        &&
                        <MeetingsTab type = {"street-plays"} />
                    }

                </div>
            </div>
        </AuthBox>
    )
}

export default HomePage