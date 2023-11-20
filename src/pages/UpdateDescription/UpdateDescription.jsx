import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {updateProfile, userProfile} from "../../httpRequests/cisdealsApi";
import back from "../../img/Arrow_left.svg";

const UpdateDescription = () => {
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
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;

        if (value.length <= 900) {
            setData({ ...data, [name]: value });
        } else {
            setData({ ...data, [name]: value.slice(0, 900) });
        }
    };

    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(UserPage);
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
                city: "",
                region: "",
                street: "",
                house: "",
                apartment: "",
                zip: "",
                workLocation: '',
                description: data.profile.description,
                services: "",
                price: "",
                savedUsers: [],
                likes: "",
                rating: "",
                phone1: "",
                phone2: "",
            });
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

    return (
        <div className={styles.signup_container}>
            <div className="main-container">
                <Link className="form-update-link" to="/EditProfile">
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                    <div className={styles.formHeader}>
                        <p className="form-prsnl-heading">Описание</p>
                        <p className={styles.formCharacterCount}>{data.description === "description" ? 0 : data.description.length}/900</p>
                    </div>
                    <div className={styles.formContent}>
                        <div>
                        <textarea
                            placeholder="Напишите описание"
                            name="description"
                            onChange={handleChange}
                            value={data.description  === "description" ? "" : data.description}
                            required
                            className={`${styles.input} ${styles["input-top"]}`}
                        />
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

export default UpdateDescription;
