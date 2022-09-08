const SAMPLE_ENTRY = {
    name: "",
    phoneNumber:"",
    district:"",
    block:"",
    village:"",
    date:"",
    time:"",
    key:"",
    regNo:"",
    aadharNo:"",
    gender:"",
    age:"",
    initialStatus:"",
    firstDoseDate:"",
    firstDoseType:"",
    secondDoseDate:"",
    secondDoseType:"",
    thirdDoseDate:"",
    thirdDoseType:"",
    modeOfContact:"",
    isFaciltyBasedWorker:"",
    isFrontLineWorker:"",
    category:"",
    operatorUID:""
}

export const getBlockList = district => {
    if (district === "Dewas") {
        return ([
            "Dewas",
            "Sonkatch",
            "Tonkhurd",
            "Kannod",
            "Khategaon",
        ])
    }

    if (district === "Rajgarh") {
        return ([
            "Biaora",
            "Jirapur",
            "Khilchipur",
            "Marsinghgarh",
            "Pachore",
            "Rajgarh",
            "Sarangpur",
        ])
    }

    if (district === "Guna") {
        return ([
            "Guna",
            "Raghogarh",
            "Aron",
            "Chachoda",
            "Bamori",
        ])
    }
    return ([]);
}

export default SAMPLE_ENTRY;

