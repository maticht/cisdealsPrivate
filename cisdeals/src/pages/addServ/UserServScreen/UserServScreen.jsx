import React, {useEffect, useState} from "react";
import {servProfile, updateServ} from "../../../httpRequests/cisdealsApi";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import back from "../../../img/Arrow_left.svg";

const UserServScreen = () => {
    const location = useLocation();
    const {UserPage, ServPage} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serv, setServ] = useState([]);
    const [data, setData] = useState({
        prise: "",
        fixPrice: "",
        minutes: "",
        hours: "",
        days: "",
        fixTime: "",
        description: ''
    });

    useEffect(() => {
        const fetchUserProfile = async (ServId) => {
            try {
                const userData = await servProfile(ServPage);
                setServ(userData.profile);
                console.log(userData.profile);
                console.log('user profile data', userData.profile);
                setData(prevData => ({
                    ...prevData,
                    prise: userData.profile.prise !== "prise" ? userData.profile.prise : prevData.prise,
                    minutes: userData.profile.minutes !== "minutes" ? userData.profile.minutes : prevData.minutes,
                    hours: userData.profile.hours !== "hours" ? userData.profile.hours : prevData.hours,
                    days: userData.profile.days !== "days" ? userData.profile.days : prevData.days,
                    description: userData.profile.description !== "description" ? userData.profile.description : prevData.description
                }));
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile(ServPage);
    }, []);

    const handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;
        if (name === "minutes") {
            if (!isNaN(value)) {
                (Number(value) > 60) ? setData({ ...data, [name]: "60" }) : setData({ ...data, [name]: value })
            }
        } else if (name === "hours") {
            if (!isNaN(value)) {
                (Number(value) > 24) ? setData({ ...data, [name]: "24" }) : setData({ ...data, [name]: value })
            }
        } else if (name === "days") {
            if (!isNaN(value)) {
                (Number(value) > 99) ? setData({ ...data, [name]: "99" }) : setData({ ...data, [name]: value })
            }
        } else if (name === "prise") {
            if (!isNaN(value)) {
                (value.length <= 9) ? setData({ ...data, [name]: value }) : setData({ ...data, [name]: value.slice(0, 9) })
            }
        } else if (name === "description") {
            (value.length <= 30) ? setData({ ...data, [name]: value }) : setData({ ...data, [name]: value.slice(0, 30) })
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const res = await updateServ(ServPage, data);
            if (location.pathname === `/AddLoginServ/${UserPage}/UserServScreen/${ServPage}`) {
                navigate(`/AddLoginServ/${UserPage}`);
            } else {
                navigate(`/addServ/${UserPage}`);
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

    return (
        <div className={styles.user_serv_container}>
            <div className="main-container">
                <Link className="form-update-link"
                      to={(location.pathname === `/AddLoginServ/${UserPage}/UserServScreen/${ServPage}`)
                          ? `/AddLoginServ/${UserPage}`
                          : `/addServ/${UserPage}`}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                    <p className="form-heading">{`${serv.title}`}</p>
                    <div className="form-user-serv">
                        <div>
                            <h5 className={styles.formUserServTitle}>Цена</h5>
                            <div className={styles.formUserServPrise}>
                                <input
                                    type="text" placeholder="Введите цену" name="prise"
                                    onChange={handleChange}
                                    value={data.prise}
                                    required
                                    className={styles.input}
                                />
                                <p>zł</p>
                            </div>
                            <h5 className={styles.formUserServTitle}>Время исполнения услуги</h5>
                            <div  className={styles.formUserServTime}>
                                <div className={styles.TimeBlock}>
                                    <input
                                        type="text" placeholder="00" name="minutes"
                                        onChange={handleChange}
                                        value={data.minutes}
                                        required
                                        className={styles.rowTimeInput}
                                    />
                                    <p className={styles.TimeBlockText} >Минут</p>
                                </div>
                                <div className={styles.TimeBlock}>
                                    <input
                                        type="text" placeholder="00" name="hours"
                                        onChange={handleChange}
                                        value={data.hours}
                                        required
                                        className={styles.rowTimeInput}
                                    />
                                    <p className={styles.TimeBlockText}>Часов</p>
                                </div>
                                <div className={styles.TimeBlock}>
                                    <input
                                        type="text" placeholder="00" name="days"
                                        onChange={handleChange}
                                        value={data.days}
                                        required
                                        className={styles.rowTimeInput}
                                    />
                                    <p className={styles.TimeBlockText}>Дней</p>
                                </div>
                            </div>
                            <div className={styles.formUserServDescription}>
                                <h5 className={styles.formUserServTitle}>Описание</h5>
                                <p style={{  }}>{data.description.length}/30</p>
                            </div>
                            <div>
                                <textarea
                                    placeholder="Напишите описание"
                                    name="description"
                                    onChange={handleChange}
                                    value={data.description}
                                    required
                                    className={`${styles.servInput} ${styles["input-top"]}`}
                                />
                            </div>
                        </div>
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={'create_btn'}>
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserServScreen;
