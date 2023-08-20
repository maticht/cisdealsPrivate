import React from "react";
import HeaderNavBar from '../../components/headerNavBar/headerNavBar';
import {Routes, Route, Link} from "react-router-dom";
import { createUseStyles } from "react-jss";
import {useParams} from "react-router-dom";
import CategoriesJSON from '../../data/categories.json';
import arrow from "../../img/arrowright.svg";

const useStyles = createUseStyles({
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
    Categories2Block: {
        margin: "0 2vw",
        padding: "15px 0 40px 0",
    },
    OneCategory2Item: {
        display: "flex",
        flexDirection: "row",
        justifyContentontent: "space-between",
        padding: "4px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
    },
    OneCategoryInfo: {
        display: "flex",
        flexDirection: "row",
    },
    allCategoriesBtn: {
        textDecoration: 'none',
        color: '#454545',
        fontSize: '14px',
    }
});

function CategoriesScreen2() {
    const classes = useStyles();
    const {Categories2} = useParams();
    let category = CategoriesJSON.categories.find(category => category.categoriestitle === Categories2);
    console.log(category.subcategories);
    const categoryList = category.subcategories.map((category) =>
    (category.subsubcategories.length === 0 || !category.subsubcategories) ?
        <Link  className={classes.OneCategory2Item} style={{display:'flex', justifyContent:'space-between'}} to={`/AllCategories/${Categories2}/${Categories2}/Categories4/${category.title}`}>
            <div className={classes.OneCategoryInfo}>
                <p className={'OneCategoryTitle'}>{category.title}</p>
            </div>
            <img src={arrow} alt={'logo'}/>
        </Link>
        :
        <Link  className={classes.OneCategory2Item} style={{display:'flex', justifyContent:'space-between'}} to={`/AllCategories/${Categories2}/${category.title}`}>
            <div className={classes.OneCategoryInfo}>
                <p className={'OneCategoryTitle'}>{category.title}</p>
            </div>
            <img src={arrow} alt={'logo'}/>
        </Link>
    );
    return (
        <>
            <div className={classes.container}>
                <div className={classes.Categories2Block}>
                    <Link className={classes.allCategoriesBtn} to="/">˂ Все категории</Link>
                    <h2>{Categories2}</h2>
                    <div>
                        <Link  className={classes.OneCategory2Item} style={{display:'flex', justifyContent:'space-between'}} to={`/AllCategories/Categories2/Categories3/Categories4/${Categories2}`}>
                            <div className={classes.OneCategoryInfo}>
                                <p className={'OneCategoryTitle'}>Все в этой категории</p>
                            </div>
                            <img src={arrow} alt={'logo'}/>
                        </Link>
                        {categoryList}
                    </div>
                </div>
            </div>
        </>

    );
}

export default CategoriesScreen2;
