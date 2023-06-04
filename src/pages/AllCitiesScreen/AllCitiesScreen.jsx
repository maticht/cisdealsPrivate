import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import { createUseStyles } from "react-jss";
import CitiesJSON from '../../data/cities.json';
import arrow from '../../img/arrowright.svg';

const useStyles = createUseStyles({
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
    allCategoriesBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
    },
    AllCategoryContainer: {
        margin: "0 2vw",
        padding: "15px 0 40px 0",
    },
    OneCategoryInfo: {
        display: "flex",
        flexDirection: "row",
    },
    OneCategoryImg: {
        width: "60px",
        marginRight: "10px",
    },
    OneCategoryItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
    }
});

function AllCategoriesScreen() {
    const classes = useStyles();
    console.log(CitiesJSON)

    const categoryList = CitiesJSON.cities.map((category) =>
        <Link  className={classes.OneCategoryItem} to={`/AllCities/${category.title}`}>
            <div className={classes.OneCategoryInfo}>
                <p className={'OneCategoryTitle'}>{category.title}</p>
            </div>
            <img src={arrow} alt={'logo'}/>
        </Link>
    );
    return (
        <>
            <div className={classes.container}>
                <div className={classes.AllCategoryContainer}>
                    <Link className={classes.allCategoriesBtn} to="/">˂ Главная</Link>
                    <h2>Выберете город</h2>
                    <div>{categoryList}</div>
                </div>
            </div>
        </>

    );
}

export default AllCategoriesScreen;
