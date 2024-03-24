"use client";
import React, {useEffect, useState} from "react";
import './PersonalUserPage.css';
import exit from "../../../img/exit.svg";
import share from "../../../img/share.svg";
import arrowRight from "../../../img/arrowright.svg";
import edit from "../../../img/Edit.svg";
import support from "../../../img/support.svg";
import save from "../../../img/save.svg";
import noneUserLogo from "../../../img/noneUserLogoSq.svg";
import userPage from "../../../img/userPage.svg"
import {userProfile} from "@/httpRequests/cisdealsApi";
import back from "../../../img/Arrow_left.svg";
import Link from "next/link";
import Image from "next/image";
type Props = {
    params: {
        id: any;
    }
};
const Page = ({params: {id}}: Props) => {
    const [user, setUser] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const user1 = localStorage.getItem("token");
    let localUserObj = null;
    let UserId = null;

    if (user1) {
        try {
            localUserObj = JSON.parse(user1);
            UserId = localUserObj?.data?._id || null;
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }

    // @ts-ignore
    const fetchUserProfile = async (userId) => {
        try {
            const response = await userProfile(userId);
            setUser(response.profile);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchUserProfile(id);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        // @ts-ignore
        window.history.pushState(null, null, "/");
        window.location.reload();
    };
    const copyLinkToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 800);
    };

    return (
        <div className='main-personal-container'>
            <div className="header-container">
                <div>
                    <Link className="form-update-link" href="/">
                        <Image src={back} alt="back" />
                        <p>Главная</p>
                    </Link>
                    <div className="user-info-wrapper">
                        <div className="user-info">
                            {!user?.image || user?.image.length === 0 ? (
                                <Image width={20} height={20} className="user-avatar" src={noneUserLogo} alt="userImage"/>
                            ) : (
                                <img className="user-avatar" src={user.image[0]} alt="userImage"/>
                            )}
                            <div className="user-details">
                                <p className="user-greeting">Здравствуйте, </p>
                                <p className="user-nameOrCompany">{`${user?.nameOrCompany}`}</p>
                            </div>
                        </div>
                        <div className="copy-link-container" onClick={copyLinkToClipboard}>
                            <p className={`copy-text ${isCopied ? 'active' : ''}`}>{isCopied ? 'Скопировано!' : null}</p>
                            <Image  width={20} height={20} className="copy-icon" src={share} alt="share" />
                        </div>
                    </div>
                    <div className="profile-links-block">
                        <Link href={`/EditProfile`} className="profile-link">
                            <div className="link-content">
                                <Image width={22} height={22} className="link-image" src={edit} alt="Редактировать профиль" />
                                <p className="link-text">Редактировать профиль</p>
                            </div>
                            <Image width={20} height={20} src={arrowRight} alt=">" />
                        </Link>
                        <Link href={`/UserPageScreen/${UserId}`} className="profile-link">
                            <div className="link-content">
                                <Image width={22} height={22} className="link-image" src={userPage} alt="Перейти на свою страницу" />
                                <p className="link-text">Перейти на свою страницу</p>
                            </div>
                            <Image width={20} height={20} src={arrowRight} alt=">" />
                        </Link>
                        <Link href="/FavoritesPage" className="profile-link">
                            <div className="link-content">
                                <Image width={22} height={22} className="link-image" src={save} alt="Избранные" />
                                <p className="link-text">Избранные</p>
                            </div>
                            <Image width={20} height={20} src={arrowRight} alt=">" />
                        </Link>
                        <Link href={`/ContactDeveloper`} className="profile-link">
                            <div className="link-content">
                                <Image width={22} height={22} className="link-image" src={support} alt="Поддержка" />
                                <p className="link-text">Поддержка</p>
                            </div>
                            <Image width={20} height={20} src={arrowRight} alt=">" />
                        </Link>
                        <Link href={'/'} onClick={handleLogout} className="profile-link">
                            <Image width={22} height={22} className="logout-icon" src={exit} alt="logo" />
                            <p className="logout-text">Выйти</p>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;


