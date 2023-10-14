import React from 'react';
import searchBtn from "../../img/search.svg";
import './searchFilter.css';
import {Link} from "react-router-dom";

const SearchExample = () => {
    return (
        <Link className={"inputContainer"} to={'/SearchScreen'}>
            <div className={'searchFheight: 48px;ilterBlock'}>
                <div className={'search-block'}>
                    <div className={'searchFld'}>
                        <p>
                            Введите запрос
                        </p>
                    </div>
                    <img className={'searchBtn'} src={searchBtn} alt="logo"/>
                </div>
            </div>
        </Link>
    );
};

export default SearchExample;










