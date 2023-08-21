import React from 'react';
import {Link} from "react-router-dom";
import arrowRight from "../../img/arrowright.svg";
import './EditProfile.css';

const EditProfile = () => {
    const user = localStorage.getItem("token");
    let localUserObj = JSON.parse(user);
    let UserId = localUserObj.data ? localUserObj.data._id : null;

    return (
        <div className="profile-menu">
            <div className="profile-menu-block">
                <Link to="/" className="menu-link">
                    <p className="menu-link-text">{'< Назад'}</p>
                </Link>
                <h1 className="menu-heading">Редактировать профиль</h1>
                <Link to={`/update/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Личная информация</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
                <Link to={`/updateContactInfo/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Контактная информация</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
                <Link to={`/UpdateSocial/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Социальные сети</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
                <Link to={`/UpdateWorkingHours/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Время работы</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
                <Link to={`/UpdateLocation/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Локация</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
                <Link to={`/UpdateDescription/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Описание</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
                <Link to={`/updateImage/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Изображения</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
                <Link to={`/addServ/${UserId}`} className="menu-item">
                    <div>
                        <p className="menu-item-text">Услуги</p>
                    </div>
                    <img src={arrowRight} alt="Стрелка вправо" />
                </Link>
            </div>
        </div>
    );
}

export default EditProfile;
