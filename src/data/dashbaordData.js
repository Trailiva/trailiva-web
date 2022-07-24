import OverviewIcon from "../images/overview.svg";
import SettingIcon from "../images/setting.svg";
import ProfileSetup from "../images/profileSetupIcon.svg";
import TaskSetup from "../images/office.svg";
import TaskIcon from "../images/task.svg"

export const SIDE_BAR_DATA = [
    {
        id: 1,
        active: true,
        text: "overview",
        icon: OverviewIcon
    },
    {
        id: 1,
        active: false,
        text: "tasks",
        icon: TaskIcon
    },
    {
        id: 1,
        active: false,
        text: "settings",
        icon: SettingIcon
    },
]

export const SETUP_DATA = [
    {
        name: "profile",
        active: true,
        done: false,
        content: " update your profile picture",
        icon: ProfileSetup,
    },
    {
        name: "task",
        active: false,
        done: false,
        content: "create your first task in your workspace",
        icon: TaskSetup,
    }
]