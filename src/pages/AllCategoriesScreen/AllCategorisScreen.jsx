import React from "react";
import HeaderNavBar from '../../components/headerNavBar/headerNavBar';
import {Routes, Route, Link} from "react-router-dom";
import { createUseStyles } from "react-jss";
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
        width: "54px",
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

    const categoryList = CategoriesJSON.categories.map((category) =>
        <Link  className={classes.OneCategoryItem} to={`/AllCategories/${category.categoriestitle}`}>
            <div className={classes.OneCategoryInfo}>
                <img className={classes.OneCategoryImg} src={
                    (category.categoriestitle === "Красота и уход") ?
                    beauty : (category.categoriestitle === "Спорт") ?
                    sport : (category.categoriestitle === "Здоровье") ?
                    health : (category.categoriestitle === "Авто") ?
                    auto : (category.categoriestitle === "Финансы и законы") ?
                    finance : (category.categoriestitle === "Животные") ?
                    animals : (category.categoriestitle === "Образование") ?
                    study : (category.categoriestitle === "Фото, видео, аудио") ?
                    photo : (category.categoriestitle === "Продвижение и реклама") ?
                    ads : (category.categoriestitle === "Дизайн и проектирование") ?
                    design : (category.categoriestitle === "Разработка") ?
                    programming : (category.categoriestitle === "Транспорт и логистика") ?
                    logistics : (category.categoriestitle === "Помощь по дому") ?
                    house : (category.categoriestitle === "Строительство и ремонт") ?
                    build : (category.categoriestitle === "Развлечения и мероприятия") ?
                    party : (category.categoriestitle === "Еда") ?
                    food : category.imgId
                } alt="image not found"/>
                <p className={'OneCategoryTitle'} style={{fontSize:'14px', fontWeight:'500'}}>{category.categoriestitle}</p>
            </div>
            <img src={arrow} alt={'logo'}/>
        </Link>
    );
    return (
        <>
            <div className={classes.container}>
                <div className={classes.AllCategoryContainer}>
                    <Link className={classes.allCategoriesBtn} to="/">˂ Главная</Link>
                    <h2>Категории</h2>
                    <div>
                        <Link  className={classes.OneCategoryItem} to={`/AllCategories/:Categories2/:Categories3/Все специалисты`}>
                            <div className={classes.OneCategoryInfo}>
                                <p className={'OneCategoryTitle'}>Показать всех специалистов</p>
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

export default AllCategoriesScreen;
