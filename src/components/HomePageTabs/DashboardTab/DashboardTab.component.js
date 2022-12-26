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
    const [genderData, setGenderDataToday] = useState([{name:"Male", value:0}, {name:"Female", value:0}, {name:"Other", value:0}])
    const [vaccineData, setVaccineDataToday] = useState([{name:"Corbevax", value:0}, {name:"Covaxin", value:0}, {name:"Covishield", value:0}, {name:"Covovax", value:0}, {name:"Sputnik", value:0}, {name:"Zycov-D", value:0}])
    const [doseData, setDoseDataToday] = useState([{name:"1st Dose", value:0}, {name:"2nd Dose", value:0}, {name:"Precautionary Dose", value:0}])
    const [totalVaccinations, setTotalVaccinations] = useState(0)
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
        let genderDataTodayTemp = [{name:"Male", value:0}, {name:"Female", value:0}, {name:"Other", value:0}]
        let vaccineDataTodayTemp = [{name:"Corbevax", value:0}, {name:"Covaxin", value:0}, {name:"Covishield", value:0}, {name:"Covovax", value:0}, {name:"Sputnik", value:0}, {name:"Zycov-D", value:0}]
        let doseDataTodayTemp = [{name:"1st Dose", value:0}, {name:"2nd Dose", value:0}, {name:"Precautionary Dose", value:0}]
        let totalVaccinationsTemp = 0
        const todaysEntriesRef = ref(firebasedatabase, "DATE_WISE_VACCINATION_DATA")
        
        onValue(todaysEntriesRef, (snapShot) => {
            for (const date in snapShot.val()) {
                for (const district in snapShot.child(date).val()) {
                    for (const block in snapShot.child(date).child(district).val()) {
                        const obj = snapShot.child(date).child(district).child(block).val()
                        totalVaccinationsTemp += obj["value"]
                        for (const gender in obj["gender"]) {
                            if (gender === "Male") {
                                genderDataTodayTemp[0].value += obj["gender"]["Male"]
                            } else if (gender === "Female") {
                                genderDataTodayTemp[1].value += obj["gender"]["Female"]
                            } else {
                                genderDataTodayTemp[2].value += obj["gender"]["Others"]
                            }
                        }
                        for (const vaccine in obj["vaccine"]) {
                            if (vaccine === "Corbevax") {
                                vaccineDataTodayTemp[0].value += obj["vaccine"]["Corbevax"]
                            } else if (vaccine === "Covaxin") {
                                vaccineDataTodayTemp[1].value += obj["vaccine"]["Covaxin"]
                            } else if (vaccine === "Covishield") {
                                vaccineDataTodayTemp[2].value += obj["vaccine"]["Covishield"]
                            } else if (vaccine === "Covovax") {
                                vaccineDataTodayTemp[3].value += obj["vaccine"]["Covovax"]
                            } else if (vaccine === "Sputnik") {
                                vaccineDataTodayTemp[4].value += obj["vaccine"]["Sputnik"]
                            } else {
                                vaccineDataTodayTemp[5].value += obj["vaccine"]["Zycov-D"]
                            } 
                        }
                        for (const dose in obj["dose"]) {
                            if (dose === "1st Dose") {
                                doseDataTodayTemp[0].value += obj["dose"]["1st Dose"]
                            } else if (dose === "2nd Dose") {
                                doseDataTodayTemp[1].value += obj["dose"]["2nd Dose"]
                            } else {
                                doseDataTodayTemp[2].value += obj["dose"]["Precautionary Dose"]
                            }
                        }
                    }
                }
            }
            setGenderDataToday(genderDataTodayTemp)
            setDoseDataToday(doseDataTodayTemp)
            setVaccineDataToday(vaccineDataTodayTemp)
            setTotalVaccinations(totalVaccinationsTemp)
        }, {onlyOnce:true})


        onValue(todaysEntriesRef, (snapShot)=>{



            for (const date in dateArray) {
                
                if (snapShot.child(dateArray[date]).exists()) {
                    let tempDewas = 0, tempGuna = 0, tempRajgarh = 0;
                    for (const blocks in snapShot.child(dateArray[date]).child("Dewas").val()) {
                        tempDewas += snapShot.child(dateArray[date]).child("Dewas").child(blocks).child("value").val()
                        if (dateArray[date] === dateDay) {
                            todaysDewasTemp[0].value = snapShot.child(dateArray[date]).child("Dewas").child("Dewas").child("value").val()
                            todaysDewasTemp[1].value = snapShot.child(dateArray[date]).child("Dewas").child("Sonkatch").child("value").val()
                            todaysDewasTemp[2].value = snapShot.child(dateArray[date]).child("Dewas").child("Tonkhurd").child("value").val()
                            todaysDewasTemp[3].value = snapShot.child(dateArray[date]).child("Dewas").child("Kannod").child("value").val()
                            todaysDewasTemp[4].value = snapShot.child(dateArray[date]).child("Dewas").child("Khategaon").child("value").val()
                            todaysDewasTemp[5].value = snapShot.child(dateArray[date]).child("Dewas").child("Bagli").child("value").val()
                        }
                    }
                    for (const blocks in snapShot.child(dateArray[date]).child("Guna").val()) {
                        tempGuna += snapShot.child(dateArray[date]).child("Guna").child(blocks).child("value").val()
                        if (dateArray[date] === dateDay) {
                            todaysGunaTemp[0].value = snapShot.child(dateArray[date]).child("Guna").child("Guna").child("value").val()
                            todaysGunaTemp[1].value = snapShot.child(dateArray[date]).child("Guna").child("Raghogarh").child("value").val()
                            todaysGunaTemp[2].value = snapShot.child(dateArray[date]).child("Guna").child("Aron").child("value").val()
                            todaysGunaTemp[3].value = snapShot.child(dateArray[date]).child("Guna").child("Chachoda").child("value").val()
                            todaysGunaTemp[4].value = snapShot.child(dateArray[date]).child("Guna").child("Bamori").child("value").val()
                        }
                    }
                    for (const blocks in snapShot.child(dateArray[date]).child("Rajgarh").val()) {
                        tempRajgarh += snapShot.child(dateArray[date]).child("Rajgarh").child(blocks).child("value").val()
                        if (dateArray[date] === dateDay) {
                            todaysRajgarhTemp[0].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Biaora").child("value").val()
                            todaysRajgarhTemp[1].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Jirapur").child("value").val()
                            todaysRajgarhTemp[2].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Khilchipur").child("value").val()
                            todaysRajgarhTemp[3].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Marsinghgarh").child("value").val()
                            todaysRajgarhTemp[4].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Pachore").child("value").val()
                            todaysRajgarhTemp[5].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Rajgarh").child("value").val()
                            todaysRajgarhTemp[6].value = snapShot.child(dateArray[date]).child("Rajgarh").child("Sarangpur").child("value").val()
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
                    <p className="section-heading">Total Vaccinations - {totalVaccinations}</p>

                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <PieChart width={300} height={250}>
                                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#6c5beb" />
                                <Tooltip />
                            </PieChart>
                            <p className="section-heading">Gender Distribution</p>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <PieChart width={300} height={250}>
                                <Pie data={vaccineData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#6c5beb" />
                                <Tooltip />
                            </PieChart>
                            <p className="section-heading">Vaccine Distribution</p>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <PieChart width={300} height={250}>
                                <Pie data={doseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#6c5beb" />
                                <Tooltip />
                            </PieChart>
                            <p className="section-heading">Dose Type Distribution</p>
                        </div>
                    </div>
                </div>

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