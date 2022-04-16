import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

//Create Action and Reducer
let lastId = 0;

const bugSlice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                desc: action.payload.desc,
                resolved: false
            })
        },
        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(action.payload.id);
            bugs[index].resolved = true;
        },
        bugRemoved: (bugs, action) => {
            const index = bugs.findIndex(action.payload.id);
            bugs.slice(index, index + 1);
        },
        assignBugToUser: (bugs, action) => {
            const {bugId, userId} = action.payload;
            const index = bugs.findIndex(bug => bug.id === bugId);
            bugs[index].userId = userId;
        }
    }
})
export const {bugAdded, bugResolved, bugRemoved, assignBugToUser} = bugSlice.actions;
export default bugSlice.reducer;

//Selector Function
export const selectUnresolvedBugs = state =>
    state.entities.bugs.filter(bug => !bug.resolved);


export const selectResolvedBugs = state =>
    state.entities.bugs.filter(bug => bug.resolved);

export const filterBugsByDesc = (desc, state) =>
    state.entities.bugs.filter(bug => bug.desc === desc)

export const sortBugsByDesc = (desc, state) =>
    state.entities.bugs.sort(bug => bug.desc.localeCompare(desc));

export const getBugById = (id, state) =>
    state.entities.bugs.filter(bug => bug.id === id);

// export const addBugToMember = (memberId, bugId, state) => {
//     state.entities.bugs.map(bug => {
//         if (bug.id === bugId)
//             return {...bug, memberId}
//         return bug;
//     });
//
// }


//Memoization
export const getUnresolved = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bugs => !bugs.resolved)
)

export const getResolvedBug = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bugs => bugs.resolved)
)

export const filterBugsByDescSelector = desc => createSelector(
    state => state.entities.bugs,
        bugs => bugs.filter(bug => bug.desc === desc)
)

export  const sortBugsByDescSelector = desc => createSelector(
    state => state.entities.bugs,
    bugs => bugs.sort(bug => bug.desc.localeCompare(desc))
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs =>  bugs.filter(bug => bug.userId === userId)
)




// Action creator
// export const  bugAdded = createAction("bugAdded")
// export const  bugRemoved = createAction("bugRemoved")
// export const  bugResolved = createAction("bugResolved")


// Reducer
// const bugReducer = createReducer([], {
//     [bugAdded.type]: (bug, action) =>{
//         bug.push({
//             id: ++lastId,
//             desc: action.payload.desc,
//             resolved: false
//         })
//     },
//
//     [bugResolved.type]: (bug, action) => {
//         const index = bug.findIndex(action.payload.id);
//         bug[index].resolved = true;
//     },
//
//     [bugRemoved.type]: (bug, action)=> {
//         const index = bug.findIndex(action.payload.id);
//         bug.slice(index, index + 1);
//     }
// })



