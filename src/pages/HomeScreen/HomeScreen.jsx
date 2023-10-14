import React, {useEffect, useState} from "react";
import HeaderNavBar from '../../components/headerNavBar/headerNavBar';
import Categories from '../../components/categories/categories';
import { createUseStyles } from "react-jss";
import {Link} from "react-router-dom";
import SearchExample from "../../components/search/search";
import axios from "axios";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import goldStar from "../../img/goldStar.svg";
import city from "../../img/Map maker.svg";
import './HomeScreen.css';

const useStyles = createUseStyles({
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
});
function HomeScreen() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://backend.delkind.pl/getAllUsers`);
                const filteredUsers = response.data.filter(user => user.rating && user.rating.length > 0 && user.rating[0] !== '');
                const sortedUsers = filteredUsers.sort((a, b) => {
                    const averageRatingA = a.rating.reduce((acc, rating) => acc + rating.value, 0) / a.rating.length;
                    const averageRatingB = b.rating.reduce((acc, rating) => acc + rating.value, 0) / b.rating.length;
                    return averageRatingB - averageRatingA;
                });
                setUsers(response.data);
                localStorage.getItem("token");
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        < >
            <div className={classes.container}>
                <HeaderNavBar />
                <div className={'SearchExampleHome'}>
                    <SearchExample/>
                </div>
                <Categories />
                <div className={'allBestSpecialists'}>
                    <h2>{`Лучшие специалисты`}</h2>
                </div>
                <div className={'allBestSpecialists'}>
                    {users.map((user) => (
                        <div className={'oneBestSpecialistsBlock'} key={user.id}>
                            <Link className="link-wrapper" to={`/AllCategories/Categories2/Categories3/Categories4/Все специалисты/${user._id}`}>
                                <div className="user-container">
                                    <div className="user-image-container">
                                        {(!user.image || user.image.length === 0 ? (
                                            <img className="user-image" src={noneUserLogo} alt="userImage" />
                                        ) : (
                                            <div className="user-image">
                                                {user.image && <img src={user.image[0]} alt="User Image" />}
                                            </div>
                                        ))}
                                        {user.rating && user.rating.length > 0 && user.rating[0] !== '' && (
                                            <div className="rating-container">
                                                <img className="rating-star" src={goldStar} alt="star" />
                                                <p className="rating-value">
                                                    {(user.rating.reduce((acc, rating) => acc + rating.value, 0) / user.rating.length).toFixed(1)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="user-info-container">
                                        <div>
                                            <p className="user-name">{user.nameOrCompany}</p>
                                            <p className="user-activity">
                                                {user.areasActivity === 'areasActivity' || user.areasActivity === '' ? 'Услуги не добавлены' :
                                                    user.areasActivity.length > 28 ? `${user.areasActivity.slice(0, 28)}...` : user.areasActivity
                                                }
                                            </p>
                                        </div>
                                        <div className="location-container">
                                            <img className="location-image" src={city} alt="city" />
                                            <p className="location-text">
                                                {user.city === "city" ? 'Польша' : user.region === "region" ? `${user.city}` : `${user.city}, ${user?.region}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomeScreen;
