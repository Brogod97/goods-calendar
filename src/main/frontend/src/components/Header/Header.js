import React from "react";
import "./header.css";
import MySvg from "./logo.svg";
import axios from 'axios';

const Header = () => {

    // TODO: 임시 버튼
    const handleClick = () => {
        console.log("call save event POST")
        axios.post("http://localhost:8080/events");
    }

    return (
        <header>
            <img src={MySvg} alt="Logo"/>
            <button type="button" onClick={handleClick}>이벤트 저장</button>
            {/*  임시 버튼  */}
        </header>
    );
};

export default Header;
