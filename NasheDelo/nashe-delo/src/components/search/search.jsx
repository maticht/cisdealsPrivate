import React from 'react';
import searchBtn from "../../img/search.svg";
import './searchFilter.css';
import Link from "next/link";
import Image from "next/image";

const SearchExample = () => {
    return (
        <Link className={"inputContainer"} href={'/SearchScreen'}>
            <div className={'searchFheight: 48px;ilterBlock'}>
                <div className={'search-block'}>
                    <div className={'searchFld'}>
                        <p>
                            Введите запрос
                        </p>
                    </div>
                    <Image className={'searchBtn'} src={searchBtn} alt="logo"/>
                </div>
            </div>
        </Link>
    );
};

export default SearchExample;










