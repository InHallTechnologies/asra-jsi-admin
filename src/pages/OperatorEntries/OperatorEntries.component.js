import React, { Suspense, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { firebasedatabase, GunaDatabase, RajGarhDatabase } from "../../backend/firebase-handler";
import "./OperatorEntries.style.css"
import { child, get, ref, runTransaction, set } from "firebase/database";
import moment from "moment";
import { async } from "@firebase/util";
import UserDetails from "../../components/UserDetails/UserDetails.component";
import { useLocation } from "react-router-dom";
import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const OperatorEntries = () =>{

    const location = useLocation()
    const [operator, setOperator] = useState(location.state.operatorDetails)
    const [entriesList, setEntriesList] = useState([])
    const [idenList, setIdenList] = useState([])
    const [vaccList, setVaccList] = useState([])
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
    const dateArray2 = [
        moment(currentDateObj).format('YYYY-MM-DD'),
        moment(currentDateObj).add('1', 'days').format('YYYY-MM-DD'),
        moment(currentDateObj).add('2', 'days').format('YYYY-MM-DD'),
        moment(currentDateObj).add('3', 'days').format('YYYY-MM-DD'),
        moment(currentDateObj).add('4', 'days').format('YYYY-MM-DD'),
        moment(currentDateObj).add('5', 'days').format('YYYY-MM-DD'),
        moment(currentDateObj).add('6', 'days').format('YYYY-MM-DD')
    ];
   
    const [weeklyDate, setWeeklyData] = useState([{name:dateArray[0], Achieved:0, Target:27}, {name:dateArray[1], Achieved:0, Target:27}, {name:dateArray[2], Achieved:0, Target:27}, {name:dateArray[3], Achieved:0, Target:27}, {name:dateArray[4], Achieved:0, Target:27}, {name:dateArray[5], Achieved:0, Target:27}, {name:dateArray[6], Achieved:0, Target:27}])
    const [weeklyIdenDate, setWeeklyIdenData] = useState([{name:dateArray[0], Achieved:0}, {name:dateArray[1], Achieved:0}, {name:dateArray[2], Achieved:0}, {name:dateArray[3], Achieved:0}, {name:dateArray[4], Achieved:0}, {name:dateArray[5], Achieved:0}, {name:dateArray[6], Achieved:0}])
    const [genderData, setGenderData] = useState([{name:"Male", value:0}, {name:"Female", value:0}, {name:"Other", value:0}])
    const [vaccineData, setVaccineData] = useState([{name:"", value:0}, {name:"", value:0}, {name:"", value:0}, {name:"", value:0}, {name:"", value:0}, {name:"", value:0}])
    const [doseData, setDoseData] = useState([{name:"", value:0}, {name:"", value:0}, {name:"", value:0}])
    let [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [loading, setLoading] = useState("Wait");
    const [todaysVaccinations, setTodaysVaccinations] = useState(0)
    const [totalIdentifications, setTotalIdentifications] = useState(0)
    const [weeksTotal, setWeeksTotal] = useState(0)
    const [selectedTab, setSelectedTab] = useState("VACC")

    useEffect(() => {
        let temp = []
        let tempIdenList = []
        let tempWeeksTotal = 0;
        let tempWeeklyData = [{name:dateArray[0], Achieved:0, Target:27}, {name:dateArray[1], Achieved:0, Target:27}, {name:dateArray[2], Achieved:0, Target:27}, {name:dateArray[3], Achieved:0, Target:27}, {name:dateArray[4], Achieved:0, Target:27}, {name:dateArray[5], Achieved:0, Target:27}, {name:dateArray[6], Achieved:0, Target:27}]
        let tempWeeklyIdenData = [{name:dateArray[0], Achieved:0}, {name:dateArray[1], Achieved:0}, {name:dateArray[2], Achieved:0}, {name:dateArray[3], Achieved:0}, {name:dateArray[4], Achieved:0}, {name:dateArray[5], Achieved:0}, {name:dateArray[6], Achieved:0}]
        const tempGenderData = [{name:"Male", value:0}, {name:"Female", value:0}, {name:"Other", value:0}]
        const tempVaccineData = [{name:"Covaxin", value:0}, {name:"Covishield", value:0}, {name:"Sputnik", value:0}, {name:"Zycov-D", value:0}, {name:"Covovax", value:0}, {name:"Corbevax", value:0}]
        const tempDoseData = [{name:"1st Dose", value:0}, {name:"2nd Dose", value:0}, {name:"Precautionary Dose", value:0}]
        let tempIden = 0;

        get(child(ref(firebasedatabase), `USER_WISE_ENTRIES/${operator.uid}`)).then(async(snapShot) => {
           
            if (snapShot.exists()) {
                tempIden = snapShot.size
                for (const key in snapShot.val()) {
                    const entry = snapShot.child(key).val()
                    if (entry.firstUpdateDate && entry.firstUpdateStatus && entry.firstUpdateVaccine) {
                        const dateFormatted = moment(entry.firstUpdateDate).format('MMMM Do YYYY - dddd')                    
                        if (dateArray.includes(dateFormatted) ) {
                            temp.push(entry)
                            tempWeeksTotal++;
                            tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved += 1
                            tempWeeklyData[dateArray.indexOf(dateFormatted)].Target = 27-tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved>0?27-tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved:0

                            if (entry.gender === "Male") {
                                tempGenderData[0].value += 1
                            } else if (entry.gender === "Female") {
                                tempGenderData[1].value += 1
                            } else {
                                tempGenderData[2].value += 1
                            }

                            if (entry.firstUpdateStatus === "1st Dose") {
                                tempDoseData[0].value += 1
                            } else if (entry.firstUpdateStatus === "2nd Dose") {
                                tempDoseData[1].value += 1
                            } else {
                                tempDoseData[2].value += 1
                            }

                            switch(entry.firstUpdateVaccine) {
                                case "Covaxin": {
                                    tempVaccineData[0].value += 1;   break;
                                }
                                case "Covishield": {
                                    tempVaccineData[1].value += 1;   break;
                                }
                                case "Sputnik": {
                                    tempVaccineData[2].value += 1;   break;
                                }
                                case "Zycov-D": {
                                    tempVaccineData[3].value += 1;   break;
                                }
                                case "Covovax": {
                                    tempVaccineData[4].value += 1;   break;
                                }
                                case "Corbevax": {
                                    tempVaccineData[5].value += 1;   break;
                                }
                                default: {}
                            }
                        }
                    }

                    if (entry.secondUpdateDate && entry.secondUpdateStatus && entry.secondUpdateVaccine) {
                        const dateFormatted = moment(entry.secondUpdateDate).format('MMMM Do YYYY - dddd')                    
                        if (dateArray.includes(dateFormatted) ) {
                            tempWeeksTotal++;
                            tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved += 1
                            tempWeeklyData[dateArray.indexOf(dateFormatted)].Target = 27-tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved>0?27-tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved:0
                            
                            if (entry.gender === "Male") {
                                tempGenderData[0].value += 1
                            } else if (entry.gender === "Female") {
                                tempGenderData[1].value += 1
                            } else {
                                tempGenderData[2].value += 1
                            }

                            if (entry.secondUpdateStatus === "1st Dose") {
                                tempDoseData[0].value += 1
                            } else if (entry.secondUpdateStatus === "2nd Dose") {
                                tempDoseData[1].value += 1
                            } else {
                                tempDoseData[2].value += 1
                            }

                            switch(entry.secondUpdateVaccine) {
                                case "Covaxin": {
                                    tempVaccineData[0].value += 1;   break;
                                }
                                case "Covishield": {
                                    tempVaccineData[1].value += 1;   break;
                                }
                                case "Sputnik": {
                                    tempVaccineData[2].value += 1;   break;
                                }
                                case "Zycov-D": {
                                    tempVaccineData[3].value += 1;   break;
                                }
                                case "Covovax": {
                                    tempVaccineData[4].value += 1;   break;
                                }
                                case "Corbevax": {
                                    tempVaccineData[5].value += 1;   break;
                                }
                                default: {}
                            }
                        }
                    }

                    if (entry.thirdUpdateDate && entry.thirdUpdateStatus && entry.thirdUpdateVaccine) {
                        const dateFormatted = moment(entry.thirdUpdateDate).format('MMMM Do YYYY - dddd')                    
                        if (dateArray.includes(dateFormatted) ) {
                            tempWeeksTotal++;
                            tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved += 1
                            tempWeeklyData[dateArray.indexOf(dateFormatted)].Target = 27-tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved>0?27-tempWeeklyData[dateArray.indexOf(dateFormatted)].Achieved:0

                            if (entry.gender === "Male") {
                                tempGenderData[0].value += 1
                            } else if (entry.gender === "Female") {
                                tempGenderData[1].value += 1
                            } else {
                                tempGenderData[2].value += 1
                            }

                            if (entry.thirdUpdateStatus === "1st Dose") {
                                tempDoseData[0].value += 1
                            } else if (entry.thirdUpdateStatus   === "2nd Dose") {
                                tempDoseData[1].value += 1
                            } else {
                                tempDoseData[2].value += 1
                            }

                            switch(entry.thirdUpdateVaccine) {
                                case "Covaxin": {
                                    tempVaccineData[0].value += 1;   break;
                                }
                                case "Covishield": {
                                    tempVaccineData[1].value += 1;   break;
                                }
                                case "Sputnik": {
                                    tempVaccineData[2].value += 1;   break;
                                }
                                case "Zycov-D": {
                                    tempVaccineData[3].value += 1;   break;
                                }
                                case "Covovax": {
                                    tempVaccineData[4].value += 1;   break;
                                }
                                case "Corbevax": {
                                    tempVaccineData[5].value += 1;   break;
                                }
                                default: {}
                            }
                        }
                    }
                    const dateFormattedIden = moment(entry.date, "MMMM Do YYYY").format("MMMM Do YYYY - dddd")
                    if (dateArray.includes(dateFormattedIden) ) {
                        tempIdenList.push(entry)
                        tempWeeklyIdenData[dateArray.indexOf(dateFormattedIden)].Achieved += 1
                    }
                    
                }
                
                setEntriesList(temp.reverse())
                setWeeklyData(tempWeeklyData)
                setGenderData(tempGenderData)
                setVaccineData(tempVaccineData)
                setDoseData(tempDoseData)
                setTodaysVaccinations(tempWeeklyData[dateArray.indexOf(dateDay)].Achieved)
                setWeeksTotal(tempWeeksTotal)
                setTotalIdentifications(tempIden)
                setStartDate(dateArray2[0])
                setEndDate(dateArray2[6])
                setWeeklyIdenData(tempWeeklyIdenData)
                setIdenList(tempIdenList.reverse())
                setVaccList(temp)
                setLoading("Fetched")
            } else {
                setLoading("No Data")
            }
        })
    }, [])

    const handleSearch = async () => {
        let dateList = [startDate]
        let graphDataTemp = [{name:startDate, Achieved:0, Target:27}]
        let genderDataTemp = [{name:"Male", value:0}, {name:"Female", value:0}, {name:"Other", value:0}]
        let vaccineDataTemp = [{name:"Corbevax", value:0}, {name:"Covaxin", value:0}, {name:"Covishield", value:0}, {name:"Covovax", value:0}, {name:"Sputnik", value:0}, {name:"Zycov-D", value:0}]
        let doseDataTemp = [{name:"1st Dose", value:0}, {name:"2nd Dose", value:0}, {name:"Precautionary Dose", value:0}]
        let totalVaccinationsTemp = 0
        let tempList = []
        let tempIdenList = []
        setSelectedTab("VACC")
        let tempWeeklyIdenData = [{name:startDate, Achieved:0}]
        setLoading("Wait")
        setEntriesList([])

        if (startDate === "") {
            alert("Please select the start vaccination date for the range of report") 
            return
        }
        if (endDate === "") {
            alert("Please select the end vaccination date for the range of report") 
            return
        }
        if (moment(startDate).isAfter(endDate)) {
            alert("Start date must be same as or before End Date")
            return
        }

        var currDate = moment(startDate).startOf('day');
        var lastDate = moment(endDate).startOf('day');
        while(currDate.diff(lastDate) < 0) {
            let tempDate = moment(currDate.add(1, 'days').clone().toDate()).format("YYYY-MM-DD")
            dateList.push(tempDate);
            graphDataTemp.push({name:tempDate, Achieved:0, Target:27})
            tempWeeklyIdenData.push({name:tempDate, Achieved:0})
        }
        
        await get (child(ref(firebasedatabase), `USER_WISE_ENTRIES/${operator.uid}`)).then(async(snapshot)=>{
            if (snapshot.exists()) {
                for (const key in snapshot.val()) {
                    let entry = await snapshot.child(key).val()
                    if (entry.firstUpdateDate && entry.firstUpdateVaccine && entry.firstUpdateStatus && dateList.includes(entry.firstUpdateDate)) {
                        tempList.push(entry)
                        graphDataTemp[dateList.indexOf(entry.firstUpdateDate)].Achieved += 1
                        graphDataTemp[dateList.indexOf(entry.firstUpdateDate)].Target = 27-graphDataTemp[dateList.indexOf(entry.firstUpdateDate)].Achieved>=0?27-graphDataTemp[dateList.indexOf(entry.firstUpdateDate)].Achieved:0
                        if (entry.gender === "Male") {
                            genderDataTemp[0].value += 1
                        } else if (entry.gender === "Female") {
                            genderDataTemp[1].value += 1
                        } else {
                            genderDataTemp[2].value += 1
                        }
                        if (entry.firstUpdateVaccine === "Corbevax") {
                            vaccineDataTemp[0].value += 1
                        } else if (entry.firstUpdateVaccine === "Covaxin") {
                            vaccineDataTemp[1].value += 1
                        } else if (entry.firstUpdateVaccine === "Covishield") {
                            vaccineDataTemp[2].value += 1
                        } else if (entry.firstUpdateVaccine === "Covovax") {
                            vaccineDataTemp[3].value += 1
                        } else if (entry.firstUpdateVaccine === "Sputnik") {
                            vaccineDataTemp[4].value += 1
                        } else {
                            vaccineDataTemp[5].value += 1
                        } 
                        if (entry.firstUpdateStatus === "1st Dose") {
                            doseDataTemp[0].value += 1
                        } else if (entry.firstUpdateStatus === "2nd Dose") {
                            doseDataTemp[1].value += 1
                        } else {
                            doseDataTemp[2].value += 1
                        }
                    }
                    if (entry.secondUpdateDate && entry.secondUpdateStatus && entry.secondUpdateVaccine && dateList.includes(entry.secondUpdateDate)) {
                        graphDataTemp[dateList.indexOf(entry.secondUpdateDate)].Achieved += 1
                        graphDataTemp[dateList.indexOf(entry.secondUpdateDate)].Target = 27-graphDataTemp[dateList.indexOf(entry.secondUpdateDate)].Achieved>=0?27-graphDataTemp[dateList.indexOf(entry.secondUpdateDate)].Achieved:0
                        if (entry.gender === "Male") {
                            genderDataTemp[0].value += 1
                        } else if (entry.gender === "Female") {
                            genderDataTemp[1].value += 1
                        } else {
                            genderDataTemp[2].value += 1
                        }
                        if (entry.firstUpdateVaccine === "Corbevax") {
                            vaccineDataTemp[0].value += 1
                        } else if (entry.firstUpdateVaccine === "Covaxin") {
                            vaccineDataTemp[1].value += 1
                        } else if (entry.firstUpdateVaccine === "Covishield") {
                            vaccineDataTemp[2].value += 1
                        } else if (entry.firstUpdateVaccine === "Covovax") {
                            vaccineDataTemp[3].value += 1
                        } else if (entry.firstUpdateVaccine === "Sputnik") {
                            vaccineDataTemp[4].value += 1
                        } else {
                            vaccineDataTemp[5].value += 1
                        } 
                        if (entry.firstUpdateStatus === "1st Dose") {
                            doseDataTemp[0].value += 1
                        } else if (entry.firstUpdateStatus === "2nd Dose") {
                            doseDataTemp[1].value += 1
                        } else {
                            doseDataTemp[2].value += 1
                        }
                    }

                    if (entry.thirdUpdateDate && entry.thirdUpdateStatus && entry.thirdUpdateVaccine && dateList.includes(entry.secondUpdateDate)) {
                        graphDataTemp[dateList.indexOf(entry.thirdUpdateDate)].Achieved += 1
                        graphDataTemp[dateList.indexOf(entry.thirdUpdateDate)].Target = 27-graphDataTemp[dateList.indexOf(entry.thirdUpdateDate)].Achieved>=0?27-graphDataTemp[dateList.indexOf(entry.thirdUpdateDate)].Achieved:0
                        if (entry.gender === "Male") {
                            genderDataTemp[0].value += 1
                        } else if (entry.gender === "Female") {
                            genderDataTemp[1].value += 1
                        } else {
                            genderDataTemp[2].value += 1
                        }
                        if (entry.firstUpdateVaccine === "Corbevax") {
                            vaccineDataTemp[0].value += 1
                        } else if (entry.firstUpdateVaccine === "Covaxin") {
                            vaccineDataTemp[1].value += 1
                        } else if (entry.firstUpdateVaccine === "Covishield") {
                            vaccineDataTemp[2].value += 1
                        } else if (entry.firstUpdateVaccine === "Covovax") {
                            vaccineDataTemp[3].value += 1
                        } else if (entry.firstUpdateVaccine === "Sputnik") {
                            vaccineDataTemp[4].value += 1
                        } else {
                            vaccineDataTemp[5].value += 1
                        } 
                        if (entry.firstUpdateStatus === "1st Dose") {
                            doseDataTemp[0].value += 1
                        } else if (entry.firstUpdateStatus === "2nd Dose") {
                            doseDataTemp[1].value += 1
                        } else {
                            doseDataTemp[2].value += 1
                        }
                    }
                    const dateFormattedIden = moment(entry.date, "MMMM Do YYYY").format("YYYY-MM-DD")
                    if (dateList.includes(dateFormattedIden) ) {
                        tempIdenList.push(entry)
                        tempWeeklyIdenData[dateList.indexOf(dateFormattedIden)].Achieved += 1
                    }
                    
                }
                setEntriesList(tempList.reverse())
                setWeeklyData(graphDataTemp)
                setGenderData(genderDataTemp)
                setVaccineData(vaccineDataTemp)
                setDoseData(doseDataTemp)
                setWeeklyIdenData(tempWeeklyIdenData)
                setIdenList(tempIdenList.reverse())
                setVaccList(tempList)
                setLoading("Fetched")
            }
        })
    }

    return(
        <div className="operator-entries-container">
            <UserDetails />

            {
                loading === "Wait"
                ?
                <p style={{fontWeight:600, color:"#ccc", marginTop:50}}>Loading...</p>
                :
                loading === "No Data"
                ?
                <p style={{fontWeight:600, color:"#ccc", marginTop:50}}>No entries yet!!</p>
                :
                <div>
                    <p style={{fontWeight:500, fontSize:17, marginTop:30, marginBottom:0}}>Select date range for report</p>

                    <div className="block-village-container">
                        <div style={{width:200, marginRight: 20}}>
                            <Text mb='2px'>Start Date</Text>
                            <input type="date" value={startDate} onChange={(event)=>{setStartDate(event.target.value)}}></input>
                        </div>
                        <div style={{width:200, marginRight: 20}}>
                            <Text mb='2px'>End Date</Text>
                            <input type="date" value={endDate} onChange={(event)=>{setEndDate(event.target.value)}}></input>
                        </div>

                        <Button style={{marginBottom:0}} onClick={handleSearch}>Search</Button> 
                    </div>

                    <div  className='dashboard-graph-container'>
                        <p className="section-heading">Vaccination Performance Matrix</p>

                        <div style={{display:"flex", flexDirection:"row"}}>
                            <BarChart width={1000} height={300} data={weeklyDate} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Achieved" stackId="a" fill="#51d93f" />
                                <Bar dataKey="Target" stackId="a" fill="#f2e52e" />
                            </BarChart>

                            <div>
                                <div style={{marginBottom:15,backgroundColor:"white", width:"100%", paddingLeft:20, paddingRight:70, paddingTop:10, paddingBottom:10, borderRadius:10}}>
                                    <p style={{fontWeight:600}}>{todaysVaccinations}</p>
                                    <p>Today's Vaccinations</p>
                                </div>
                                <div style={{marginBottom:15,backgroundColor:"white", width:"100%", paddingLeft:20, paddingRight:70, paddingTop:10, paddingBottom:10, borderRadius:10}}>
                                    <p style={{fontWeight:600}}>{weeksTotal}</p>
                                    <p>This Week's Vaccinations</p>
                                </div>
                                <div style={{marginBottom:15,backgroundColor:"white", width:"100%", paddingLeft:20, paddingRight:70, paddingTop:10, paddingBottom:10, borderRadius:10}}>
                                    <p style={{fontWeight:600}}>{totalIdentifications}</p>
                                    <p>Total Identifications</p>
                                </div>
                            </div>
                        </div>

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

                    <div  className='identification-graph-container'>
                        <p className="section-heading">Identification Performance Matrix</p>

                        <BarChart width={1000} height={300} data={weeklyIdenDate} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Achieved" stackId="a" fill="#51d93f" />
                        </BarChart>
                    </div>

                    <div className="tab-container">
                        <p className={selectedTab==="VACC"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("VACC");setEntriesList(vaccList)}}>Vaccination Data</p>
                        <p className={selectedTab==="IDEN"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("IDEN");setEntriesList(idenList)}}>Identification Data</p>
                    </div>
                        
                    <p style={{fontWeight:500, fontSize:18, marginBottom:10, marginTop:50}}>Total Entries: {entriesList.length}</p>

                    <TableContainer className="table-container">
                        <Table variant='simple'>
                            <Thead><Tr>
                                <Th>Entry Date</Th>
                                <Th>Iden. Date</Th>
                                <Th>Name</Th>
                                <Th>Phone Number</Th>
                                <Th>Village</Th>
                                <Th>Initial Status</Th>
                                <Th>First Update Date</Th>
                                <Th>First Update Type</Th>
                                <Th>Second Update Date</Th>
                                <Th>Second Update Type</Th>
                                <Th>Third Update Date</Th>
                                <Th>Third Update Type</Th>
                            </Tr></Thead>
                            
                            {
                                entriesList.map((item, index)=>{
                                    return(
                                        <Tbody style={{cursor:"pointer"}} >
                                            <Tr key={item.key}>
                                                <Td>{item.date}</Td>
                                                <Td>{item.dateDay}</Td>
                                                <Td>{item.name}</Td>
                                                <Td>{item.phoneNumber}</Td>
                                                <Td>{item.village}</Td>
                                                <Td>{item.initialStatus}</Td>
                                                <Td>{item.firstUpdateDate?moment(item.firstUpdateDate).format('MMMM Do YYYY'):""}</Td>
                                                <Td>{item.firstUpdateStatus}</Td>
                                                <Td>{item.secondUpdateDate?moment(item.secondUpdateDate).format('MMMM Do YYYY'):""}</Td>
                                                <Td>{item.secondUpdateStatus}</Td>
                                                <Td>{item.thirdUpdateDate?moment(item.thirdUpdateDate).format('MMMM Do YYYY'):""}</Td>
                                                <Td>{item.thirdUpdateStatus}</Td>
                                            </Tr>
                                    </Tbody>
                                )})
                            }
                            
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    )
}

export default OperatorEntries
















        // console.log("in here")
        // let count  = 0;
        // const tasks = []
        // get(child(ref(firebasedatabase), "USER_WISE_ENTRIES")).then(async(snapShot) => {
           
        //     if (snapShot.exists()) {
        //         for (const uid in snapShot.val()) {
        //             for (const key in snapShot.child(uid).val()) {
        //                 const entry = snapShot.child(uid).child(key).val()
        //                 console.log(entry.key)
        //                 if (entry.firstUpdateDate && entry.firstUpdateVaccine && entry.firstUpdateStatus) {
        //                     let formattedDate = moment(entry.firstUpdateDate).format('MMMM Do YYYY - dddd')
        //                     const writeRef = ref(firebasedatabase, `DATE_WISE_VACCINATION_DATA/${formattedDate}/${entry.district}/${entry.block}`);
        //                     const promise = new Promise(async (resolve, reject) => {
        //                         await runTransaction(writeRef, (currentData)=>{
        //                             if (currentData) {
        //                                 if (currentData.value) {
        //                                     currentData.value += 1
        //                                 } else {
        //                                     currentData.value = 1
        //                                 }
        //                                 if (currentData.gender[entry.gender]) {
        //                                     currentData.gender[entry.gender] += 1
        //                                 }else {
        //                                     currentData.gender[entry.gender] = 1
        //                                 }
        //                                 if (currentData.dose[entry.firstUpdateStatus]) {
        //                                     currentData.dose[entry.firstUpdateStatus] += 1
        //                                 }else {
        //                                     currentData.dose[entry.firstUpdateStatus] = 1
        //                                 }
        //                                 if (currentData.vaccine[entry.firstUpdateVaccine]) {
        //                                     currentData.vaccine[entry.firstUpdateVaccine] += 1
        //                                 }else {
        //                                     currentData.vaccine[entry.firstUpdateVaccine] = 1
        //                                 }
                                        
        //                                 resolve(currentData)
        //                                 return currentData;
        //                             } else {
        //                                 let temp = {value:0, gender:{"Male":0, "Female":0, "Others":0}, vaccine:{"Covaxin":0, "Covishield":0, "Sputnik":0, "Zycov-D":0, "Covovax":0, "Corbevax":0}, dose:{"1st Dose":0, "2nd Dose":0, "Precautionary Dose":0}}
        //                                 temp.value = 1
        //                                 temp.gender[entry.gender] = 1
        //                                 temp.dose[entry.firstUpdateStatus] = 1
        //                                 temp.vaccine[entry.firstUpdateVaccine] = 1
        //                                 resolve(temp)
        //                                 return temp;
        //                             }
                                    
        //                         })
        //                     })
        //                     tasks.push(promise);
                                
        //                 }

        //                 if (entry.secondUpdateDate && entry.secondUpdateStatus && entry.secondUpdateVaccine) {
        //                     let formattedDate = moment(entry.secondUpdateDate).format('MMMM Do YYYY - dddd')
        //                     const writeRef = ref(firebasedatabase, `DATE_WISE_VACCINATION_DATA/${formattedDate}/${entry.district}/${entry.block}`);
        //                     const promise = new Promise(async (resolve, reject) => {
        //                         await runTransaction(writeRef, (currentData)=>{
        //                             if (currentData) {
        //                                 if (currentData.value) {
        //                                     currentData.value += 1
        //                                 } else {
        //                                     currentData.value = 1
        //                                 }
        //                                 if (currentData.gender[entry.gender]) {
        //                                     currentData.gender[entry.gender] += 1
        //                                 }else {
        //                                     currentData.gender[entry.gender] = 1
        //                                 }
        //                                 if (currentData.dose[entry.firstUpdateStatus]) {
        //                                     currentData.dose[entry.firstUpdateStatus] += 1
        //                                 }else {
        //                                     currentData.dose[entry.firstUpdateStatus] = 1
        //                                 }
        //                                 if (currentData.vaccine[entry.firstUpdateVaccine]) {
        //                                     currentData.vaccine[entry.firstUpdateVaccine] += 1
        //                                 }else {
        //                                     currentData.vaccine[entry.firstUpdateVaccine] = 1
        //                                 }
                                        
        //                                 resolve(currentData)
        //                                 return currentData;
        //                             } else {
        //                                 let temp = {value:0, gender:{"Male":0, "Female":0, "Others":0}, vaccine:{"Covaxin":0, "Covishield":0, "Sputnik":0, "Zycov-D":0, "Covovax":0, "Corbevax":0}, dose:{"1st Dose":0, "2nd Dose":0, "Precautionary Dose":0}}
        //                                 temp.value = 1
        //                                 temp.gender[entry.gender] = 1
        //                                 temp.dose[entry.firstUpdateStatus] = 1
        //                                 temp.vaccine[entry.firstUpdateVaccine] = 1
        //                                 resolve(temp)
        //                                 return temp;
        //                             }
                                    
        //                         })
        //                     })
        //                     tasks.push(promise);
                                
        //                 }

        //                 if (entry.thirdUpdateDate && entry.thirdUpdateStatus && entry.thirdUpdateVaccine) {
        //                     let formattedDate = moment(entry.thirdUpdateDate).format('MMMM Do YYYY - dddd')
        //                     const writeRef = ref(firebasedatabase, `DATE_WISE_VACCINATION_DATA/${formattedDate}/${entry.district}/${entry.block}`);
        //                     const promise = new Promise(async (resolve, reject) => {
        //                         await runTransaction(writeRef, (currentData)=>{
        //                             if (currentData) {
        //                                 if (currentData.value) {
        //                                     currentData.value += 1
        //                                 } else {
        //                                     currentData.value = 1
        //                                 }
        //                                 if (currentData.gender[entry.gender]) {
        //                                     currentData.gender[entry.gender] += 1
        //                                 }else {
        //                                     currentData.gender[entry.gender] = 1
        //                                 }
        //                                 if (currentData.dose[entry.firstUpdateStatus]) {
        //                                     currentData.dose[entry.firstUpdateStatus] += 1
        //                                 }else {
        //                                     currentData.dose[entry.firstUpdateStatus] = 1
        //                                 }
        //                                 if (currentData.vaccine[entry.firstUpdateVaccine]) {
        //                                     currentData.vaccine[entry.firstUpdateVaccine] += 1
        //                                 }else {
        //                                     currentData.vaccine[entry.firstUpdateVaccine] = 1
        //                                 }
                                        
        //                                 resolve(currentData)
        //                                 return currentData;
        //                             } else {
        //                                 let temp = {value:0, gender:{"Male":0, "Female":0, "Others":0}, vaccine:{"Covaxin":0, "Covishield":0, "Sputnik":0, "Zycov-D":0, "Covovax":0, "Corbevax":0}, dose:{"1st Dose":0, "2nd Dose":0, "Precautionary Dose":0}}
        //                                 temp.value = 1
        //                                 temp.gender[entry.gender] = 1
        //                                 temp.dose[entry.firstUpdateStatus] = 1
        //                                 temp.vaccine[entry.firstUpdateVaccine] = 1
        //                                 resolve(temp)
        //                                 return temp;
        //                             }
                                    
        //                         })
        //                     })
        //                     tasks.push(promise);
                                
        //                 }
        //             }
        //         }
        //     } 
        // })