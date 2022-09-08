import { Button, Divider, Input, Select, Text } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import React, { useContext, useState } from "react";
import { firebaseAuth, firebasedatabase } from "../../backend/firebase-handler";
import FormContext from "../../context/form-context";
import { getBlockList } from "../../entities/entry-sample";
import USER_SAMPLE from "../../entities/user-sample";
import './AddOperator.style.css'

const AddOperator = ({setActiveComponent}) => {
    const [formData, setFormData] = useState(USER_SAMPLE)
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async () => {
        setLoading(true)
        await createUserWithEmailAndPassword(firebaseAuth, formData.mobileNo+"@asrango.org", formData.password).then(async (user)=>{
            formData.uid = user.user.uid;
            await set(ref(firebasedatabase, "OPERATORS/"+formData.uid), formData);
            setLoading(false);
            alert("Operator added")
        })
    }
    return(
            <div className="add-entry-tab-main-container">
                <div className="entry-tab-label-container">
                    <h2 className="entry-tab-title">Add New Operator</h2>
                    <p className="entry-tab-subtitle">Fill out the fields and press submit</p>
                </div>
                    <Divider mt={'10px'} mb={"30px"} />
                    <div className="form-snippet-container">
                        <div className="entry-tab-form-label-container">
                            <h2 className="entry-tab-form-title">Personal Details</h2>
                            <p className="entry-tab-form-subtitle">Personal Details of the Operator</p>
                        </div>

                        <div className="entry-tab-form-container">
                            <div>
                                <Text mb='2px'>Name</Text>
                                <Input placeholder='Eg.: John Doe' size='sm' name='name' onChange={(event)=>{setFormData({...formData, name:event.target.value})}} value={formData.name}/>
                            </div>
                            <div>
                                <Text mb='2px'>Phone Number</Text>
                                <Input placeholder='9876543210' size='sm' maxLength={10} type='tel' name="phoneNumber" onChange={(event)=>{setFormData({...formData, mobileNo:event.target.value})}} value={formData.mobileNo} />
                            </div>

                            <div>
                                <Text mb='2px'>Email-ID</Text>
                                <Input placeholder='sample@abc.com' size='sm' type='tel' name="phoneNumber" onChange={(event)=>{setFormData({...formData, emailId:event.target.value})}} value={formData.emailId} />
                            </div>

                            <div>
                                <Text mb='2px'>DOB</Text>
                                <Input placeholder='XX-XX-XXXX' size='sm' type='number' name="age" onChange={(event)=>{setFormData({...formData, DOB:event.target.value})}} value={formData.DOB} />
                            </div>

                            <div>
                                <Text mb='2px'>Blood Group</Text>
                                <Input placeholder='B+' size='sm'  name="aadharNo" onChange={(event)=>{setFormData({...formData, bloodGroup:event.target.value})}} value={formData.bloodGroup} />
                            </div>
                            <div>
                                <Text mb='2px'>Address</Text>
                                <Input placeholder='Street, City, District' size='sm' name="aadharNo" onChange={(event)=>{setFormData({...formData, address:event.target.value})}} value={formData.address} />
                            </div>
                            <div>
                                <Text mb='2px'>Login ID</Text>
                                <Input size='sm' type={'number'} name="aadharNo" value={formData.mobileNo} />
                            </div>
                            <div>
                                <Text mb='2px'>Password</Text>
                                <Input placeholder='12345678' size='sm'  name="aadharNo" onChange={(event)=>{setFormData({...formData, password:event.target.value})}} value={formData.password} />
                            </div>
                        </div>
                    </div>
                    <Divider mt={'30px'} mb="30px" />

                    <div className="form-snippet-container">
                        <div className="entry-tab-form-label-container">
                            <h2 className="entry-tab-form-title">Operation Details</h2>
                            <p className="entry-tab-form-subtitle">UID/District/BLock</p>
                        </div>

                        <div className="entry-tab-form-container">
                            <div>
                                <Text mb='2px'>District</Text>
                                <Select placeholder='Click to select' size='sm' name='initialStatus' onChange={(event)=>{setFormData({...formData, district:event.target.value})}} value={formData.district}>
                                    <option>Dewas</option>
                                    <option>Rajgarh</option>
                                    <option>Guna</option>
                                </Select>
                            </div>

                            <div>
                                <Text mb='2px'>Block</Text>
                                <Select placeholder='Click to select' size='sm' name='initialStatus' onChange={(event)=>{setFormData({...formData, block:event.target.value})}} value={formData.block}>
                                    {
                                        getBlockList(formData.district).map((item)=> <option>{item}</option>)
                                    }
                                </Select>
                            </div>
                            <div>
                                <Text mb='2px'>Post</Text>
                                <Select placeholder='Click to select' size='sm' name='initialStatus' onChange={(event)=>{setFormData({...formData, designation:event.target.value})}} value={formData.designation}>
                                    <option>DC</option>
                                    <option>BC</option>
                                    <option>CC</option>
                                </Select>
                            </div>
                            <div>
                                <Text mb='2px'>Operator Code</Text>
                                <Input placeholder='xxxx xxxx xxxx' size='sm' type={'number'} name="aadharNo" onChange={(event)=>{setFormData({...formData, key:event.target.value})}} value={formData.key} />
                            </div>
                        </div>
                    </div>
                    <div className="form-action-button-container">
                        <Button variant={'outline'} disabled={loading} onClick={()=>{setActiveComponent("LIST")}}>Back</Button>
                        <Button onClick={handleSubmit} color={'white'} disabled={loading} backgroundColor={"#53A86B"} ml='20px' width={'200px'}>Submit</Button>
                    </div>
                </div>
    )
}

export default AddOperator