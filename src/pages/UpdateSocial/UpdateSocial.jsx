import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {updateProfile, userProfile} from "../../httpRequests/cisdealsApi";
import Facebook from "../../img/Facebook.svg";
import LinkedIn from "../../img/LinkedIn.png";
import Telegram from "../../img/Telegram.svg";
import Viber from "../../img/Viber.svg";
import TikTok from "../../img/TikTok.svg";
import Instagram from "../../img/Instagram.svg";
import WhatsApp from "../../img/WhatsApp.svg";
import YouTube from "../../img/YouTube.svg";
import "./UpdateSocial.css";
import back from "../../img/Arrow_left.svg";


const UpdateContactInfo = () => {
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
        setData({ ...data, [input.name]: input.value });
    };

    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(UserPage);
            console.log(data.profile);
            setData({
                firstName: "",
                lastName: "",
                password: "",
                nameOrCompany: "",
                areasActivity: "",
                phone1: "",
                phone2: "",
                image: [],
                Facebook: data.profile.Facebook,
                TikTok: data.profile.TikTok,
                YouTube: data.profile.YouTube,
                Instagram: data.profile.Instagram,
                WhatsApp: data.profile.WhatsApp,
                Telegram: data.profile.Telegram,
                Viber: data.profile.Viber,
                LinkedIn: data.profile.LinkedIn,
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
        <div className={'social_container'}>
            <div className="main-container">
                <Link className="form-update-link" to="/EditProfile">
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <form className="form_container" onSubmit={handleSubmit} noValidate>
                    <p className="form-heading">Изменение контактной информации</p>
                    <div className="form-content">
                        <div>
                            <h5 className="form-sosial-label">Социальные сети</h5>
                            <div>
                                <div className={'input'}>
                                    <img src={Facebook} alt="Facebook" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="Facebook"
                                        name="Facebook"
                                        onChange={handleChange}
                                        value={data.Facebook === "Facebook" ? "" : data.Facebook}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
                                <div className={'input'}>
                                    <img src={LinkedIn} alt="LinkedIn" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="LinkedIn"
                                        name="LinkedIn"
                                        onChange={handleChange}
                                        value={data.LinkedIn === "LinkedIn" ? "" : data.LinkedIn}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
                                <div className={'input'}>
                                    <img src={Telegram} alt="Telegram" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="Telegram"
                                        name="Telegram"
                                        onChange={handleChange}
                                        value={data.Telegram === "Telegram" ? "" : data.Telegram}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
                                <div className={'input'}>
                                    <img src={Viber} alt="Viber" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="Viber"
                                        name="Viber"
                                        onChange={handleChange}
                                        value={data.Viber === "Viber" ? "" : data.Viber}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
                                <div className={'input'} >
                                    <img src={TikTok} alt="TikTok" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="TikTok"
                                        name="TikTok"
                                        onChange={handleChange}
                                        value={data.TikTok === "TikTok" ? "" : data.TikTok}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
                                <div className={'input'}>
                                    <img src={Instagram} alt="Instagram" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="Instagram"
                                        name="Instagram"
                                        onChange={handleChange}
                                        value={data.Instagram === "Instagram" ? "" : data.Instagram}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
                                <div className={'input'}>
                                    <img src={WhatsApp} alt="WhatsApp" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="WhatsApp"
                                        name="WhatsApp"
                                        onChange={handleChange}
                                        value={data.WhatsApp === "WhatsApp" ? "" : data.WhatsApp}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
                                <div className={'input'}>
                                    <img src={YouTube} alt="YouTube" className={'input-icon'}/>
                                    <input
                                        type="text"
                                        placeholder="YouTube"
                                        name="YouTube"
                                        onChange={handleChange}
                                        value={data.YouTube === "YouTube" ? "" : data.YouTube}
                                        required
                                        className={'inputText'}
                                    />
                                </div>
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

export default UpdateContactInfo;
