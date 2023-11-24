import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import CategoriesJSON from '../../data/categories.json';
import arrow from "../../img/arrowright.svg";
import back from "../../img/Arrow_left.svg";

function CategoriesScreen3() {
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    let category2 = CategoriesJSON.categories.find(category => category.categoriestitle === Categories2);
    let category3 = category2.subcategories.find(category => category.title === Categories3);

    const categoryList = category3.subsubcategories.map((category) =>
         <Link className={'OneCategoryScreenItem'} to={(category?.subsubsubcategories?.length === 0 || !category.subsubsubcategories) ?
             `/AllCategories/${Categories2}/${Categories3}/Categories4/${category.title}`
             : `/AllCategories/${Categories2}/${Categories3}/${category.title}`}>
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
                      to={`/AllCategories/${Categories2}`}>
                    <img src={back} alt="back" />
                    <p>{Categories2}</p>
                </Link>
                <p className="form-prsnl-heading">{Categories3}</p>
                <div className={'AllCategoryScreenBlock'}>
                    <Link className={'OneCategoryScreenItem'} to={`/AllCategories/Categories2/Categories3/Categories4/${Categories3}`}>
                        <div className={'OneCategoryInfo'}>
                            <p className={'OneCategoryTitle'}>Все в этой категории</p>
                        </div>
                        <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
                    </Link>
                    {categoryList}
                </div>
            </div>
        </div>
    );
}

export default CategoriesScreen3;
