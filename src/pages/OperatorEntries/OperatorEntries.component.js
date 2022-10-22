import React, { useEffect } from "react";
import { firebasedatabase } from "../../backend/firebase-handler";
import "./OperatorEntries.style.css"
import { child, get, ref, runTransaction, set } from "firebase/database";
import moment from "moment";
import { async } from "@firebase/util";

const OperatorEntries = () =>{

    useEffect(() => {
        console.log("fuck me daddy")
        // let count = 0;
        // get(child(ref(firebasedatabase), "USER_WISE_ENTRIES")).then((snap) => {
        //     for (const userId in snap.val()) {
        //         count += snap.child(userId).size;
        //     }
        //     console.log(count)
        // })
      
        // let count  = 0;
        // get(child(ref(firebasedatabase), "DATE_WISE_VACCINATION")).then(async (snapShot) => {
           
        //     if (snapShot.exists()) {
        //         for (const date in snapShot.val()) {
        //             for (const district in snapShot.child(date).val()) {
        //                 for (const block in snapShot.child(date).child(district).val()) {
        //                     count += snapShot.child(date).child(district).child(block).val()
        //                     console.log(count)
        //                 //     for (const keys in snapShot.child(date).child(district).child(block).val()) {
        //                 //         const entry = snapShot.child(date).child(district).child(block).child(keys).val()
        //                 //         if (entry.firstUpdateDate) {
        //                 //                 let formattedDate = moment(entry.firstUpdateDate).format('MMMM Do YYYY - dddd')
        //                 //                 const writeRef = ref(firebasedatabase, `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`);
        //                 //                 await runTransaction(writeRef, (currentData)=>{
        //                 //                     if (currentData) {
        //                 //                         console.log(currentData)
        //                 //                         return currentData+1
        //                 //                     } else {
        //                 //                         return 1;
        //                 //                     }
        //                 //                 })
        //                 //                 // await get(child(ref(firebasedatabase), `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`)).then( async (snap) => {
        //                 //                 //     if (snap.exists()) { 
        //                 //                 //         let value = snap.val() + 1
        //                 //                 //         await set(ref(firebasedatabase, `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`), value)
        //                 //                 //     } else {
        //                 //                 //         await set(ref(firebasedatabase, `DATE_WISE_VACCINATION/${formattedDate}/${district}/${block}`), 1)
        //                 //                 //     }
        //                 //                 //  })
        //                 //         }
        //                 //     }
        //                 // }
        //             }
        //         }}
        //     } 
        // })
    }, [])


    return(
        <div>
            <h1>Operator</h1>
        </div>
    )
}

export default OperatorEntries