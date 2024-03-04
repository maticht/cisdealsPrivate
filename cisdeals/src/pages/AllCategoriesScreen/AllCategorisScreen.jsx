import React from "react";
import {Link} from "react-router-dom";
import CategoriesJSON from '../../data/categories.json';
import arrow from '../../img/arrowright.svg';
import beauty from '../../img/CategoriesLogo/beauty.svg';
import sport from '../../img/CategoriesLogo/sport.svg';
import health from '../../img/CategoriesLogo/health.svg';
import auto from '../../img/CategoriesLogo/auto.svg'
import finance from '../../img/CategoriesLogo/finance.svg'
import animals from '../../img/CategoriesLogo/animals.svg';
import photo from '../../img/CategoriesLogo/photo.svg';
import study from '../../img/CategoriesLogo/study.svg';
import ads from '../../img/CategoriesLogo/ads.svg';
import design from '../../img/CategoriesLogo/design.svg';
import programming from '../../img/CategoriesLogo/programming.svg';
import logistics from '../../img/CategoriesLogo/logistics.svg';
import house from '../../img/CategoriesLogo/house.svg';
import build from '../../img/CategoriesLogo/build.svg';
import party from '../../img/CategoriesLogo/party.svg';
import food from '../../img/CategoriesLogo/food.png';
import './AllCategoriesScreen.css'
import back from "../../img/Arrow_left.svg";

function AllCategoriesScreen() {
    const categoryList = CategoriesJSON.categories.map((category, index) =>
        <Link className={'OneCategoryScreenItem'}
              to={`/AllCategories/${category.categoriestitle}`}
              style={{borderBottom: CategoriesJSON.categories.length - 1 === index ? '#DDDDDD solid 0px' : '#DDDDDD solid 1px'}}
        >
            <div className={'OneCategoryScreenInfo'}>
                <img className={'OneCategoryScreenImg'}
                     src={(category.categoriestitle === "Еда") ? food : category.imgId}
                //      src={
                //     (category.categoriestitle === "Красота и уход") ?
                //     beauty : (category.categoriestitle === "Спорт") ?
                //     sport : (category.categoriestitle === "Здоровье") ?
                //     health : (category.categoriestitle === "Авто") ?
                //     auto : (category.categoriestitle === "Финансы и законы") ?
                //     finance : (category.categoriestitle === "Животные") ?
                //     animals : (category.categoriestitle === "Образование") ?
                //     study : (category.categoriestitle === "Фото, видео, аудио") ?
                //     photo : (category.categoriestitle === "Продвижение и реклама") ?
                //     ads : (category.categoriestitle === "Дизайн и проектирование") ?
                //     design : (category.categoriestitle === "Разработка") ?
                //     programming : (category.categoriestitle === "Транспорт и логистика") ?
                //     logistics : (category.categoriestitle === "Помощь по дому") ?
                //     house : (category.categoriestitle === "Строительство и ремонт") ?
                //     build : (category.categoriestitle === "Развлечения и мероприятия") ?
                //     party : (category.categoriestitle === "Еда") ?
                //     food : category.imgId
                // }
                     alt="image not found"/>
                <p className={'OneCategoryInfoTitle'}>{category.categoriestitle}</p>
            </div>
            <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
        </Link>
    );
    return (
        <>
            <div className={'AllContainer'}>
                <div className={'AllCategoryScreenContainer'}>
                    <Link className="form-update-link" to="/">
                        <img src={back} alt="back" />
                        <p>Главная</p>
                    </Link>
                    <p className="form-prsnl-heading">Категории</p>
                    <div className={'AllCategoryScreenBlock'}>
                        <Link className={'OneCategoryScreenItem'} to={`/AllSpecialists`}>
                            <div className={'OneCategoryInfo'}>
                                <p className={'OneTopCategoryTitle'}>Показать всех специалистов</p>
                            </div>
                            <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
                        </Link>
                        {categoryList}
                    </div>

                </div>
            </div>
        </>

    );
}

export default AllCategoriesScreen;
