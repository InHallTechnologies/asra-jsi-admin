import React from "react";
import './OperatorList.style.css'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const OperatorList = ({operatorList}) => {
    // const [list, setList] = useState([]);

    // useEffect(()=>{
    //     setList([...operatorList])
    //     // console.log(operatorList)
    // },[operatorList])


    return(
        <div>
            <TableContainer className="table-container">
                <Table variant='simple'>
                    <Thead><Tr>
                        <Th>Operator Code</Th>
                        <Th>Name</Th>
                        <Th>Block</Th>
                        <Th>Designation</Th>
                        <Th>Mobile No.</Th>
                        <Th>Password</Th>
                    </Tr></Thead>
                    
                        {
                            operatorList.map((item, index)=>{
                                return(
                                    <Tbody style={{cursor:"pointer"}}>
                                        <Tr key={item.key}>
                                            <Td>{item.key}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.district}</Td>
                                            <Td>{item.designation}</Td>
                                            <Td>{item.mobileNo}</Td>
                                            <Td>{item.password}</Td>
                                        </Tr>
                                </Tbody>
                            )})
                        }
                    
                
                </Table>
            </TableContainer>
        </div>
    )
}

export default OperatorList