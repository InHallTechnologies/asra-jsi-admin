import React, { useEffect, useState } from "react";
import { firebasedatabase, GunaDatabase, RajGarhDatabase } from "../../backend/firebase-handler";
import "./OperatorEntries.style.css"
import { child, get, ref, runTransaction, set } from "firebase/database";
import moment from "moment";
import { async } from "@firebase/util";

const OperatorEntries = () =>{
    const [totalVaccinated, setTotalVaccinated] = useState("Calculating")
    useEffect(() => {
        console.log("Turn Around!")
        // let count = 0;
        // get(child(ref(firebasedatabase), "USER_WISE_ENTRIES")).then((snap) => {
        //     for (const userId in snap.val()) {
        //         count += snap.child(userId).size;
        //     }
        //     console.log(count)
        // })
      
        let count  = 0;
        const tasks = []
        get(child(ref(firebasedatabase), "DATE_WISE_VACCINATION")).then(async(snapShot) => {
           
            if (snapShot.exists()) {
                for (const date in snapShot.val()) {
                    for (const district in snapShot.child(date).val()) {
                        for (const block in snapShot.child(date).child(district).val()) {
                            count += snapShot.child(date).child(district).child(block).val()
                            console.log(count);
                            setTotalVaccinated(state => count);
                            // for (const keys in snapShot.child(date).child(district).child(block).val()) {
                            //     const entry = snapShot.child(date).child(district).child(block).child(keys).val()
                            //     if (entry.firstUpdateDate) {
                            //             let formattedDate = moment(entry.firstUpdateDate).format('MMMM Do YYYY - dddd')
                            //             const writeRef = ref(firebasedatabase, `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`);
                            //             // const promise = new Promise(async (resolve, reject) => {
                            //             //     await runTransaction(writeRef, (currentData)=>{
                            //             //         if (currentData) {
                            //             //             console.log(currentData)
                            //             //             resolve(currentData + 1)
                            //             //             return currentData+1;
                                                    
                            //             //         } else {
                            //             //             return 1;
                            //             //         }
                            //             //     })
                            //             // })
                            //             // tasks.push(promise);
                            //             // await get(child(ref(firebasedatabase), `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`)).then( async (snap) => {
                            //             //     if (snap.exists()) { 
                            //             //         let value = snap.val() + 1
                            //             //         await set(ref(firebasedatabase, `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`), value)
                            //             //     } else {
                            //             //         await set(ref(firebasedatabase, `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`), 1)
                            //             //     }
                            //             //  })
                            //     }
                            // }
                        }
                    }
                }

                // const temp =  await Promise.allSettled(tasks)
                // console.log(temp);
            } 
        })
    }, [])


    return(
        <div>
            <h1>{totalVaccinated}</h1>
           
        </div>
    )
}

export default OperatorEntries