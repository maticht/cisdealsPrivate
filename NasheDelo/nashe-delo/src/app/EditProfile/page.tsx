"use client";
import React from 'react';
import Link from "next/link";
import arrowRight from "../../img/arrowright.svg";
import './EditProfile.css';
import back from "../../img/Arrow_left.svg";
import Image from "next/image";

const EditProfile = () => {
    const user = localStorage.getItem("token");
    // @ts-ignore
    let localUserObj = JSON.parse(user);
    console.log(localUserObj)
    let UserId = localUserObj.data ? localUserObj.data._id : null;

    return (
        <div className="profile-menu">
            <div className="profile-menu-block">
                <Link className="menu-link" href={`/PersonalUserPage/${UserId}`}>
                    <Image src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <h1 className="menu-heading">Редактировать профиль</h1>
                <div className="profile-links-block">
                    <Link href={`/updatePersonal/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Личная информация</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                    <Link href={`/updateContactInfo/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Контактная информация</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                    <Link href={`/UpdateSocial/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Социальные сети</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                    <Link href={`/UpdateWorkingHours/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Время работы</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                    <Link href={`/UpdateLocation/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Локация</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                    <Link href={`/UpdateDescription/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Описание</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                    <Link href={`/updateImage/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Изображения</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                    <Link href={`/addServ/${UserId}`} className="menu-item">
                        <div>
                            <p className="menu-item-text">Услуги</p>
                        </div>
                        <Image src={arrowRight} alt="Стрелка вправо" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
