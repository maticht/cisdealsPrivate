import React, {useEffect, useState, useRef} from "react";
import HeaderNavBar from '../../components/headerNavBar/headerNavBar';
import {createUseStyles} from "react-jss";
import {Link, useParams} from "react-router-dom";
import Modal from "../../components/madalCities/modalCities";
import SearchExample from "../../components/search/search";
import noneUserLogo from '../../img/noneUserLogoSq.svg'
import city from '../../img/Map maker.svg'
import meditating from '../../img/meditating 1.svg'
import goldStar from '../../img/goldStar.svg'
import {getAllUsers} from "../../httpRequests/cisdealsApi";
import CategoriesJSON from '../../data/categories.json';

function SortedServicesScreen() {
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    const {Categories4} = useParams();
    const {SortedCategories} = useParams();
    const containerRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalResult, setModalResult] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                let sortedUsers = response;
                console.log(sortedUsers)
                console.log(SortedCategories)

                if (modalResult && modalResult !== "Польше") {
                    sortedUsers = sortedUsers.filter((user) => user.city === modalResult);
                }
                const countMatches = (service, SortedCategories) => {
                    // Remove spaces from both service and SortedCategories
                    const lowerService = service.replace(/\s/g, '').toLowerCase();
                    const lowerCategory = SortedCategories.replace(/\s/g, '').toLowerCase();

                    return lowerService.split("").filter((char, i) => char === lowerCategory.charAt(i)).length;
                };

                sortedUsers = sortedUsers.filter((user) => {
                    const serviceMatches = user.services.split(",").map((service) => countMatches(service, SortedCategories));
                    return serviceMatches.some((matches) => matches >= 4);


                    // sortedUsers.sort((userA, userB) => {
                    //     const serviceMatchesA = userA.services.split(",").map((service) => countMatches(service, SortedCategories));
                    //     const serviceMatchesB = userB.services.split(",").map((service) => countMatches(service, SortedCategories));
                    //     return serviceMatchesB.reduce((acc, cur) => acc + cur) - serviceMatchesA.reduce((acc, cur) => acc + cur);
                    // });
                    //
                    // const categoryInfo = CategoriesJSON.find((category) => category.categoriestitle === SortedCategories);
                    // if (categoryInfo && categoryInfo.subcategories) {
                    //     categoryInfo.subcategories.forEach((subcategory) => {
                    //         sortedUsers = sortedUsers.filter((user) => user.services.includes(subcategory.title));
                    //     });
                    // }
                });
                setUsers(sortedUsers);
                localStorage.getItem("token");
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [SortedCategories, modalResult]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (containerRef.current) {
            if (modalOpen) {
                containerRef.current.style.overflow = 'hidden';
                containerRef.current.style.position = 'fixed';
            } else {
                containerRef.current.style.overflow = 'auto';
                containerRef.current.style.position = 'static';
            }
        }
    }, [modalOpen]);

    useEffect(()=>{
        console.log(users)
    }, [users])

    const handleModalResult = (result) => {
        setModalResult(result);
    };

    return (
        <>
            <div className={'selectFilterContainer'} ref={containerRef}>
                <HeaderNavBar/>
                <div className={'SearchExampleHome'}>
                    <SearchExample/>
                </div>
                <div className={'selectFilterBlock'}>
                    <Link className={'locationSelect'} onClick={handleOpenModal}>
                        <div>Изменить локацию</div>
                    </Link>
                    <Link className={'locationSelect'} to={`/AllCategories`}>
                        <div>Изменить категорию</div>
                    </Link>
                </div>
                <div>
                    <Modal isOpen={modalOpen} onClose={handleCloseModal} handleModalResult={handleModalResult}/>
                </div>
                <div className={'allBestSpecialistsTitle'}>
                    <h2>{`${(!SortedCategories) ? 'Все специалисты' : SortedCategories} в ${(!modalResult) ? 'Польше' : modalResult}`}</h2>
                </div>
                {isLoading ? null : (
                    <div className={'selectFilterUsers'}>
                        {users.length !== 0 ? (
                            <div>
                                <h6>{`Найденно ${users.length} специалистов`}</h6>
                                <div
                                    className={users.length <= 2 ? 'allMiniBestSortedSpecialists' : 'allBestSortedSpecialists'}>
                                    {users.map((user) => (
                                        <div
                                            className={users.length === 1 ? 'onlyOneBestSpecialistsBlock' : 'oneBestSpecialistsBlock'}
                                            key={user.id}>
                                            <Link className="link-wrapper"
                                                  to={`/UserPageScreen/${user._id}`}>
                                                <div className="user-container">
                                                    <div className="user-image-container">
                                                        {(!user.image || user.image.length === 0 ? (
                                                            <img className="user-image" src={noneUserLogo}
                                                                 alt="userImage"/>) : (
                                                            <div className="user-image">
                                                                {user.image &&
                                                                    <img src={user.image[0]} alt="User Image"/>}
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
                                                                        `${user.services.split(",").filter((service, i, arr) => arr.indexOf(service) === i).join(", ").slice(0, (window.innerWidth <= 360 ? 40 : window.innerWidth <= 540 ? 82 : window.innerWidth <= 700 ? 40 : 82))}...`
                                                                        : user.services.split(",").filter((service, i, arr) => arr.indexOf(service) === i).join(", ")
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
                        ) : (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                alignSelf: 'center',
                                margin: '100px auto 0'
                            }}>
                                <img src={meditating} alt={'Здесь ещё нет специалистов'}/>
                                <h3 style={{}}>Здесь ещё нет специалистов</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default React.memo(SortedServicesScreen);
