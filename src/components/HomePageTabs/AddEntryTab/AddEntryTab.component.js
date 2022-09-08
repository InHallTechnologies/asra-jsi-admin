import { Button, Divider, Input, Select, Text } from "@chakra-ui/react";
import React, { Suspense, useContext } from "react";
import FormContext, { FormProvider } from "../../../context/form-context";
import UserDetails from "../../UserDetails/UserDetails.component";
import './AddEntryTab.style.css';

const AddEntryTab = () => {
    const [formData, setFormData] = useContext(FormContext);
   

    const handleChange = event => {
        const { value, name } = event.target;
        setFormData({ ...formData, [name]: value })
    }
    
    const handleSubmit = () => {
        console.log(formData);
    }
    return (
        <Suspense fallback={<div>LOADING</div>}>
            <div className="add-entry-tab-container tab-container">
                <UserDetails />
                <div className="add-entry-tab-main-container">
                    <div className="entry-tab-label-container">
                        <h2 className="entry-tab-title">Add New Entry</h2>
                        <p className="entry-tab-subtitle">Fill out the fields and press submit</p>
                    </div>
                    <Divider mt={'10px'} mb={"30px"} />


                    <div className="form-snippet-container">
                        <div className="entry-tab-form-label-container">
                            <h2 className="entry-tab-form-title">Personal Details</h2>
                            <p className="entry-tab-form-subtitle">Personal Details of the Person</p>
                        </div>

                        <div className="entry-tab-form-container">
                            <div>
                                <Text mb='2px'>Person Name</Text>
                                <Input
                                    placeholder='Eg.: John Doe'
                                    size='sm'
                                    name='name'
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                            </div>
                            <div>
                                <Text mb='2px'>Phone Number</Text>
                                <Input
                                    placeholder='10 digit phone number'
                                    size='sm'
                                    maxLength={10}
                                    type='tel'
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    value={formData.phoneNumber}
                                />
                            </div>

                            <div>
                                <Text mb='2px'>Gender</Text>
                                <Select
                                    placeholder='Click to select'
                                    size='sm'
                                    name='gender'
                                    onChange={handleChange}
                                    value={formData.gender}
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </Select>
                            </div>

                            <div>
                                <Text mb='2px'>Age</Text>
                                <Input
                                    placeholder='Eg.: 35'
                                    size='sm'
                                    type='number'
                                    name="age"
                                    onChange={handleChange}
                                    value={formData.age}
                                />
                            </div>

                            <div>
                                <Text mb='2px'>Aadhar Card Number (Optional)</Text>
                                <Input
                                    placeholder='xxxx xxxx xxxx'
                                    size='sm'
                                    type={'number'}
                                    name="aadharNo"
                                    onChange={handleChange}
                                    value={formData.aadharNo}
                                />
                            </div>
                        </div>
                    </div>
                    <Divider mt={'30px'} mb="30px" />

                    <div className="form-snippet-container">
                        <div className="entry-tab-form-label-container">
                            <h2 className="entry-tab-form-title">Dose Details</h2>
                            <p className="entry-tab-form-subtitle">Vaccination Statusof the Person</p>
                        </div>

                        <div className="entry-tab-form-container">
                            <div>
                                <Text mb='2px'>Current Vaccination Status</Text>
                                <Select
                                    placeholder='Click to select'
                                    size='sm'
                                    name='initialStatus'
                                    onChange={handleChange}
                                    value={formData.initialStatus}>

                                    <option>Not Vaccinated</option>
                                    <option>1st Dose</option>
                                    <option>2nd Dose</option>
                                </Select>
                            </div>

                            {
                                formData.initialStatus === '1st Dose' || formData.initialStatus === '2nd Dose'
                                    ?
                                    <div className="slideInRight">
                                        <Text mb='2px'>Registation Number</Text>
                                        <Input
                                            placeholder='cowin registration number'
                                            size='sm'
                                            name="regNo"
                                            onChange={handleChange}
                                            value={formData.regNo}
                                        />
                                    </div>
                                    :
                                    null
                            }

                        </div>
                    </div>
                    <Divider mt={'30px'} mb="30px" />

                    <div className="form-snippet-container">
                        <div className="entry-tab-form-label-container">
                            <h2 className="entry-tab-form-title">Other Details</h2>
                            <p className="entry-tab-form-subtitle">General Details of the Person</p>
                        </div>

                        <div className="entry-tab-form-container">
                            <div>
                                <Text mb='2px'>Category</Text>
                                <Select
                                    placeholder='Click to select'
                                    size='sm'
                                    name='initialStatus'
                                    onChange={handleChange}
                                    value={formData.initialStatus}>

                                    <option>Tribes</option>
                                    <option>Elderly</option>
                                    <option>Migrants</option>
                                    <option>Adolescent girls (15-18)</option>
                                    <option>Factory Workers</option>
                                    <option>Border Villages</option>
                                    <option>Minorities</option>
                                    <option>NREGA/Daily wage Labourer</option>
                                    <option>Co-morbidities</option>
                                    <option>Brick Kiln Workers</option>
                                    <option>Pregnant/Lactating women</option>
                                    <option>{`Trucker’s`}</option>
                                    <option>Allied population</option>
                                    <option>Physically challenged</option>
                                    <option>Drug Addicts</option>
                                    <option>Transgender/ LGBT</option>
                                    <option>School drop out children</option>
                                    <option>{`School Children (12-14Yrs & 15-17 yrs)`}</option>
                                    <option>{`Chakma & Lai community ( Mizoram)`}</option>
                                    <option>PVTG</option>
                                </Select>
                            </div>
                            <div>
                                <Text mb='2px'>Facility Based Health Worker</Text>
                                <Select
                                    placeholder='Click to select'
                                    size='sm'
                                    name='isFaciltyBasedWorker'
                                    onChange={handleChange}
                                    value={formData.isFaciltyBasedWorker}>
                                    <option>Yes</option>
                                    <option>No</option>
                                </Select>
                            </div>

                            <div>
                                <Text mb='2px'>Frontline Wroker</Text>
                                <Select
                                    placeholder='Click to select'
                                    size='sm'
                                    name='isFrontLineWorker'
                                    onChange={handleChange}
                                    value={formData.isFrontLineWorker}>
                                    <option>Yes</option>
                                    <option>No</option>
                                </Select>
                            </div>

                            <div>
                                <Text mb='2px'>Mode Of Contact</Text>
                                <Select
                                    placeholder='Click to select'
                                    size='sm'
                                    name='modeOfContact'
                                    onChange={handleChange}
                                    value={formData.modeOfContact}>
                                    <option>{`Mobile & Telephone`}</option>
                                    <option>{`Hard Copy Print`}</option>
                                    <option>{`IPC`}</option>
                                    <option>{`Mid Media`}</option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="form-action-button-container">
                        <Button variant={'outline'}>Clear From</Button>
                        <Button onClick={handleSubmit} color={'white'} backgroundColor={"#53A86B"} ml='20px' width={'200px'}>Submit</Button>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default () => {
    return (
        <FormProvider>
            <AddEntryTab />
        </FormProvider>
    )
};