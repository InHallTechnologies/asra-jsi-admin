import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { child, get, onValue, ref } from "firebase/database";
import React, { Suspense, useEffect, useState } from "react";
import { firebasedatabase } from "../../../backend/firebase-handler";
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
    const [selectedTab, setSelectedTab] = useState("Dewas")
    const [activeComponent, setActiveComponent] = useState("LIST")

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
            setOperatorList(tempDewas)
            setLoading(false)      
        }, {onlyOnce:true})
        
    }, [])
    return (
        <Suspense fallback={<div>LOADING</div>}>
            <div className="operators-tab-container">
                <UserDetails/>

                {
                    activeComponent === "LIST"
                    &&
                    <div className="tab-button-container">
                        <div className="tab-container">
                            <p className={selectedTab==="Dewas"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Dewas");setOperatorList(operatorsDewas)}}>DEWAS</p>
                            <p className={selectedTab==="Rajgarh"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Rajgarh");setOperatorList(operatorsRajgarh)}}>RAJGARH</p>
                            <p className={selectedTab==="Guna"?"selected-tab":"unselected-tab"} onClick={()=>{setSelectedTab("Guna");setOperatorList(operatorsGuna)}}>GUNA</p>
                        </div>
                        <Button className="add-button" backgroundColor={"#53a86b"} color={"#fff"} onClick={()=>{setActiveComponent("FORM")}}>Add Operator</Button>
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
        </Suspense>
    )
}

export default OperatorsTab