import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {getBugById} from "./bugs";

let lastId = 0;
const memberSlice = createSlice({
    name: "members",
    initialState: [],
    reducers: {
        addMember: (members, action) => {
            members.push({
                id: lastId++,
                name: action.payload.name,
            })
        }
    }
})
export const {addMember} = memberSlice.actions
export default memberSlice.reducer;

//Selector
// export const addBugToMemberSelector = (memberId, bugId, state) => {
//     state.entities.members.map(member => {
//         if (member.id === memberId){
//             let bugsId = member.bugsId.push(bugId);
//             return {...member, bugsId}
//         }
//         return member;
//     })
// }


//Memoization
// export const getMemberBugs = createSelector(
//     state => state.entities.members,
//     state => state.entities.bugs,
//     (members, bugs) => members.bugsId.map(id => getBugById(id, bugs))
// )