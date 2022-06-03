import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {SIDE_BAR_DATA} from "../data/dashbaordData";

function SidebarLink({id, active, icon, text, onHandleClick}) {
    return (
        <div className={active ? "active_link" : null} onClick={()=> onHandleClick(text)} key={id} >
            <li key={id}>
                <img src={icon} alt="nav icon"/>
                {text}
            </li>
        </div>
    );
}

function SpaceName({name, workspaceName}) {
    return <div className="space_name">
        <h4>{workspaceName}</h4>
        <p>{name}’s Space</p>
    </div>;
}

const Nav = ({name, onHandleLink, workspaceName}) => {

    const [links, setLinks] = useState(SIDE_BAR_DATA);

    const handleLink = (linkText: string) => {
        let currentLink = links.find(link => link.text === linkText);
        currentLink.active = true;

        let updatedLinks = links.map(link => {
            if (link.text !== linkText) {
                link.active = false;
            }
            return {...link, currentLink}
        })

        setLinks(updatedLinks);
        onHandleLink(updatedLinks.filter(link => link.active)[0].text)
    }

    return (
        <Box style={{height: "100vh", backgroundColor: "#FFF", width: "100%", padding: "8px 15px"}}>
            <SpaceName name={name} workspaceName={workspaceName}/>
            <ul className="nav_links">
                {links.map((link, index) => {
                    return <SidebarLink
                        key={index}
                        onHandleClick={handleLink}
                        id={index}
                        icon={link.icon}
                        text={link.text}
                        active={link.active}
                    />
                })}
            </ul>
        </Box>
    );
};


export default Nav;