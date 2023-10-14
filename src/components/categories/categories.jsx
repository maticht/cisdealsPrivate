import './сategories.css';
import CategoriesJSON from '../../data/categories.json';
import {Link} from "react-router-dom";
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
import food from "../../img/CategoriesLogo/food.png";


function Categories() {
    const categoryList = CategoriesJSON.categories.map((category) =>
        <Link  className={'categoryItem'} to={`/AllCategories/${category.categoriestitle}`}>
            <img className={'categoryImg'} src={
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
            <p className={'categoryTitle'} style={{margin:'10px 0 15px 0'}}>{category.categoriestitle}</p>
        </Link>
    );

    return (
        <div>
            <div style={{margin:'10px 10px'}}>
                <nav className={'categoriesNav'}>
                    <h2 style={{margin:'0'}}>Категории</h2>
                    <Link className={'allCategoriesLink'} to="/AllCategories">Все категории</Link>
                </nav>
            </div>

            <div className={'categories'}>
                <div className={'categoriesBlock'}>
                    {categoryList}
                </div>
            </div>
        </div>
    );
}

export default Categories;


