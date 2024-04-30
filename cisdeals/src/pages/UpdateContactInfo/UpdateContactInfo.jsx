import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate, useParams, useLocation} from "react-router-dom";
import {updateProfile, userProfile} from "../../httpRequests/cisdealsApi";
import "./UpdateContactInfo.css";
import back from "../../img/Arrow_left.svg";

const UpdateContactInfo = () => {
    const {UserPage} = useParams();
    const location = useLocation();
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
    const progressBarRef = useRef(null);
    const targetWidth = 14;

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
                email: "",
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

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        console.log(profileData.email);
        try {
            let requestData = { ...data };
            // if (profileData.email === data.email) {
            //     const { email, ...rest } = requestData;
            //     requestData = { ...rest };
            // }
            const res = await updateProfile(UserPage, requestData);
            localStorage.setItem("token", JSON.stringify(res));
            console.log(localStorage.getItem("token"));

            if (location.pathname === `/AddContactInfo/${UserPage}`) {
                navigate(`/AddSocialInfo/${UserPage}`);
            } else {
                navigate("/EditProfile");
            }
            console.log(data);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
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
        <div className={'contact_container'}>
            <div className="main-container">
                {location.pathname === `/AddContactInfo/${UserPage}` && (
                    <div className="ProgressBarBlock">
                        <div className="ProgressBarLine" ref={progressBarRef} style={{ width: `0%` }}>
                        </div>
                    </div>
                )}
                <Link className="form-update-link"
                      to={(location.pathname === `/AddContactInfo/${UserPage}`)
                          ? `/SuccessfulLoginScreen/${UserPage}`
                          : "/EditProfile"}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <form className="form_container" onSubmit={handleSubmit} noValidate>
                    <p className="form-heading">
                        {(location.pathname === `/AddContactInfo/${UserPage}`)
                            ? "Добавление контактной информации"
                            : "Изменение контактной информации"
                        }
                    </p>
                    <div className="form-contact-content">
                        <div>
                            {/*{location.pathname !== `/AddContactInfo/${UserPage}` && (*/}
                            {/*    <div>*/}
                            {/*        <h5 className="form-label">Email</h5>*/}
                            {/*        <input*/}
                            {/*            type="email"*/}
                            {/*            placeholder="Email"*/}
                            {/*            name="email"*/}
                            {/*            onChange={handleChange}*/}
                            {/*            value={data.email}*/}
                            {/*            required*/}
                            {/*            className={'contact_input'}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*)}*/}

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
                        {(location.pathname === `/AddContactInfo/${UserPage}`)
                            ? "Далее"
                            : "Изменить"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateContactInfo;
