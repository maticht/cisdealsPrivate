import React from 'react';
import CategoriesJSON from '../../data/cities.json';
import arrow from "../../img/arrowright.svg";
import {Link} from "react-router-dom";
import back from "../../img/Arrow_left.svg";
import './modalCities.css'


const Modal = ({ isOpen, onClose, handleModalResult }) => {
    if (!isOpen) return null;
    const handleSave = (result) => {
        handleModalResult(result);
        onClose();
    };

    const citiesList = CategoriesJSON.cities.map((city) =>
        <div onClick={() => handleSave(city.title)} className={'OneCategoryScreenItem'}>
            <p className={'OneCategoryTitle'}>{city.title}</p>
            <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
        </div>
    );

    return (
        <div onClick={onClose} className={'modalCitiesContainer'}>
            <div className={'AllCategoryScreenContainer'}>
                <Link className="form-update-link" onClick={onClose}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <p className="form-prsnl-heading">Выберете город</p>
                <div className={'AllCategoryScreenBlock'}>
                    <div onClick={() => handleSave("Польше")} className={'OneCategoryScreenItem'}>
                        <p className={'OneCategoryTitle'}>Во всей Польше</p>
                        <img className={'OneCategoryScreenItemImg'} src={arrow} alt={'logo'}/>
                    </div>
                    {citiesList}
                </div>
            </div>
        </div>
    );

};

export default Modal;


