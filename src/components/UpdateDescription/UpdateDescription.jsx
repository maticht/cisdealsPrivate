import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";

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

    return (
        <div className={styles.signup_container}>
            <div className="main-container">
                <Link to="/EditProfile" className="form-link">
                    <p className="form-link-text">{'< Назад'}</p>
                </Link>
                <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                    <div className={styles.formHeader}>
                        <p className="form-prsnl-heading">Описание</p>
                        <p className={styles.formCharacterCount}>{data.description.length}/900</p>
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
                    <button type="submit" className={styles.green_btn}>
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDescription;
