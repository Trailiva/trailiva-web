import {createAction, createReducer} from "@reduxjs/toolkit";

// Action creator
export const  bugAdded = createAction("bugAdded")
export const  bugRemoved = createAction("bugRemoved")
export const  bugResolved = createAction("bugResolved")

let lastId = 0;
// Reducer
const bugReducer = createReducer([], {
    [bugAdded.type]: (bug, action) =>{
        bug.push({
            id: ++lastId,
            desc: action.payload.desc,
            resolved: false
        })
    },

    [bugResolved.type]: (bug, action) => {
        const index = bug.findIndex(action.payload.id);
        bug[index].resolved = true;
    },

    [bugRemoved.type]: (bug, action)=> {
        const index = bug.findIndex(action.payload.id);
        bug.slice(index, index + 1);
    }
})


export default bugReducer;
