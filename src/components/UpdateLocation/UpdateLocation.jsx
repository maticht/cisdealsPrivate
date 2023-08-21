import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {createUseStyles} from "react-jss";
import CitiesJSON from '../../data/cities.json';
import arrow from '../../img/arrowright.svg';
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
        width: "22px",
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
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [modalCitiesIsOpen, setModalCitiesIsOpen] = useState(false);
    const [selectedServ, setSelectedServ] = useState("");
    const [selectedCities, setSelectedCities] = useState("");
    const classes = useStyles();
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        let value = input.value;
        if (input.name === "zip" && value.length === 2 && !value.includes("-")) {
            value = `${value}-`;
        }
        setData({ ...data, [input.name]: value });
    };

    const fetchUserProfile = async (userId) => {
        try {
            const { data } = await axios.get(`http://backend.delkind.pl/user-profile/${userId}`);
            console.log(data.profile);
            setData({
                password: "",
                nameOrCompany: "",
                areasActivity: "",
                image: [],
                Facebook: "",
                TikTok: "",
                YouTube: "",
                Instagram: "",
                WhatsApp: "",
                Telegram: "",
                Viber: "",
                LinkedIn: "",
                city: data.profile.city,
                region: data.profile.region,
                street: data.profile.street,
                house: data.profile.house,
                apartment: data.profile.apartment,
                zip: data.profile.zip,
                workLocation: '',
                description: "",
                services: "",
                price: "",
                savedUsers: [],
                likes: "",
                rating: "",
                phone1: "",
                phone2: "",
            });
            setSelectedCities(data.profile.city === 'city' ? '' :  data.profile.city );
            setSelectedServ(data.profile.region === 'region' ? '' :  data.profile.region );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserProfile(UserPage);

    }, []);

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
        <div className={'signup_container'}>
            <div className="main-container">
                <Link to="/EditProfile" className="form-link">
                    <p className="form-link-text">{'< Назад'}</p>
                </Link>
                <form className={'form_container'} onSubmit={handleSubmit} noValidate>
                    <p className="form-prsnl-heading">Изменение Локации</p>
                    <div className={styles.cityContainer}>
                        <div>
                            <h5 className={styles.inputName}>Город</h5>
                            <button className={styles.inputBtn} onClick={handleOpenCitiesModal} >
                                <div className={styles.cityButtonContent}>
                                    <p>{selectedCities || "Выбрать город"}</p>
                                    <img src={arrowDown} alt={'>'}/>
                                </div>
                            </button>
                            <div>
                                {modalCitiesIsOpen && (
                                    <div className={styles.overlay}>
                                        <div className={styles.modal}>
                                            <p onClick={() => setModalCitiesIsOpen(false)} className="city-link-text">
                                                {`< Назад`}
                                            </p>
                                            <h2>Выберите Город</h2>
                                            <div>
                                                {CitiesJSON.cities.map((city) =>
                                                    <Link className={styles.nonTextDecoration} onClick={() => {handleCitiesClick(city.title); setSelectedCities(city.title)}}>
                                                        <div className={styles.OneCategoryItem}>
                                                            <p key={city.title} className={styles.OneCategoryInfo}>{city.title}</p>
                                                            <img className={styles.OneCategoryImg} src={arrow} alt={'logo'}/>
                                                        </div>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <h5 className={styles.inputName}>Район</h5>
                            <button className={styles.inputBtn} style={buttonStyles} onClick={handleOpenServModal} >
                                <div className={styles.cityButtonContent}>
                                    <p>{selectedServ || "Выбрать район"}</p>
                                    <img src={arrowDown} alt={'>'}/>
                                </div>
                            </button>
                            {modalServIsOpen && (
                                <div className={styles.overlay}>
                                    <div className={styles.modal}>
                                        <p onClick={() => setModalServIsOpen(false)} className="city-link-text">
                                            {`< Назад`}
                                        </p>
                                        <h2>Выберите Район</h2>
                                        <div>
                                            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                                                {selectedCities !== "" &&
                                                    CitiesJSON.cities.find((category) => category.title === selectedCities).areas.map((option) => (
                                                        <Link className={styles.nonTextDecoration} onClick={() => {handleRegionsClick(option.title); }}>
                                                            <div className={styles.OneCategoryItem}>
                                                                <p key={option.title} className={styles.OneCategoryInfo}>{option.title}</p>
                                                                <img className={styles.OneCategoryImg} src={arrow} alt={'logo'}/>
                                                            </div>
                                                        </Link>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h5 className={styles.inputName}>Улица</h5>
                            <input
                                type="text"
                                placeholder="Mokotowska"
                                name="street"
                                onChange={handleChange}
                                value={data.street  === "street" ? "" : data.street}
                                required
                                className={styles.input}
                            />
                            <div className={styles.inputApartmentContainer}>
                                <div className={styles.inputApartment}>
                                    <h5 className={styles.inputName}>Дом</h5>
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        name="house"
                                        onChange={handleChange}
                                        value={data.house  === "house" ? "" : data.house}
                                        required
                                        className={styles.rowInput}
                                    />
                                </div>
                                <div className={styles.inputApartment}>
                                    <h5 className={styles.inputName}>Квартира</h5>
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        name="apartment"
                                        onChange={handleChange}
                                        value={data.apartment  === "apartment" ? "" : data.apartment}
                                        required
                                        className={styles.rowInput}
                                    />
                                </div>
                            </div>
                            <h5 className={styles.inputName}>Почтовый индекс</h5>
                            <input
                                type="text"
                                placeholder="00-000"
                                name="zip"
                                onChange={handleChange}
                                value={data.zip  === "zip" ? "" : data.zip}
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
        </div>
    );
};

export default UpdateLocation;
