import { Button, Input, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { child, get, ref } from "firebase/database";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { firebasedatabase } from "../../../backend/firebase-handler";
import context from "../../../context/app-context";
import { getBlockList } from "../../../entities/entry-sample";
import UserDetails from "../../UserDetails/UserDetails.component";
import DashboardGraph from "../DashboardGraph/DashboardGraph.component";
import "./ViewEntriesTab.style.css"

const ViewEntriesTab = () => {
    
    const [selectedTab, setSelectedTab] = useState("")
    const [block, setBlock] = useState("")
    const [village, setVillage] = useState("")
    const [entryList, setEntryList] = useState([])
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(false);
    const [operatorUidCodeMap, setOperatorUiCodeMap] = useState({});
    const [userData, setUserData] = useContext(context)

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
                setLoading(false)
                
            }
        })
        
    }, [])

    
    const handleSearch = async (block) => {
        // setEntryList([]);
        for (const index in userList) {
            if (userList[index].block === block) {
                await get (child(ref(firebasedatabase), "USER_WISE_ENTRIES/"+userList[index].uid)).then((snapshot)=>{
                    if (snapshot.exists()) {
                        const tempList = Object.values(snapshot.val())
                        
                        
                        setEntryList((currentItems)=>{
                            let list = [...tempList, ...currentItems];
                            list = list.sort((item1, item2)=>{
                                if (item1.key > item2.key) {
                                    return -1;
                                }
                                if (item1.key < item2.key) {
                                    return 1;
                                }
                                return 0;
                            })
                            return list;
                        })
                    }
                })
            }
        }
    }

    return(
        <div className="view-entries-container">
            <UserDetails />

            <div className="tab-container">
                <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Dewas"?null:"none"}} className={selectedTab==="Dewas"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Dewas"); setBlock("Dewas")}}>DEWAS</p>
                <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Rajgarh"?null:"none"}} className={selectedTab==="Rajgarh"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Rajgarh"); setBlock("Biaora")}}>RAJGARH</p>
                <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Guna"?null:"none"}} className={selectedTab==="Guna"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Guna"); setBlock("Guna")}}>GUNA</p>
            </div>

            <div className="block-village-container">
                <div style={{width:200, marginRight: 20}}>
                    <Text mb='2px'>Block</Text>
                    <Select placeholder='Click to select' size='sm' name='initialStatus' onChange={(event)=>{setBlock(event.target.value); handleSearch(event.target.value)}} value={block}>
                        {
                            getBlockList(selectedTab).map((item)=><option>{item}</option>)
                        }
                    </Select>
                </div>
                <div>
                    <p style={{fontSize:20, marginRight:20, fontWeight:"bold"}}>Total entries: {entryList.length}</p>
                </div>
                {/* <div style={{width:200, marginRight: 20}}>
                    <Text mb='2px'>Village (Optional)</Text>
                    <Input placeholder='Sonkatch' size='sm' name="village" onChange={(event)=>{setVillage(event.target.value)}} value={village} />
                </div>

                <Button style={{marginBottom:0}} onClick={handleSearch}>Search</Button> */}
            </div>

            <div  className='dashboard-graph-container'>
                <p className="section-heading">This Week in {block}</p>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    
                    <BarChart width={1000} height={300} data={[{name:"ad", value:10}]} margin={{ top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" stackId="a" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>

            <div className="entries-list">
                <TableContainer className="table-container">
                    <Table variant='simple'>
                        <Thead><Tr>
                            <Th>Operator Code</Th>
                            <Th>Village</Th>
                            <Th>Name</Th>
                            <Th>Phone Number</Th>
                            <Th>Identification Status</Th>
                            <Th>Identification Date</Th>
                        </Tr></Thead>
                        
                        {
                            entryList.map((item, index)=>{
                                return(
                                    <Tbody style={{cursor:"pointer"}}>
                                        <Tr key={item.key}>
                                            <Td>{operatorUidCodeMap[item.operatorUID]}</Td>
                                            <Td>{item.village}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.phoneNumber}</Td>
                                            <Td>{item.initialStatus}</Td>
                                            <Td>{item.date}</Td>
                                        </Tr>
                                </Tbody>
                            )})
                        }
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ViewEntriesTab