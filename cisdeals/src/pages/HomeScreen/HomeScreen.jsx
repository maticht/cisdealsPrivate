import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getAllUsers} from "../../httpRequests/cisdealsApi";
import HeaderNavBar from '../../components/headerNavBar/headerNavBar';
import Categories from '../../components/categories/categories';
import SearchExample from "../../components/search/search";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import goldStar from "../../img/goldStar.svg";
import city from "../../img/Map maker.svg";
import './HomeScreen.css';

function HomeScreen() {
    const [users, setUsers] = useState([]);
    const [ serviceCharactersNumber, setServiceCharactersNumber] = useState(82);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                getAllUsers().then(data => setUsers(data));
                const filteredUsers = users.filter(user => user.rating && user.rating.length > 0 && user.rating[0] !== '');
                const sortedUsers = filteredUsers.sort((a, b) => {
                    const averageRatingA = a.rating.reduce((acc, rating) => acc + rating.value, 0) / a.rating.length;
                    const averageRatingB = b.rating.reduce((acc, rating) => acc + rating.value, 0) / b.rating.length;
                    return averageRatingB - averageRatingA;
                });
                setUsers(sortedUsers);
                localStorage.getItem("token");
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);


    return (< >
        <div className={'HomeContainer'}>
            <HeaderNavBar/>
            <div className={'SearchExampleHome'}>
                <SearchExample/>
            </div>
            <Categories/>
            <div className={'allBestSpecialists'}>
                <h2>{`Лучшие специалисты`}</h2>
            </div>
            <div className={'allBestSpecialists'}>
                {users.map((user) => (<div className={'oneBestSpecialistsBlock'} key={user.id}>
                    <Link className="link-wrapper"
                          to={`/UserPageScreen/${user._id}`} rel="nofollow">
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
                                        {user.services === 'services' || user.services === '' ?
                                            'Услуги не добавлены'
                                            : user.services.length > (window.innerWidth <= 360 ? 40 : window.innerWidth <= 540 ? 82 : window.innerWidth <= 700 ? 40 : 82) ?
                                                `${user.services.slice(0, (window.innerWidth <= 360 ? 40 : window.innerWidth <= 540 ? 82 : window.innerWidth <= 700 ? 40 : 82))}...`
                                                : user.services
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
                </div>))}
            </div>
        </div>
    </>);
}

export default HomeScreen;
