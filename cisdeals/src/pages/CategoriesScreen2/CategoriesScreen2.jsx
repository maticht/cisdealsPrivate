import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import CategoriesJSON from '../../data/categories.json';
import arrow from "../../img/arrowright.svg";
import back from "../../img/Arrow_left.svg";

function CategoriesScreen2() {
    const {Categories2} = useParams();
    let category = CategoriesJSON.categories.find(category => category.categoriestitle === Categories2);
    console.log(category.subcategories);
    const categoryList = category.subcategories.map((category, index) => (
        <Link className={'OneCategoryScreenItem'}
              to={(category.subsubcategories?.length === 0 || !category.subsubcategories) ?
                  `/${category.title}`
                  : `/AllCategories/${Categories2}/${category.title}`}>
            <div className={'OneCategoryInfo'}>
                <p className={'OneCategoryInfoTitle'}>{category.title}</p>
            </div>
            <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
        </Link>
        ));

    return (
        <div className={'AllContainer'}>
            <div className={'AllCategoryScreenContainer'}>
                <div className="form-update-link" onClick={() => {
                    window.history.back()
                }}>
                    <img src={back} alt="back"/>
                    <p>Все категории</p>
                </div>
                <p className="form-prsnl-heading">{Categories2}</p>
                <div className={'AllCategoryScreenBlock'}>
                    <Link className={'OneCategoryScreenItem'} to={`/${Categories2}`}>
                        <div className={'OneCategoryInfo'}>
                            <p className={'OneTopCategoryTitle'}>Все в этой категории</p>
                        </div>
                        <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
                    </Link>
                    {categoryList}
                </div>
            </div>
        </div>
    );
}

export default CategoriesScreen2;
