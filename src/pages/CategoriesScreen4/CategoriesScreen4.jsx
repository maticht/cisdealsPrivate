import React from "react";
import {Link} from "react-router-dom";
import { createUseStyles } from "react-jss";
import {useParams} from "react-router-dom";
import CategoriesJSON from '../../data/categories.json';
import arrow from "../../img/arrowright.svg";
import back from "../../img/Arrow_left.svg";

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

function CategoriesScreen4() {
    const classes = useStyles();
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    const {Categories4} = useParams();
    let category2 = CategoriesJSON.categories.find(category => category.categoriestitle === Categories2);
    let category3 = category2.subcategories.find(category => category.title === Categories3);
    let category4 = category3.subsubcategories.find(category => category.title === Categories4);

    const categoryList = category4.subsubsubcategories.map((category) =>
        <Link className={'OneCategoryScreenItem'}
              to={`/AllCategories/${Categories2}/${Categories3}/${Categories4}/${category.title}`}>
            <div className={'OneCategoryInfo'}>
                <p className={'OneCategoryTitle'}>{category.title}</p>
            </div>
            <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
        </Link>
    );
    return (
        <div className={'AllContainer'}>
            <div className={'AllCategoryScreenContainer'}>
                <Link className="form-update-link"
                      to={`/AllCategories/${Categories2}/${Categories3}`}>
                    <img src={back} alt="back" />
                    <p>{Categories3}</p>
                </Link>
                <p className="form-prsnl-heading">{Categories4}</p>
                <div className={'AllCategoryScreenBlock'}>
                    <Link className={'OneCategoryScreenItem'} to={`/AllCategories/Categories2/Categories3/Categories4/${Categories4}`}>
                        <div className={'OneCategoryInfo'}>
                            <p className={'OneCategoryTitle'}>Все в этой подкатегории</p>
                        </div>
                        <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
                    </Link>
                    {categoryList}
                </div>
            </div>
        </div>
    );
}

export default CategoriesScreen4;
