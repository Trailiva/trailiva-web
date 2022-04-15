import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {SIDE_BAR_DATA} from "../data/dashbaordData";

function SidebarLink(props) {
    return (<div className={props.active ? "active_link" : null} key={props.key}>
        <li>
            <img src={props.icon} alt="nav icon"/>
            {props.text}
        </li>
    </div>);
}

function SpaceName({name}) {
    return <div className="space_name">
        <h4>Me & I</h4>
        <p>{name}’s Space</p>
    </div>;
}

const Nav = ({name}) => {

    const [links, setLinks] = useState(SIDE_BAR_DATA);

    const handleLink = (e) => {
        let linkText = e.target.textContent.toLowerCase();
        let currentLink = links.find(link => link.text === linkText);
        currentLink.active = true;

        let updatedLinks = links.map(link => {
            if (link.text !== linkText) {
                link.active = false;
            }
            return {...link, currentLink}
        })
        setLinks(updatedLinks);
    }

    return (
        <Box style={{height: "100vh", backgroundColor: "#FFF", width: "100%", padding: "8px 15px"}}>
            <SpaceName name={name}/>
            <ul onClick={handleLink} className="nav_links">
                {links.map((link, index) => {
                    return <SidebarLink
                        key={index}
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