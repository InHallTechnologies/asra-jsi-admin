import React from "react";
import UserDetails from "../../UserDetails/UserDetails.component";
import "./MeetingsTab.style.css"
import sample from "../../../assets/sample.JPG"
import calender from "../../../assets/calendar.png"
import viewers from "../../../assets/group.png"

const MeetingsTab = () => {
    return(
        <div className="meetings-tab-container">
            <UserDetails />

            <div className="blog-container">
                <div className="slider-info-container">
                    <img src={sample} alt="sample" className="slider" />
                    <div className="info-container">
                        <div className="title-date-container">
                            <div className="title-venue-container">
                                <p className="title">Where can I get some?</p>
                                <p className="meta-info">Venue: Guna, Guna</p>
                                <p className="meta-info">Host: Rajat sharma</p>
                            </div>
                            
                            <div className="date-view-container">
                                <div className="icon-info-container">
                                    <img src={calender} style={{width:15, height:15}} />
                                    <p>26.08.2022</p>
                                </div>
                                <div className="icon-info-container">
                                    <img src={viewers} style={{width:15, height:15}} />
                                    <p>200 viewers</p>
                                </div>
                            </div>
                        </div>
                        <p className="content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeetingsTab