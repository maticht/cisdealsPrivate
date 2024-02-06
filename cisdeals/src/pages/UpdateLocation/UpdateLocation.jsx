import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import CitiesJSON from '../../data/cities.json';
import arrow from '../../img/arrowright.svg';
import arrowDown from '../../img/arrow_down=24.png';
import radioChecked from '../../img/radioChecked.svg';
import axios from "axios";
import styles from "./styles.module.css";
import {updateProfile, userProfile} from "../../httpRequests/cisdealsApi";
import back from "../../img/Arrow_left.svg";

const UpdateLocation = () => {
    const {UserPage} = useParams();
    const location = useLocation();
    const progressBarRef = useRef(null);
    const targetWidth = 57;
    const [error, setError] = useState("");
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [modalCitiesIsOpen, setModalCitiesIsOpen] = useState(false);
    const [selectedServ, setSelectedServ] = useState("");
    const [selectedCities, setSelectedCities] = useState("");
    const navigate = useNavigate();
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
        workLocation: "",
        description: "",
        services: "",
        price: "",
        savedUsers: [],
        likes: "",
        rating: "",
    });
    const handleChange = ({ currentTarget: input }) => {
        let value = input.value;
        if (input.name === "zip" && value.length === 2 && !value.includes("-")) {
            value = `${value}-`;
        }
        setData({ ...data, [input.name]: value });
    };

    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(userId);
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
                workLocation: data.profile.workLocation,
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
            const res = await updateProfile(UserPage, data);
            localStorage.setItem("token",  JSON.stringify(res));
            console.log(localStorage.getItem("token"))
            if (location.pathname === `/AddLocation/${UserPage}`) {
                navigate(`/AddDescription/${UserPage}`);
            } else {
                navigate("/EditProfile");
            }
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
    useEffect(() => {
        const progressBar = progressBarRef.current;
        let width = 0;
        const animationDuration = 200;
        const start = performance.now();

        const animateProgressBar = (timestamp) => {
            const elapsed = timestamp - start;
            width = (elapsed / animationDuration) * targetWidth;

            progressBar.style.width = `${Math.min(width, targetWidth)}%`;

            if (width < targetWidth) {
                requestAnimationFrame(animateProgressBar);
            }
        };

        requestAnimationFrame(animateProgressBar);
    }, []);

    return (
        <div className={styles.mainLocationContainer}>
            <div className={styles.mainContainer}>
                {location.pathname === `/AddLocation/${UserPage}` && (
                    <div className="ProgressBarBlock">
                        <div className="ProgressBarLine" ref={progressBarRef} style={{width: `43%`}}>
                        </div>
                    </div>
                )}
                <Link className="form-update-link"
                      to={(location.pathname === `/AddLocation/${UserPage}`)
                          ? `/AddWorkingHours/${UserPage}`
                          : "/EditProfile"}>
                    <img src={back} alt="back"/>
                    <p>Назад</p>
                </Link>

                <form className={'form_container'} onSubmit={handleSubmit} noValidate>
                    <p className="form-prsnl-heading">
                        {(location.pathname === `/AddLocation/${UserPage}`)
                            ? "Добавление Локации"
                            : "Изменение Локации"}</p>
                    <div className={styles.workPlaceContainer}>
                        <div className={styles.workPlace}>
                            <label>
                                <div>
                                    <div className={styles.radioImgOverlay}>
                                        <input
                                            type="radio"
                                            name="workLocation"
                                            value="office"
                                            checked={data.workLocation === "office"}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={styles.radioImgOverlay}>
                                        <img src={radioChecked} alt={'+'}/>
                                    </div>
                                </div>
                            </label>
                            <p>
                                У меня есть салон, офис или постоянная локация работы
                            </p>
                        </div>
                        <div className={styles.workPlace}>
                            <label>
                                <div className={styles.radioImgOverlay}>
                                    <input
                                        type="radio"
                                        name="workLocation"
                                        value="remote"
                                        checked={data.workLocation === "remote"}
                                        onChange={handleChange} s
                                    />
                                </div>
                                <div className={styles.radioImgOverlay}>
                                    <img src={radioChecked} alt={'+'}/>
                                </div>
                            </label>
                            <p>
                                Я работаю только удалённо или выезжаю на локацию клиента
                            </p>
                        </div>
                    </div>
                    <div className={styles.cityContainer}>
                        <div>
                        <h5 className={styles.inputName}>Город</h5>
                            <button className={styles.inputBtn} onClick={handleOpenCitiesModal}>
                                <div className={styles.cityButtonContent}>
                                    <p>{selectedCities || "Выбрать город"}</p>
                                    <img src={arrowDown} alt={'>'}/>
                                </div>
                            </button>
                            <div>
                                {modalCitiesIsOpen && (
                                    <div className={styles.overlay}>
                                        <div className={styles.modal}>
                                            <Link className="form-update-link"
                                                  onClick={() => setModalCitiesIsOpen(false)}>
                                                <img src={back} alt="back"/>
                                                <p>Назад</p>
                                            </Link>
                                            <p className="form-prsnl-heading">Выберите Город</p>
                                            <div className={styles.chooseCityBlock}>
                                                {CitiesJSON.cities.map((city) =>
                                                    <div className={styles.OneCityItem} onClick={() => {
                                                        handleCitiesClick(city.title);
                                                        setSelectedCities(city.title)
                                                    }}>
                                                        <p key={city.title}
                                                           className={styles.OneCategoryInfo}>{city.title}</p>
                                                        {/*<img className={styles.OneCategoryImg} src={arrow} alt={'logo'}/>*/}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <h5 className={styles.inputName}>Район</h5>
                            <button className={styles.inputBtn}
                                    style={selectedCities.length === 0 ? {opacity: 0.5, pointerEvents: 'none'} : {}}
                                    onClick={handleOpenServModal}
                            >
                                <div className={styles.cityButtonContent}>
                                    <p>{selectedServ || "Выбрать район"}</p>
                                    <img src={arrowDown} alt={'>'}/>
                                </div>
                            </button>
                            {modalServIsOpen && (
                                <div className={styles.overlay}>
                                    <div className={styles.modal}>
                                        <Link className="form-update-link"
                                              onClick={() => setModalServIsOpen(false)}>
                                            <img src={back} alt="back"/>
                                            <p>Назад</p>
                                        </Link>
                                        <p className="form-prsnl-heading">Выберите Район</p>
                                        <div className={styles.chooseCityBlock}>
                                            {selectedCities !== "" &&
                                                CitiesJSON.cities.find((category) => category.title === selectedCities).areas.map((option) => (
                                                    <div className={styles.OneCityItem} onClick={() => {
                                                        handleRegionsClick(option.title);
                                                    }}>
                                                        <p key={option.title}
                                                           className={styles.OneCategoryInfo}>{option.title}</p>
                                                        {/*<img className={styles.OneCategoryImg} src={arrow} alt={'logo'}/>*/}
                                                    </div>
                                                ))}
                                        </div>
                                        <div>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h5 className={styles.inputName}>Улица</h5>
                            <input
                                type="text" placeholder="Mokotowska" name="street"
                                onChange={handleChange}
                                value={data.street === "street" ? "" : data.street}
                                required
                                className={styles.input}
                            />
                            <div className={styles.inputApartmentContainer}>
                                <div className={styles.inputApartment}>
                                    <h5 className={styles.inputName}>Дом</h5>
                                    <input
                                        type="text" placeholder="0000" name="house"
                                        onChange={handleChange}
                                        value={data.house === "house" ? "" : data.house}
                                        required
                                        className={styles.rowInput}
                                    />
                                </div>
                                <div className={styles.inputApartment}>
                                    <h5 className={styles.inputName}>Квартира</h5>
                                    <input
                                        type="text" placeholder="0000" name="apartment"
                                        onChange={handleChange}
                                        value={data.apartment === "apartment" ? "" : data.apartment}
                                        required
                                        className={styles.rowInput}
                                    />
                                </div>
                            </div>
                            <h5 className={styles.inputName}>Почтовый индекс</h5>
                            <input
                                type="text" placeholder="00-000" name="zip"
                                onChange={handleChange}
                                value={data.zip === "zip" ? "" : data.zip}
                                required
                                className={styles.input}
                            />
                        </div>
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={'create_btn'}>
                        {(location.pathname === `/AddLocation/${UserPage}`)
                            ? "Далее"
                            : "Изменить"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateLocation;
