import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./UpdateContactInfo.css";

const UpdateContactInfo = () => {
    const {UserPage} = useParams();
    const [data, setData] = useState({
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
    const [profileData, setProfileData] = useState({});
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const fetchUserProfile = async (userId) => {
        try {
            const { data } = await axios.get(`http://backend.delkind.pl/user-profile/${userId}`);
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
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const { data: res } = await axios.put(url, data);
            localStorage.setItem("token", JSON.stringify(res));
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
                <Link to="/EditProfile" className="form-link">
                    <p className="form-link-text">{'< Назад'}</p>
                </Link>
                <form className="form_container" onSubmit={handleSubmit} noValidate>
                    <p className="form-heading">Изменение контактной информации</p>
                    <div className="form-content">
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
                    <button type="submit" className={'green_btn'}>
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateContactInfo;
