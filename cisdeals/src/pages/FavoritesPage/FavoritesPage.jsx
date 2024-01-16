import React, {useEffect, useState} from 'react';
import PersonalUserPage from "../PersonalUserPage/PersonalUserPage";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import city from "../../img/Map maker.svg";
import {getFavoritesUsers} from "../../httpRequests/cisdealsApi";
import goldStar from "../../img/goldStar.svg";
import back from "../../img/Arrow_left.svg";

const FavoritesPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const userLS = localStorage.getItem("token");
    const favoriteUsers = JSON.parse(userLS);
    useEffect(() => {
        const fetchUsers = async () => {
            const queryParams = { ids: favoriteUsers.data.savedUsers.join(',') };
            const response = await getFavoritesUsers(queryParams);
            console.log(response)
            setUsers(response);
            console.log(favoriteUsers.data.savedUsers.join(','))
        };
        fetchUsers();
    }, []);
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <div style={{minHeight: "100vh",
            backgroundColor: "#F1F1F1"
        }}>
            <div className={'favoritesHeaderBlock'}>
                <Link className="form-update-link" style={{margin:'20px 0 10px 0'}} to="/">
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <h1 style={{margin: '0 0 0'}}>Избранные</h1>
                <h6 style={{margin: '5px 0 20px 0'}}>{`В избранных ${users?.length} специалистов`}</h6>
            </div>
            <div className={users.length <= 2 ? 'allMiniFavoritesSpecialists' : 'allFavoritesSpecialists'}>
                {users.map((user) => (
                    <div className={users.length === 1 ? 'onlyOneBestSpecialistsBlock' : 'oneBestSpecialistsBlock'}
                         key={user.id}>
                        <Link className="link-wrapper"
                              to={`/AllCategories/Categories2/Categories3/Categories4/Все специалисты/${user._id}`}>
                            <div className="user-container">
                                <div className="user-image-container">
                                    {(!user.image || user.image.length === 0 ? (
                                        <img className="user-image" src={noneUserLogo} alt="userImage"/>) : (
                                        <div className="user-image">
                                            {user.image && <img src={user.image[0]} alt="User Image"/>}
                                        </div>))}
                                    {user.rating && user.rating.length > 0 && user.rating[0] !== '' && (
                                        <div className="rating-container">
                                            <img className="rating-star" src={goldStar} alt="star"/>
                                            <p className="rating-value">
                                                {(user.rating.reduce((acc, rating) => acc + rating.value, 0) / user.rating.length).toFixed(1)}
                                            </p>
                                        </div>)}
                                </div>
                                <div className="user-info-container">
                                    <div>
                                        <p className="user-name">{user.nameOrCompany}</p>
                                        <p className="user-activity">
                                            {user.areasActivity === 'areasActivity' || user.areasActivity === '' ?
                                                'Услуги не добавлены'
                                                : user.areasActivity.length > 28 ? `${user.areasActivity.slice(0, 28)}...` : user.areasActivity
                                            }
                                        </p>
                                    </div>
                                    <div className="location-container">
                                        <img className="location-image" src={city} alt="city"/>
                                        <p className="location-text">
                                            {user.city === "city" ?
                                                'Польша'
                                                : user.region === "region" ? `${user.city}` : `${user.city}, ${user?.region}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;
