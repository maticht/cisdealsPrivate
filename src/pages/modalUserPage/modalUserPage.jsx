import React, {useEffect, useState} from "react";
import './modalUserPage.css';
import {createUseStyles} from "react-jss";
import exit from "../../img/exit.svg";
import share from "../../img/share.svg";
import arrowRight from "../../img/arrowright.svg";
import edit from "../../img/Edit.svg";
import support from "../../img/support.svg";
import save from "../../img/save.svg";
import {Link, useParams} from "react-router-dom";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import userPage from "../../img/userPage.svg"
import axios from "axios";

const useStyles = createUseStyles({
    container: {
        width: "100%",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

const Modal = () => {
    const {UserPage} = useParams();
    const classes = useStyles();
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

    const fetchUserProfile = async (userId) => {
        try {
            const {data} = await axios.get(`http://backend.delkind.pl/user-profile/${userId}`);
            setUser(data.profile);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchUserProfile(UserPage);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
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
        <div className={classes.container}>
            <div className="header-container">
                <div>
                    <Link className="header-link" to="/">˂ Главная</Link>
                    <div className="user-info-wrapper">
                        <div className="user-info">
                            {!user.image || user.image.length === 0 ? (
                                <img className="user-avatar" src={noneUserLogo} alt="userImage"/>
                            ) : (
                                <img className="user-avatar" src={user.image[0]} alt="userImage"/>
                            )}
                            <div className="user-details">
                                <p className="user-greeting">Здравствуйте, </p>
                                <p className="user-nameOrCompany">{`${user.nameOrCompany}`}</p>
                            </div>
                        </div>
                        <div className="copy-link-container" onClick={copyLinkToClipboard}>
                            <p className={`copy-text ${isCopied ? 'active' : ''}`}>{isCopied ? 'Скопировано!' : null}</p>
                            <img className="copy-icon" src={share} alt="share" />
                        </div>
                    </div>
                    <div>
                        <Link to={`/EditProfile`} className="profile-link">
                            <div className="link-content">
                                <img className="link-image" src={edit} alt="Редактировать профиль" />
                                <p className="link-text">Редактировать профиль</p>
                            </div>
                            <img src={arrowRight} alt="Стрелка вправо" />
                        </Link>
                        <Link to={`/UserPageScreen/${UserId}`} className="profile-link">
                            <div className="link-content">
                                <img className="link-image" src={userPage} alt="Перейти на свою страницу" />
                                <p className="link-text">Перейти на свою страницу</p>
                            </div>
                            <img src={arrowRight} alt="Стрелка вправо" />
                        </Link>
                        <Link to="/FavoritesPage" className="profile-link">
                            <div className="link-content">
                                <img className="link-image" src={save} alt="Избранные" />
                                <p className="link-text">Избранные</p>
                            </div>
                            <img src={arrowRight} alt="Стрелка вправо" />
                        </Link>
                        <Link to={`/ContactDeveloper`} className="profile-link">
                            <div className="link-content">
                                <img className="link-image" src={support} alt="Поддержка" />
                                <p className="link-text">Поддержка</p>
                            </div>
                            <img src={arrowRight} alt="Стрелка вправо" />
                        </Link>
                    </div>
                </div>
                <Link to={'/'} onClick={handleLogout} className="logout-link">
                    <img className="logout-icon" src={exit} alt="logo" />
                    <p className="logout-text">Выйти</p>
                </Link>
            </div>
        </div>
    );
};

export default Modal;


