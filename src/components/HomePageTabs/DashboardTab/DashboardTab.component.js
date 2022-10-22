import { getValue } from "@testing-library/user-event/dist/utils";
import { onValue, ref } from "firebase/database";
import moment from "moment/moment";
import React, { Suspense, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { firebasedatabase } from "../../../backend/firebase-handler";
import EntriesArch from "../../EntriesArch/EntriesArch.component";
import UserDetails from "../../UserDetails/UserDetails.component";
import DashboardGraph from "../DashboardGraph/DashboardGraph.component";
import './DashboardTab.style.css';

const DashboardTab = () => {
    const [todaysData, setTodaysData] = useState([{name:"Dewas", value:0}, {name:"Guna", value:0}, {name:"Rajgarh", value:0}])
    const [todayDewas, setTodayDewas] = useState([{name:"Dewas", value:0}, {name:"Sonkatch", value:0}, {name:"Tonkhurd", value:0}, {name:"Kannod", value:0}, {name:"Khategaon", value:0}, {name:"Bagli", value:0}])
    const [todayGuna, setTodayGuna] = useState([{name:"Guna", value:0}, {name:"Raghogarh", value:0}, {name:"Aron", value:0}, {name:"Chachoda", value:0}, {name:"Bamori", value:0}])
    const [todayRajgarh, setTodayRajgarh] = useState([{name:"Biaora", value:0}, {name:"Jirapur", value:0}, {name:"Khilchipur", value:0}, {name:"Marsinghgarh", value:0}, {name:"Pachore", value:0}, {name:"Rajgarh", value:0}, {name:"Sarangpur", value:0}])
    const [weeklyDewas, setWeeklyDewas] = useState([{name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}])
    const [weeklyGuna, setWeeklyGuna] = useState([{name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}])
    const [weeklyRajgarh, setWeeklyRajgarh] = useState([{name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}])
    
    const dateDay = moment().format('MMMM Do YYYY - dddd');

    let currentDateObj = new Date();
    currentDateObj.setDate(currentDateObj.getDate() - (currentDateObj.getDay() + 2) % 7);
    const dateArray = [
        moment(currentDateObj).format('MMMM Do YYYY - dddd'),
        moment(currentDateObj).add('1', 'days').format('MMMM Do YYYY - dddd'),
        moment(currentDateObj).add('2', 'days').format('MMMM Do YYYY - dddd'),
        moment(currentDateObj).add('3', 'days').format('MMMM Do YYYY - dddd'),
        moment(currentDateObj).add('4', 'days').format('MMMM Do YYYY - dddd'),
        moment(currentDateObj).add('5', 'days').format('MMMM Do YYYY - dddd'),
        moment(currentDateObj).add('6', 'days').format('MMMM Do YYYY - dddd')
    ];


    useEffect(() => {

        let todaysDataTemp = [{name:"Dewas", value:0}, {name:"Guna", value:0}, {name:"Rajgarh", value:0}]
        let todaysDewasTemp = [{name:"Dewas", value:0}, {name:"Sonkatch", value:0}, {name:"Tonkhurd", value:0}, {name:"Kannod", value:0}, {name:"Khategaon", value:0}, {name:"Bagli", value:0}]
        let todaysRajgarhTemp = [{name:"Biaora", value:0}, {name:"Jirapur", value:0}, {name:"Khilchipur", value:0}, {name:"Marsinghgarh", value:0}, {name:"Pachore", value:0}, {name:"Rajgarh", value:0}, {name:"Sarangpur", value:0}]
        let todaysGunaTemp = [{name:"Guna", value:0}, {name:"Raghogarh", value:0}, {name:"Aron", value:0}, {name:"Chachoda", value:0}, {name:"Bamori", value:0}]
        let weeklyDewasTemp = [{name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}]
        let weeklyGunaTemp = [{name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}]
        let weeklyRajgarhTemp = [{name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}, {name:"", value:""}]
        const todaysEntriesRef = ref(firebasedatabase, "DATE_DAY_WISE_ENTRIES")
        
        onValue(todaysEntriesRef, (snapShot)=>{
            for (const date in dateArray) {
                
                if (snapShot.child(dateArray[date]).exists()) {
                    let tempDewas = 0, tempGuna = 0, tempRajgarh = 0;
                    for (const blocks in snapShot.child(dateArray[date]).child("Dewas").val()) {
                        tempDewas += snapShot.child(dateArray[date]).child("Dewas").child(blocks).size
                        if (dateArray[date] === dateDay) {
                            todaysDewasTemp[0].value = snapShot.child(dateArray[date]).child("Dewas").child("Dewas").size
                            todaysDewasTemp[1].value = snapShot.child(dateArray[date]).child("Dewas").child("Sonkatch").size
                            todaysDewasTemp[2].value = snapShot.child(dateArray[date]).child("Dewas").child("Tonkhurd").size
                            todaysDewasTemp[3].value = snapShot.child(dateArray[date]).child("Dewas").child("Kannod").size
                            todaysDewasTemp[4].value = snapShot.child(dateArray[date]).child("Dewas").child("Khategaon").size
                            todaysDewasTemp[5].value = snapShot.child(dateArray[date]).child("Dewas").child("Bagli").size
                        }
                    }
                    for (const blocks in snapShot.child(dateArray[date]).child("Guna").val()) {
                        tempGuna += snapShot.child(dateArray[date]).child("Guna").child(blocks).size
                        if (dateArray[date] === dateDay) {
                            todaysGunaTemp[0].value = snapShot.child(dateArray[date]).child("Guna").child("Guna").size
                            todaysGunaTemp[1].value = snapShot.child(dateArray[date]).child("Guna").child("Raghogarh").size
                            todaysGunaTemp[2].value = snapShot.child(dateArray[date]).child("Guna").child("Aron").size
                            todaysGunaTemp[3].value = snapShot.child(dateArray[date]).child("Guna").child("Chachoda").size
                            todaysGunaTemp[4].value = snapShot.child(dateArray[date]).child("Guna").child("Bamori").size
                        }
                    }
                    for (const blocks in snapShot.child(dateArray[date]).child("Rajgarh").val()) {
                        tempRajgarh += snapShot.child(dateArray[date]).child("Rajgarh").child(blocks).size
                        if (dateArray[date] === dateDay) {
                            todaysRajgarhTemp[0].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Biaora").size
                            todaysRajgarhTemp[1].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Jirapur").size
                            todaysRajgarhTemp[2].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Khilchipur").size
                            todaysRajgarhTemp[3].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Marsinghgarh").size
                            todaysRajgarhTemp[4].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Pachore").size
                            todaysRajgarhTemp[5].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Rajgarh").size
                            todaysRajgarhTemp[6].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Sarangpur").size
                        }
                    }
                    if (dateArray[date] === dateDay) {
                        todaysDataTemp[0].value = tempDewas
                        todaysDataTemp[1].value = tempGuna
                        todaysDataTemp[2].value = tempRajgarh

                        setTodayDewas(todaysDewasTemp)
                        setTodayGuna(todaysGunaTemp)
                        setTodayRajgarh(todaysRajgarhTemp)
                        setTodaysData(todaysDataTemp)
                    } 
                    weeklyDewasTemp[date].name = dateArray[date]
                    weeklyDewasTemp[date].value = tempDewas
                    weeklyGunaTemp[date].name = dateArray[date]
                    weeklyGunaTemp[date].value = tempGuna
                    weeklyRajgarhTemp[date].name = dateArray[date]
                    weeklyRajgarhTemp[date].value = tempRajgarh
                    setWeeklyDewas(weeklyDewasTemp)
                    setWeeklyGuna(weeklyGunaTemp)
                    setWeeklyRajgarh(weeklyRajgarhTemp)
                }
            }
            
            
        }, {onlyOnce:true})

    }, [])

    return (
        <Suspense>
            <div className="dashboard-tab-container tab-container ">

                <UserDetails />

                <div  className='dashboard-graph-container'>
                    <p className="section-heading">Today's Entries - {dateDay}</p>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        <PieChart width={500} height={300}>
                            <Pie data={todaysData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                            <Pie data={todaysData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" />
                            <Tooltip />
                        </PieChart>

                        <BarChart width={500} height={300} data={todaysData} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

                <div  className='dashboard-graph-container'>
                    <p className="section-heading">Today in Dewas</p>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        
                        <BarChart width={1000} height={300} data={todayDewas} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

                <div  className='dashboard-graph-container'>
                    <p className="section-heading">Today in Guna</p>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        
                        <BarChart width={1000} height={300} data={todayGuna} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

                <div  className='dashboard-graph-container'>
                    <p className="section-heading">Today in Rajgarh</p>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        
                        <BarChart width={1000} height={300} data={todayRajgarh} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

                <div  className='dashboard-graph-container'>
                    <p className="section-heading">This Week in Dewas</p>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        
                        <BarChart width={1000} height={300} data={weeklyDewas} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

                <div  className='dashboard-graph-container'>
                    <p className="section-heading">This Week in Guna</p>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        
                        <BarChart width={1000} height={300} data={weeklyGuna} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

                <div  className='dashboard-graph-container'>
                    <p className="section-heading">This Week in Rajgarh</p>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        
                        <BarChart width={1000} height={300} data={weeklyRajgarh} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
                
            </div>
        </Suspense>
    )
}

export default DashboardTab;