import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {updateProfile, userProfile} from "../../httpRequests/cisdealsApi";
import Facebook from "../../img/Facebook.svg";
import LinkedIn from "../../img/LinkedIn.png";
import Telegram from "../../img/telegram.svg";
import Viber from "../../img/Viber.svg";
import TikTok from "../../img/TikTok.svg";
import Instagram from "../../img/Instagram.svg";
import WhatsApp from "../../img/WhatsApp.svg";
import YouTube from "../../img/YouTube.svg";
import close from "../../img/x-mark.svg"
import "./UpdateSocial.css";
import back from "../../img/Arrow_left.svg";
import styles from "../addServ/styles.module.css";
import plus from "../../img/Plus.svg";
import arrow from "../../img/arrow_up=24.png";


const UpdateContactInfo = () => {
    const {UserPage} = useParams();
    const location = useLocation();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const progressBarRef = useRef(null);
    const targetWidth = 29;
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

    const handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;
        const socialNetwork = socialNetworks[name];
        const realLink = socialNetwork.realLink;

        if (name === "Telegram") {
            if (value.startsWith("https://t.me/") || value.startsWith("t.me/")) {
                const trimmedValue = value.replace("https://t.me/", "").replace("t.me/", "");
                setData({ ...data, [name]: trimmedValue });
                return;
            } else if (value.length === 0) {
                setData({ ...data, [name]: "" });
                return;
            }
        }

        if (value.startsWith(realLink)) {
            const trimmedValue = value.replace(realLink, "");
            setData({ ...data, [name]: trimmedValue });
            return;
        }

        setData({ ...data, [name]: value });
    };

    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(UserPage);
            console.log(data.profile);
            setData({
                firstName: "",
                email:"",
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
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const [social, setSocial] = useState({
        Facebook: false,
        TikTok: false,
        YouTube: false,
        Instagram: false,
        WhatsApp: false,
        Telegram: false,
        Viber: false,
        LinkedIn: false,
    });
    const socialNetworks = {
        Facebook: {
            icon: Facebook,
            link: "facebook.com/",
            realLink: "https://www.facebook.com/",
        },
        LinkedIn: {
            icon: LinkedIn,
            link: "linkedin.com/in/",
            realLink: "https://www.linkedin.com/in/",
        },
        Telegram: {
            icon: Telegram,
            link: "telegram.me/",
            realLink: "https://telegram.me/",
        },
        TikTok: {
            icon: TikTok,
            link: "tiktok.com/",
            realLink: "https://www.tiktok.com/",
        },
        YouTube: {
            icon: YouTube,
            link: "youtube.com/",
            realLink: "https://www.youtube.com/",
        },
        Instagram: {
            icon: Instagram,
            link: "instagram.com/",
            realLink: "https://www.instagram.com/",
        },
        WhatsApp: {
            icon: WhatsApp,
            link: "wa.me/",
            realLink: "https://wa.me/",
        },
        Viber: {
            icon: Viber,
            link: "viber.com/",
            realLink: "viber://add?number=",
        },
    };

    useEffect(() => {
        fetchUserProfile(UserPage);

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const res = await updateProfile(UserPage, data);
            localStorage.setItem("token", JSON.stringify(res));
            console.log(localStorage.getItem("token"))
            if (location.pathname === `/AddSocialInfo/${UserPage}`) {
                navigate(`/AddWorkingHours/${UserPage}`);
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
    const onSocialClickOff = (name) => {
        setData((prevState) => ({
            ...prevState,
            [name]: name,
        }));
        setSocial((prevState) => ({
            ...prevState,
            [name]: false,
        }));
    };
    const onSocialClickOn = (name) => {
        setSocial((prevState) => ({
            ...prevState,
            [name]: true,
        }));
        closeModal();
    };

    useEffect(() => {
        const progressBar = progressBarRef.current;
        let width = 14;
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
    const [socialNetworksWithValues, setSocialNetworksWithValues] = useState([]);
    const [socialNetworksWithoutValues, setSocialNetworksWithoutValues] = useState([]);

    useEffect(() => {
        const withValues = Object.keys(socialNetworks).filter(
            (name) => data[name] !== name && data[name] !== ''
        );
        const withoutValues = Object.keys(socialNetworks).filter(
            (name) => data[name] === name || data[name] === ''
        );

        setSocialNetworksWithValues(withValues);
        setSocialNetworksWithoutValues(withoutValues);
    }, [data]);

    return (
        <div className={'social_container'}>
            <div className="main-container">
                {location.pathname === `/AddSocialInfo/${UserPage}` && (
                    <div className="ProgressBarBlock">
                        <div className="ProgressBarLine" ref={progressBarRef} style={{width: `14%`}}>
                        </div>
                    </div>
                )}
                <Link className="form-update-link"
                      to={(location.pathname === `/AddSocialInfo/${UserPage}`)
                          ? `/AddContactInfo/${UserPage}`
                          : "/EditProfile"}>
                    <img src={back} alt="back"/>
                    <p>Назад</p>
                </Link>
                <form className="form_container" onSubmit={handleSubmit} noValidate>
                    <p className="form-heading">{"Соцсети и мессенджеры"}</p>
                    <div className="form-content">
                        <div>
                            <div>
                                {socialNetworksWithValues.map((name) => (
                                    <div key={name} className={'social-input'} data-name={name}>
                                        <img
                                            onClick={() => onSocialClickOff(name)}
                                            src={close}
                                            alt="x"
                                            className={'input-close'}
                                        />
                                        <img src={socialNetworks[name].icon} alt={name} className={'input-icon'}/>
                                        <p className={'link-head'}>{socialNetworks[name].link}</p>
                                        <input
                                            type="text"
                                            placeholder={
                                                socialNetworks[name].link.includes("viber.com/") ||
                                                socialNetworks[name].link.includes("wa.me/")
                                                    ? "48XXXXXXXXX"
                                                    : "username"
                                            }
                                            name={name}
                                            onChange={handleChange}
                                            value={data[name] === name ? '' : data[name]}
                                            required
                                            className={'inputText'}
                                        />
                                    </div>
                                ))}
                                {socialNetworksWithoutValues.map((name) => (
                                    social[name] && (
                                        <div key={name} className={'social-input'} data-name={name}>
                                            <img
                                                onClick={() => onSocialClickOff(name)}
                                                src={close}
                                                alt="x"
                                                className={'input-close'}
                                            />
                                            <img src={socialNetworks[name].icon} alt={name} className={'input-icon'}/>
                                            <p className={'link-head'}>{socialNetworks[name].link}</p>
                                            <input
                                                type="text"
                                                placeholder={
                                                    socialNetworks[name].link.includes("viber.com/") ||
                                                    socialNetworks[name].link.includes("wa.me/")
                                                        ? "48XXXXXXXXX"
                                                        : "username"
                                                }
                                                name={name}
                                                onChange={handleChange}
                                                value={data[name] === name ? '' : data[name]}
                                                required
                                                className={'inputText'}
                                            />
                                        </div>
                                    )
                                ))}
                                <button type='button' className={'addSocialBtn'} onClick={openModal}>
                                    <div className={'addSocialBtnBlock'}>
                                        <img src={plus} alt={'+'}/>
                                        <p>{"Добавить ссылку"}</p>
                                    </div>
                                </button>
                                {modalIsOpen && (
                                    <div className="social_modal">
                                        <div className="social_container">
                                            <div className="main-container">
                                                <Link className="form-update-link" onClick={closeModal}>
                                                    <img src={back} alt="back"/>
                                                    <p>Назад</p>
                                                </Link>
                                                <form className="form_container" onSubmit={handleSubmit} noValidate>
                                                    <p className="form-heading">{"Выберете соцсеть"}</p>
                                                    <div className="form-link-content">
                                                        <div>
                                                            <div>
                                                                {Object.keys(socialNetworks).map((name) => (
                                                                    !social[name] && data[name] === name && (
                                                                        <div key={name} onClick={() => onSocialClickOn(name)} className={'social-link-input'}
                                                                             data-name={name}>
                                                                            <div className={'link-head-icon'}>
                                                                                <img src={socialNetworks[name].icon}
                                                                                     alt={name}
                                                                                     className={'input-icon'}/>
                                                                                <p className={'link-head-text'}>{name}</p>
                                                                            </div>
                                                                            <img src={arrow}
                                                                                 alt={name}
                                                                                 className={'input-link-icon'}/>
                                                                        </div>
                                                                    )
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {error && <div className={'error_msg'}>{error}</div>}
                    <button type="submit" className={'create_btn'}>
                        {(location.pathname === `/AddSocialInfo/${UserPage}`)
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
