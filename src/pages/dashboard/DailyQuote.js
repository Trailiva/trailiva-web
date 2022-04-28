import React from 'react';
import QuoteBg from "../../images/quoteBg.png";
import {Close} from "@material-ui/icons";

const DailyQuote = ({quote, author}) => {
    return (
        <div className="quote">
            <img src={QuoteBg} alt="quote background"/>
            <p className="top-left">"{quote}"</p>
            <small>-{author}</small>
            <button className="quote_btn">turn on</button>
            <Close style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                color: "#fff",
                cursor: "pointer"
            }}/>
        </div>
    );
};

export default DailyQuote;