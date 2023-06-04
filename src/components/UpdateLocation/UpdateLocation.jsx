import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalUserPage from "../modalUserPage/modalUserPage";
import {createUseStyles} from "react-jss";
import CategoriesJSON from '../../data/categories.json';
import CitiesJSON from '../../data/cities.json';
import arrow from '../../img/arrowright.svg';
import beauty from '../../img/CategoriesLogo/beauty.svg';
import sport from '../../img/CategoriesLogo/sport.svg';
import health from '../../img/CategoriesLogo/health.svg';
import auto from '../../img/CategoriesLogo/auto.svg'
import finance from '../../img/CategoriesLogo/finance.svg'
import animals from '../../img/CategoriesLogo/animals.svg';
import photo from '../../img/CategoriesLogo/photo.svg';
import study from '../../img/CategoriesLogo/study.svg';
import ads from '../../img/CategoriesLogo/ads.svg';
import design from '../../img/CategoriesLogo/design.svg';
import programming from '../../img/CategoriesLogo/programming.svg';
import logistics from '../../img/CategoriesLogo/logistics.svg';
import house from '../../img/CategoriesLogo/house.svg';
import build from '../../img/CategoriesLogo/build.svg';
import party from '../../img/CategoriesLogo/party.svg';
import arrowDown from '../../img/arrow_down=24.png';

const useStyles = createUseStyles({
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    },
    modal: {
        paddingLeft:'10px',
        backgroundColor: '#f5f5f5',
        width: "100%",
        height: "100%",
        overflow: "auto"
    },
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
    allCategoriesBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
    },
    AllCategoryContainer: {
        margin: "0 2vw",
        padding: "15px 0 40px 0",
    },
    OneCategoryInfo: {
        display: "flex",
        textDecoration:'none',
        flexDirection: "row",
    },
    OneCategoryImg: {
        width: "60px",
        marginRight: "10px",
    },
    OneCategoryItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "5px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",

    },
    OneCategoryCity: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "#000000",

    },
    OneCategoryCheckItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "15px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginRight:'10px'
    }

});


const UpdateLocation = () => {
    const {UserPage} = useParams();
    const [data, setData] = useState({
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
    const [error, setError] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [modalCitiesIsOpen, setModalCitiesIsOpen] = useState(false);
    const [modalRegionIsOpen, setModalRegionIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedServ, setSelectedServ] = useState("");
    const [selectedCities, setSelectedCities] = useState("");

    const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);

    // Получение доступа к объекту CategoriesJSON.categories
    const categories = CategoriesJSON.categories;
    //
    // // Поиск элемента с выбранным значением selectedOption по параметру categoriesTitle
    // const selectedCategory = categories.find((category) => category.categoriestitle === selectedOption);
    //
    // // Создание нового массива, содержащего найденный элемент
    // const newSelectedCategoryArray = [selectedCategory];
    //
    // // Обновление состояния с помощью setSelectedCategoryArray
    // setSelectedCategoryArray(newSelectedCategoryArray);
    const classes = useStyles();


    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        let value = input.value;
        if (input.name === "zip" && value.length === 2 && !value.includes("-")) {
            value = `${value}-`;
        }
        setData({ ...data, [input.name]: value });
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSelectedServices([]);
        setData({ ...data, areasActivity: option });
        setModalIsOpen(false);
    };
    const handleOptionServClick = (option) => {
        setSelectedServ(option);
        setData({ ...data, services: option });
        setModalServIsOpen(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const { data: res } = await axios.put(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            navigate("/EditProfile");
            console.log(data);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    const handleServiceCheckboxChange = (event, optionTitle) => {
        if (event.target.checked) {
            setSelectedServices([...selectedServices, optionTitle]);
        } else {
            setSelectedServices(selectedServices.filter((title) => title !== optionTitle));
        }
    };

    // const handleServicesConfirmation = () => {
    //     setData({ ...data, services: selectedServices.join(", ") });
    //     setSelectedServ(selectedServices.join(", "));
    //     setModalServIsOpen(false);
    // };
    const handleCitiesClick = (city) => {
        setSelectedCities(city);
        setData({ ...data, city: city });
        setModalCitiesIsOpen(false);
    };
    const handleRegionsClick = (region) => {
        setSelectedServ(region);
        setData({ ...data, region: region });
        setModalServIsOpen(false);
    };


    const handleOpenModal = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    };

    const handleOpenServModal = (e) => {
        e.preventDefault();
        setModalServIsOpen(true);
    };
    const handleOpenCitiesModal = (e) => {
        e.preventDefault();
        setModalCitiesIsOpen(true);
    };
    const buttonStyles = selectedCities.length === 0 ? { opacity: 0.5, pointerEvents: 'none' } : {};



    return (
        <div className={styles.signup_container}>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to="/EditProfile">
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <h1 style={{margin:"0 0 0 10px"}}>Изменение Локации</h1>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>
                    <div>
                        <h5 style={{margin:"10px 0 5px 0"}}>Город</h5>
                        <button className={styles.inputBtn} onClick={handleOpenCitiesModal} >
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <p style={{margin:'0px'}}>{selectedCities || "Выбрать город"}</p>
                                <img style={{width:'15px'}} src={arrowDown} alt={'>'}/>
                            </div>
                        </button>
                        <div>
                            {modalCitiesIsOpen && (
                                <div className={classes.overlay}>
                                    <div className={classes.modal}>
                                        <p onClick={() => setModalCitiesIsOpen(false)} style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                                            {`< Назад`}
                                        </p>
                                        <h2>Выберите Город</h2>
                                        <div>

                                            {CitiesJSON.cities.map((city) =>
                                                <Link style={{textDecoration:'none'}} onClick={() => {handleCitiesClick(city.title); setSelectedCities(city.title)}}>
                                                    <div style={{textDecoration:'none'}} className={classes.OneCategoryItem}>
                                                        <p key={city.title} className={classes.OneCategoryInfo} style={{textDecoration:'none'}}>{city.title}</p>
                                                        <img className={classes.OneCategoryImg} style={{width:'22px'}} src={arrow} alt={'logo'}/>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <h5 style={{margin:"10px 0 5px 0"}}>Район</h5>
                        <button className={styles.inputBtn} style={buttonStyles} onClick={handleOpenServModal} >
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <p style={{margin:'0px'}}>{selectedServ || "Выбрать район"}</p>
                                <img style={{width:'15px'}} src={arrowDown} alt={'>'}/>
                            </div>
                        </button>
                        {modalServIsOpen && (
                            <div className={classes.overlay}>
                                <div className={classes.modal}>
                                    <p onClick={() => setModalServIsOpen(false)} style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                                        {`< Назад`}
                                    </p>
                                    <h2>Выберите Район</h2>
                                    <div>
                                        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                                            {selectedCities !== "" &&
                                                CitiesJSON.cities.find((category) => category.title === selectedCities).areas.map((option) => (
                                                <Link style={{textDecoration:'none'}} onClick={() => {handleRegionsClick(option.title); }}>
                                                    <div style={{textDecoration:'none'}} className={classes.OneCategoryItem}>
                                                        <p key={option.title} className={classes.OneCategoryInfo} style={{textDecoration:'none'}}>{option.title}</p>
                                                        <img className={classes.OneCategoryImg} style={{width:'22px'}} src={arrow} alt={'logo'}/>
                                                    </div>
                                                </Link>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <h5 style={{margin:"10px 0 5px 0"}}>Улица</h5>
                        <input
                            type="text"
                            placeholder="Mokotowska"
                            name="street"
                            onChange={handleChange}
                            value={data.street}
                            required
                            className={styles.input}
                        />
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <h5 style={{margin:"10px 0 5px 0"}}>Дом</h5>
                                <input
                                    type="text"
                                    placeholder="0000"
                                    name="house"
                                    onChange={handleChange}
                                    value={data.house}
                                    required
                                    className={styles.rowInput}
                                />
                            </div>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <h5 style={{margin:"10px 0 5px 0"}}>Квартира</h5>
                                <input
                                    type="text"
                                    placeholder="0000"
                                    name="apartment"
                                    onChange={handleChange}
                                    value={data.apartment}
                                    required
                                    className={styles.rowInput}
                                />
                            </div>
                        </div>
                        <h5 style={{margin:"10px 0 5px 0"}}>Почтовый индекс</h5>
                        <input
                            type="text"
                            placeholder="00-000"
                            name="zip"
                            onChange={handleChange}
                            value={data.zip}
                            required
                            className={styles.input}
                        />
                    </div>
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                    Изменить
                </button>
            </form>
        </div>
    );
};

export default UpdateLocation;
