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
        padding: "4px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
    },
    Categories2Block: {
        margin: '0 2vw',
        padding: '15px 0 40px 0',
    },
    OneCategory2Item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '4px 0',
        borderBottom: '#DDDDDD solid 1px',
        textDecoration: 'none',
        color: '#000000',
    },
    allCategoriesBtn: {
        textDecoration: 'none',
        color: '#454545',
        fontSize: '14px',
    }
});

function CategoriesScreen3() {
    const classes = useStyles();
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    let category2 = CategoriesJSON.categories.find(category => category.categoriestitle === Categories2);
    let category3 = category2.subcategories.find(category => category.title === Categories3);

    const categoryList = category3.subsubcategories.map((category) =>
         <Link  className={classes.OneCategoryItem} to={`/AllCategories/${Categories2}/${Categories3}/Categories4/${category.title}`}>
             <div className={classes.OneCategoryInfo}>
                 <p>{category.title}</p>
             </div>
             <img src={arrow} alt={'logo'}/>
        </Link>
    );
    return (
        <>
            <div className={classes.container}>
                <div className={classes.Categories2Block}>
                    <Link className={classes.allCategoriesBtn} to={`/AllCategories/Categories2/Categories3/Categories4/${Categories2}`}>˂ {Categories2}</Link>
                    <h2>{Categories3}</h2>
                    <div>
                        <Link  className={classes.OneCategoryItem} to={`/AllCategories/Categories2/Categories3/Categories4/${Categories3}`}>
                            <div className={classes.OneCategoryInfo}>
                                <p>Все в этой категории</p>
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

export default CategoriesScreen3;
