import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {userProfile, updateProfile} from "../../httpRequests/cisdealsApi";
import eye from "../../img/showPas.svg";
import openEye from "../../img/openEye.svg";
import back from "../../img/Arrow_left.svg";
import "./UpdatePersonal.css";

const UpdatePersonal = () => {
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
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState([]);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const fetchUserProfile = async (UserPage) => {
        try {
            const data = await userProfile(UserPage);
            setUser(data.profile);
            console.log(data.profile)
            setData({
                firstName: "",
                lastName: "",
                password: "",
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
                nameOrCompany: data.profile.nameOrCompany,
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
        <div className={'update_main_container'}>
            <div className="update-container">
                <Link className="form-update-link" to="/EditProfile">
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <form className="form_container" onSubmit={handleSubmit} noValidate>
                    <p className="form-prsnl-heading">Изменение личной информации</p>
                    <div className="form-update-content">
                        <div>
                            <h5 className="form-label">Имя или Название компании</h5>
                            <input
                                type="text"
                                placeholder="Apple"
                                name="nameOrCompany"
                                onChange={handleChange}
                                value={data.nameOrCompany}
                                required
                                className="update_input"
                            />
                            <h5 className="form-label">Пароль</h5>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Пароль"
                                    name="password"
                                    onChange={handleChange}
                                    value={data.password}
                                    required
                                    className="update_input"
                                />
                                <button
                                    type="button"
                                    onClick={handleToggleShowPassword}
                                    className="password-button">
                                    <img src={showPassword ? openEye : eye} alt="eye"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {error && <div className={'error_msg'}>{error}</div>}
                    <button type="submit" className={'create_btn'}>
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePersonal;
