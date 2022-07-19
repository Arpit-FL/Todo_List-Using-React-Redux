
import { v4 as uuidv4 } from 'uuid';

//Add DAtA Action...
export const Add =(items)=>{
    return{
        type: "ADD_DATA",
        payload: {
            id: uuidv4(),
            createdAt: new Date().toString(),
            items: items?.items,
            priority: items?.priority,
            completed: false,
    },
}
}

//Remove Post ...
export const Remove =(id)=>{
    return{
        type: "RMV_DATA",
        payload: id
    }
}


export const Update_data =(items,id)=>{
    return{
        type: "UPDATE_DATA",
        payload: items,
        d : id
    }
}


// export const completeddata =(items,id)=>{
//     return{
//         type: "COMPLETED_DATA",
//         payload: items,
//         d : id
//     }
// }

