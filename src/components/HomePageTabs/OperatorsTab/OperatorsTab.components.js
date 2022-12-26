import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useConst } from "@chakra-ui/react";
import { child, get, onValue, ref } from "firebase/database";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { firebasedatabase } from "../../../backend/firebase-handler";
import context from "../../../context/app-context";
import AddOperator from "../../AddOperator/AddOperator.component";
import OperatorList from "../../OperatorList/OperatorList.component";
import UserDetails from "../../UserDetails/UserDetails.component";
import './OperatorsTab.style.css'

const OperatorsTab = () => {

    const [operatorsDewas, setOperatorsDewas] = useState([]);
    const [operatorsRajgarh, setOperatorsRajgarh] = useState([]);
    const [operatorsGuna, setOperatorsGuna] = useState([]);
    const [operatorList, setOperatorList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTab, setSelectedTab] = useState("")
    const [activeComponent, setActiveComponent] = useState("LIST")
    const [userData, setUserDetails] = useContext(context)

    useEffect(() => {
        let tempDewas = []
        let tempRajgarh = []
        let tempGuna = []
        const operatorRef = ref(firebasedatabase, "OPERATORS")
       
        onValue(operatorRef, (snapshot)=>{
            for (const key in snapshot.val()) {
                if (snapshot.child(key).child("district").val() === "Dewas") {
                    tempDewas.push(snapshot.child(key).val())
                } else if (snapshot.child(key).child("district").val() === "Rajgarh") {
                    tempRajgarh.push(snapshot.child(key).val())
                } else {
                    tempGuna.push(snapshot.child(key).val())
                }
            }      
            setOperatorsDewas(tempDewas)
            setOperatorsRajgarh(tempRajgarh)
            setOperatorsGuna(tempGuna)
            // setOperatorList(tempDewas)
            setLoading(false)      
        }, {onlyOnce:true})
        
    }, [])
    return (
        <div className="operators-tab-container">
                <UserDetails/>

                {
                    activeComponent === "LIST"
                    &&
                    <div className="tab-button-container">
                        <div className="tab-container">
                            <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Dewas"?null:"none"}} className={selectedTab==="Dewas"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Dewas");setOperatorList(operatorsDewas)}}>DEWAS</p>
                            <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Rajgarh"?null:"none"}} className={selectedTab==="Rajgarh"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Rajgarh");setOperatorList(operatorsRajgarh)}}>RAJGARH</p>
                            <p style={{display:userData.accessType==="ADMIN"||userData.accessType==="Guna"?null:"none"}} className={selectedTab==="Guna"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Guna");setOperatorList(operatorsGuna)}}>GUNA</p>
                        </div>
                        {
                            userData.accessType==="ADMIN"
                            &&
                            <Button className="add-button" backgroundColor={"#53a86b"} color={"#fff"} onClick={()=>{setActiveComponent("FORM")}}>Add Operator</Button>
                        }
                    </div>
                }
                {
                    loading
                    ?
                    <p>wait</p>
                    :
                    activeComponent === "LIST"
                    ?
                    <OperatorList operatorList={operatorList} />
                    :
                    <AddOperator setActiveComponent={setActiveComponent} />
                }

                
            </div>
    )
}

export default OperatorsTab