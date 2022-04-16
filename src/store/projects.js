import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

let lastId = 0
const projectSlice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        projectAdded: (projects, action) => {
            projects.push({
                id: ++lastId,
                desc: action.payload.name,
                resolved: false
            })
        },
        projectRemoved: (projects, action) => {
            const index = projects.findIndex(action.payload.id);
            projects.slice(index, index + 1);
        }
    }
})

export const {projectAdded, projectRemoved} = projectSlice.actions;
export default projectSlice.reducer;

//Selector Functions
export const sortProjectsByName = (name, state) =>
    state.entities.projects.sort(project => project.name.localeCompare(name));


//Memoization

export  const sortProjectByNameSelector = createSelector(
    state => state.entities.projects,
    (projects, name) => projects.sort(project => project.desc.localeCompare(name))
)