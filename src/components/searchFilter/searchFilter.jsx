import './searchFilter.css';
import React from "react";
import searchBtn from "../../img/searchBtn.svg";
import {Link} from "react-router-dom";

function searchFilter() {
    return (
        <div className={'searchFilterBlock'}>
            <div className={'searchBlock'}>
                <input className={'searchFld'} placeholder={'Введите запрос'}/>
                <button className={'searchBtn'}><img src={searchBtn} className="App-logo" alt="logo" /></button>
            </div>
        </div>
    );
}

export default searchFilter;
