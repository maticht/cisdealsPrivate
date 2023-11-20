import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {updateProfile, userProfile, viewServices} from "../../../httpRequests/cisdealsApi";
import styles from "../styles.module.css";
import check from "../../../img/VectorCheck.svg"
import beauty from "../../../img/CategoriesLogo/beauty.svg";
import sport from "../../../img/CategoriesLogo/sport.svg";
import health from "../../../img/CategoriesLogo/health.svg";
import auto from "../../../img/CategoriesLogo/auto.svg";
import finance from "../../../img/CategoriesLogo/finance.svg";
import animals from "../../../img/CategoriesLogo/animals.svg";
import study from "../../../img/CategoriesLogo/study.svg";
import photo from "../../../img/CategoriesLogo/photo.svg";
import ads from "../../../img/CategoriesLogo/ads.svg";
import design from "../../../img/CategoriesLogo/design.svg";
import programming from "../../../img/CategoriesLogo/programming.svg";
import logistics from "../../../img/CategoriesLogo/logistics.svg";
import house from "../../../img/CategoriesLogo/house.svg";
import build from "../../../img/CategoriesLogo/build.svg";
import party from "../../../img/CategoriesLogo/party.svg";
import food from "../../../img/CategoriesLogo/food.png";
import back from "../../../img/Arrow_left.svg";
import CategoriesJSON from "../../../data/categories.json";
import './addServCategories.css'

const AddServCategories = () => {
    const {UserPage} = useParams();
    const navigate = useNavigate();
    const [selectedServices, setSelectedServices] = useState([]);
    const [serv, setServ] = useState([]);
    const [errorServ, setErrorServ] = useState("");
    const [modalServvIsOpen, setModalServvIsOpen] = useState(false);
    const [selectedServv, setSelectedServv] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [servicesString, setServicesString] = useState('');
    const [selectedServicess, setSelectedServicess] = useState([]);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        nameOrCompany: "",
        areasActivity: "",
        phone1: "",
        phone2: "",
        image: [],
        Facebook: "",
        TikTok: "",
        YouTube: "",
        Instagram: "",
        WhatsApp: "",
        Telegram: "",
        Viber: "",
        LinkedIn: "",
        city: "",
        region: "",
        street: "",
        house: "",
        apartment: "",
        zip: "",
        workLocation: '',
        description: "",
        services: "",
        price: "",
        savedUsers: [],
        likes: "",
        rating: "",
    });
    const [userDataForAreasActivity, setUserDataForAreasActivity] = useState({
        firstName: "",
        lastName: "",
        password: "",
        nameOrCompany: "",
        areasActivity: "",
        phone1: "",
        phone2: "",
        image: [],
        Facebook: "",
        TikTok: "",
        YouTube: "",
        Instagram: "",
        WhatsApp: "",
        Telegram: "",
        Viber: "",
        LinkedIn: "",
        city: "",
        region: "",
        street: "",
        house: "",
        apartment: "",
        zip: "",
        workLocation: '',
        description: "",
        services: "",
        price: "",
        savedUsers: [],
        likes: "",
        rating: "",
    });

    const fetchUserServicess = async (userId) => {
        try {
            const data = await viewServices(UserPage);
            setServ(data)
            const servicesString = await data.map(service => [service.title, service.parent]).reduce((acc, curr) => {
                if (!acc.includes(curr.join())) {
                    acc.push(curr.join());
                }
                return acc;
            }, []).join(', ').toString();
            setUserData({...userData, services: servicesString});
            await updateProfile(UserPage, userData);
        } catch (err) {
            console.log(err)
        }
    };
    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(userId);
            if (data.profile.areasActivity !== 'areasActivity') {
                console.log('del er act');
                setSelectedServv(data.profile.areasActivity);
                setSelectedUser(data.profile);
                setSelectedServicess(data.profile.areasActivity.split(' / '));
                console.log(selectedServices);
            }
            console.log(selectedServices);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchUserServicess(UserPage);
        fetchUserProfile(UserPage);
    }, []);

    useEffect(() => {
        sendDataToServer();
    }, [servicesString]);
    const sendDataToServer = async () => {
        const updatedServ = await viewServices(UserPage);
        setServ(updatedServ);
        const servicesStr = updatedServ.map(service => [service.title, service.parent]).reduce((acc, curr) => {
            if (!acc.includes(curr.join())) {
                acc.push(curr.join());
            }
            return acc;
        }, []).join(', ').toString();
        setServicesString(servicesStr);
        await updateProfile(UserPage, {...userData, services: servicesString});
    };
    const handleServiceCheckboxChangeServ = (event, optionTitle) => {
        if (event.target.checked) {
            if (selectedServicess.length < 3) {
                setSelectedServicess([...selectedServicess, optionTitle]);
            }
        } else {
            setSelectedServicess(selectedServicess.filter((title) => title !== optionTitle));
        }
    };
    const handleServicesConfirmationServ = async () => {
        setUserDataForAreasActivity({...userDataForAreasActivity, areasActivity: selectedServicess.join(" / ")});
        console.log(userData)
        setSelectedServv(selectedServicess.join(" / "));
        setModalServvIsOpen(false);
        const res = await updateProfile(UserPage, {...userDataForAreasActivity, areasActivity: selectedServicess.join(" / ")});
        localStorage.setItem("token", JSON.stringify(res));
        fetchUserServicess(UserPage, userData);
        navigate(`/addServ/${UserPage}`);
    };

    return (
        <div className={'servCategoriesBlock'}>
            <div className={'servCategoriesForm'}>
                <Link className="form-update-link" to={`/addServ/${UserPage}`}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <div className={'servCategoriesHead'}>
                    <p className="form-heading">Выберите категории</p>
                    <p className={'servCategoriesHeadText'}>{`${selectedServicess.length}/3`}</p>
                </div>
                <div>
                    <div className={'servCategoriesList'}>
                        {CategoriesJSON.categories.map((option, index) => (
                            <div className={'oneCategoryCheckItemServ'}
                                 style={{borderBottom: index !== CategoriesJSON.categories.length - 1 ? '1px solid #DDDDDD' : 'none'}}
                                 key={option.categoriestitle}>
                                <div className={'oneCategoryCheckItemInfo'}>
                                    <input
                                        type="checkbox"
                                        id={option.categoriestitle}
                                        name={option.categoriestitle}
                                        style={{display: 'none'}}
                                        value={option.categoriestitle}
                                        onChange={(event) => handleServiceCheckboxChangeServ(event, option.categoriestitle)}
                                        checked={selectedServicess.includes(option.categoriestitle)}
                                        disabled={
                                            selectedServicess.length >= 3 &&
                                            !selectedServicess.includes(option.categoriestitle)
                                        }
                                    />
                                    <label className={'oneCategoryCheckBox'}
                                           style={{
                                               border: selectedServicess.length >= 3 && !selectedServicess.includes(option.categoriestitle) ? '#A3A3A3 solid 2px' : '#000 solid 2px',
                                               backgroundColor: selectedServicess.includes(option.categoriestitle) ? 'black' : 'white',
                                               color: selectedServicess.includes(option.categoriestitle) ? 'white' : 'black',
                                            }}
                                           htmlFor={option.categoriestitle}>
                                        <img src={check}/>
                                    </label>
                                    <label className={'oneCategoryCheckBoxInfo'} htmlFor={option.categoriestitle}>
                                        {option.categoriestitle}
                                    </label>
                                </div>
                                <img className={'servCategoryImg'}
                                     style={{filter: selectedServicess.includes(option.categoriestitle) ? 'none' : 'grayscale(100%)',}}
                                     src={(option.categoriestitle === "Красота и уход") ?
                                        beauty : (option.categoriestitle === "Спорт") ?
                                        sport : (option.categoriestitle === "Здоровье") ?
                                        health : (option.categoriestitle === "Авто") ?
                                        auto : (option.categoriestitle === "Финансы и законы") ?
                                        finance : (option.categoriestitle === "Животные") ?
                                        animals : (option.categoriestitle === "Образование") ?
                                        study : (option.categoriestitle === "Фото, видео, аудио") ?
                                        photo : (option.categoriestitle === "Продвижение и реклама") ?
                                        ads : (option.categoriestitle === "Дизайн и проектирование") ?
                                        design : (option.categoriestitle === "Разработка") ?
                                        programming : (option.categoriestitle === "Транспорт и логистика") ?
                                        logistics : (option.categoriestitle === "Помощь по дому") ?
                                        house : (option.categoriestitle === "Строительство и ремонт") ?
                                        build : (option.categoriestitle === "Развлечения и мероприятия") ?
                                        party : (option.categoriestitle === "Еда") ?
                                        food : option.imgId
                                     }
                                     alt="image not found"
                                />
                            </div>
                        ))}
                    </div>
                    {errorServ && <div className={styles.error_msg}>{errorServ}</div>}
                    <button className={'ConfirmationServBtn'}
                            onClick={handleServicesConfirmationServ}>
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddServCategories;
