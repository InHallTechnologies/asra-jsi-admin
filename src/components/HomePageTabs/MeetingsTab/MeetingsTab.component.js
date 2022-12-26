import React, { useEffect, useState } from "react";
import UserDetails from "../../UserDetails/UserDetails.component";
import "./MeetingsTab.style.css"
import sample from "../../../assets/sample.JPG"
import calender from "../../../assets/calendar.png"
import viewers from "../../../assets/group.png"
import { child, get, ref } from "firebase/database";
import { firebasedatabase } from "../../../backend/firebase-handler";

const MeetingsTab = ({type}) => {

    const [entriesList, setEntriesList] = useState([])
    const [heading, setHeading] = useState("")

    useEffect(() => {
        let list = []
        setEntriesList([])
        let table = type==="meetings"?"MEETINGS":type==="success-stories"?"ALL_SUCCESS_STORIES":"ALL_STREET_PLAYS"
        get (child(ref(firebasedatabase), table)).then((snapShot) => {
            if (snapShot.exists()) {
                for (const uid in snapShot.val()) {
                    for (const key in snapShot.child(uid).val()) {
                        list.push(snapShot.child(uid).child(key).val())
                    }
                }
                setEntriesList(list)
            }   
        })
        if (type === "meetings") {
            setHeading("Meetings")
        } else if (type === "success-stories") {
            setHeading("Success Stories")
        } else {
            setHeading("Street Plays")
        }
    }, [])

    return(
        <div className="meetings-tab-container">
            <UserDetails />

            <p style={{marginTop:50, marginBottom:20, fontWeight:500, fontSize:18}}>{heading}</p>

            {
                entriesList.map((item, index) => {return(
                    <div>
                        <div className="blog-container">
                            <div className="slider-info-container">
                                <img src={item.images[0]} alt="sample" className="slider" style={{height:350}} />
                                <div className="info-container">
                                    <div className="title-date-container">
                                        <div className="title-venue-container">
                                            <p className="title">{item.title}</p>
                                            <p className="meta-info">Venue: {item.village}, {item.block}</p>
                                            {/* <p className="meta-info">Host: Rajat sharma</p> */}
                                        </div>
                            
                                        <div className="date-view-container">
                                            <div className="icon-info-container">
                                                <img src={calender} style={{width:15, height:15, marginRight:5}} />
                                                <p style={{fontWeight:400, color:"#ccc"}}>{item.date}</p>
                                            </div>
                                            <div className="icon-info-container">
                                                <img src={viewers} style={{width:15, height:15, marginRight:5}} />
                                                <p style={{fontWeight:400, color:"#ccc"}}>{item.membersInMeeting} attendees</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="content">{item.discription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )})
            }
        </div>
    )
}

export default MeetingsTab