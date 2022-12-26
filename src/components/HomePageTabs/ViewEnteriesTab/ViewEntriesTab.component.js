import { Button, Input, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { child, get, ref } from "firebase/database";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line,Pie, PieChart, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { firebasedatabase } from "../../../backend/firebase-handler";
import context from "../../../context/app-context";
import { getBlockList } from "../../../entities/entry-sample";
import UserDetails from "../../UserDetails/UserDetails.component";
import DashboardGraph from "../DashboardGraph/DashboardGraph.component";
import "./ViewEntriesTab.style.css"

const ViewEntriesTab = () => {
    
    const [selectedTab, setSelectedTab] = useState("")
    const [block, setBlock] = useState("")
    const [entryList, setEntryList] = useState([])
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState("Initial");
    const [operatorUidCodeMap, setOperatorUiCodeMap] = useState({});
    const [userData, setUserData] = useContext(context)
    let [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [graphData, setGraphData] = useState([{name:"", value:""}])
    const [genderData, setGenderDataToday] = useState([{name:"Male", value:0}, {name:"Female", value:0}, {name:"Other", value:0}])
    const [vaccineData, setVaccineDataToday] = useState([{name:"Corbevax", value:0}, {name:"Covaxin", value:0}, {name:"Covishield", value:0}, {name:"Covovax", value:0}, {name:"Sputnik", value:0}, {name:"Zycov-D", value:0}])
    const [doseData, setDoseDataToday] = useState([{name:"1st Dose", value:0}, {name:"2nd Dose", value:0}, {name:"Precautionary Dose", value:0}])
    const [totalVaccinations, setTotalVaccinations] = useState(0)

    useEffect(() => {
        // let tempList = []

        get (child(ref(firebasedatabase), "OPERATORS")).then((snapshot) => {
            if (snapshot.exists()) {
                const list = Object.values(snapshot.val())
                setUserList([...list]);
                const temp = {}
                list.forEach(item => {
                    temp[item.uid] = item.key;
                })
                setOperatorUiCodeMap(temp);
                
            }
        }, {onlyOnce:true})
        
    }, [])

    
    const handleSearch = async () => {
        let dateList = [startDate]
        let graphDataTemp = [{name:startDate, value:0}]
        let genderDataTemp = [{name:"Male", value:0}, {name:"Female", value:0}, {name:"Other", value:0}]
        let vaccineDataTemp = [{name:"Corbevax", value:0}, {name:"Covaxin", value:0}, {name:"Covishield", value:0}, {name:"Covovax", value:0}, {name:"Sputnik", value:0}, {name:"Zycov-D", value:0}]
        let doseDataTemp = [{name:"1st Dose", value:0}, {name:"2nd Dose", value:0}, {name:"Precautionary Dose", value:0}]
        let totalVaccinationsTemp = 0
        let tempList = []
        setLoading("Searching")
        setEntryList([])

        if (block === "Click to select" || block === "") {
            alert("Please select a block")
            return
        }
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
            graphDataTemp.push({name:tempDate, value:0})
        }
        let tmepUser = []
        if (block === "All Blocks") {
            for (const index in userList) {
                if (userList[index].district === selectedTab) {
                    tmepUser.push(userList[index].uid)
                }
            }
        } else {
            for (const index in userList) {
                if (userList[index].block === block) {
                    tmepUser.push(userList[index].uid)
                }
            }
        }
        
//A1EHqGhDiaVZuRkRFOTyP39ziWy2
//OZpYjT5g70aFbQ1vPJko3fzumKi2
        
                await get (child(ref(firebasedatabase), "USER_WISE_ENTRIES")).then(async(snapshot)=>{
                    if (snapshot.exists()) {
                        for (const uid in snapshot.val()) {
                            if (tmepUser.includes(uid)) {
                                for (const key in snapshot.child(uid).val()) {
                                    let entry = await snapshot.child(uid).child(key).val()
                                    if (entry.firstUpdateDate && entry.firstUpdateVaccine && entry.firstUpdateStatus && dateList.includes(entry.firstUpdateDate)) {
                                        tempList.push(entry)
                                        graphDataTemp[dateList.indexOf(entry.firstUpdateDate)].value += 1
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
                                    
                                }
                            }
                            
                        }
                        setEntryList(tempList)
                        setGraphData(graphDataTemp)
                        setGenderDataToday(genderDataTemp)
                        setVaccineDataToday(vaccineDataTemp)
                        setDoseDataToday(doseDataTemp)
                        setLoading("Done")
                        // setEntryList((currentItems)=>{
                        //     let list = [...tempList, ...currentItems];
                        //     list = list.sort((item1, item2)=>{
                        //         if (item1.key > item2.key) {
                        //             return -1;
                        //         }
                        //         if (item1.key < item2.key) {
                        //             return 1;
                        //         }
                        //         return 0;
                        //     })
                        //     return list;
                        // })
                    }
                })
            
    }

    return(
        <div className="view-entries-container">
            <UserDetails />

            <div className="tab-container">
                <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Dewas"?null:"none"}} className={selectedTab==="Dewas"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Dewas"); setBlock("Click to select")}}>DEWAS</p>
                <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Rajgarh"?null:"none"}} className={selectedTab==="Rajgarh"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Rajgarh"); setBlock("Click to select")}}>RAJGARH</p>
                <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Guna"?null:"none"}} className={selectedTab==="Guna"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Guna"); setBlock("Click to select")}}>GUNA</p>
            </div>

            <div className="block-village-container">
                <div style={{width:200, marginRight: 20}}>
                    <Text mb='2px'>Block</Text>
                    <Select placeholder='Click to select' size='sm' name='initialStatus' onChange={(event)=>{setBlock(event.target.value)}} value={block}>
                        {
                            getBlockList(selectedTab).map((item)=><option>{item}</option>)
                        }
                    </Select>
                </div>
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
            {
                loading !== "Done"
                ?
                <div style={{marginTop:50}}>
                    <p style={{fontWeight:600, color:"#ccc"}}>{loading==="Initial"?"Select District, Block and Dates":"Loading..."}</p>
                </div>
                :
                <div>
                <div>
                    <p style={{fontSize:20, marginRight:20, marginTop:70, fontWeight:"bold"}}>Total entries: {entryList.length}</p>
                </div>
            <div  className='dashboard-graph-container'>
                <p className="section-heading">Performance in given time duration</p>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    
                    <LineChart width={1000} height={300} data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line dataKey="value" type="monotone" stroke="#8884d8" />
                    </LineChart>
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

            <div className="entries-list">
            <TableContainer className="table-container">
                <Table variant='simple'>
                    <Thead><Tr>
                        <Th>Iden. Date</Th>
                        <Th>Name</Th>
                        <Th>Phone Number</Th>
                        <Th>Block</Th>
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
                            entryList.map((item, index)=>{
                                return(
                                    <Tbody style={{cursor:"pointer"}} >
                                        <Tr key={item.key}>
                                            <Td>{item.date}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.phoneNumber}</Td>
                                            <Td>{item.block}</Td>
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
                </div>
            }
            
        </div>
    )
}

export default ViewEntriesTab