import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {updateProfile, userProfile} from "../../httpRequests/cisdealsApi";
import "./UpdateContactInfo.css";
import back from "../../img/Arrow_left.svg";

const UpdateContactInfo = () => {
    const {UserPage} = useParams();
    const [data, setData] = useState({
        password: "",
        nameOrCompany: "",
        areasActivity: "",
        phone1: "",
        phone2: "",
        email: "",
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
    const [profileData, setProfileData] = useState({});
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(UserPage);
            setProfileData(data.profile);
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
                description: "",
                services: "",
                price: "",
                savedUsers: [],
                likes: "",
                rating: "",
                email: data.profile.email ,
                phone1: data.profile.phone1 ,
                phone2: data.profile.phone2,
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
        console.log(data);
        try {
            const res = await updateProfile(UserPage, data);
            localStorage.setItem("token",  JSON.stringify(res));
            console.log(localStorage.getItem("token"))
            navigate("/EditProfile");
            console.log(data);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={'contact_container'}>
            <div className="main-container">
                <Link className="form-update-link" to="/EditProfile">
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <form className="form_container" onSubmit={handleSubmit} noValidate>
                    <p className="form-heading">Изменение контактной информации</p>
                    <div className="form-contact-content">
                        <div>
                            <h5 className="form-label">Email</h5>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={'contact_input'}
                            />
                            <h5 className="form-label">Номер телефона</h5>
                            <input
                                type="text"
                                placeholder="Телефон"
                                name="phone1"
                                onChange={handleChange}
                                value={data.phone1  === "phone1" ? "" : data.phone1}
                                required
                                className={'contact_input'}
                            />
                            <input
                                type="text"
                                placeholder="Телефон 2"
                                name="phone2"
                                onChange={handleChange}
                                value={data.phone2 === "phone2" ? "" : data.phone2}
                                required
                                className={'contact_input'}
                            />
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
