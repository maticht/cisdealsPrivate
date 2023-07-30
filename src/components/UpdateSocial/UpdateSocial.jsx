import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import ModalUserPage from "../modalUserPage/modalUserPage";
import Facebook from "../../img/Facebook.svg";
import LinkedIn from "../../img/LinkedIn.png";
import Telegram from "../../img/telegram.svg";
import Viber from "../../img/Viber.svg";
import TikTok from "../../img/TikTok.svg";
import Instagram from "../../img/Instagram.svg";
import WhatsApp from "../../img/WhatsApp.svg";
import YouTube from "../../img/YouTube.svg";


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
            const { data } = await axios.get(`http://backend.delkind.pl/user-profile/${userId}`);
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
    const [modalOpen, setModalOpen] = useState(false);


    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.signup_container}>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to="/EditProfile">
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <div>
                <ModalUserPage isOpen={modalOpen} onClose={handleCloseModal} />
            </div>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <h1 style={{margin:"0 0 0 10px"}}>Изменение контактной информации</h1>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"10px 10px"}}>
                    <div>
                        <h5 style={{margin:"10px 0 5px 0"}}>Социальные сети</h5>
                        <div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                                <img src={Facebook} alt="Facebook" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="Facebook"
                                    name="Facebook"
                                    onChange={handleChange}
                                    value={data.Facebook === "Facebook" ? "" : data.Facebook}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                                <img src={LinkedIn} alt="LinkedIn" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="LinkedIn"
                                    name="LinkedIn"
                                    onChange={handleChange}
                                    value={data.LinkedIn === "LinkedIn" ? "" : data.LinkedIn}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                                <img src={Telegram} alt="Telegram" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="Telegram"
                                    name="Telegram"
                                    onChange={handleChange}
                                    value={data.Telegram === "Telegram" ? "" : data.Telegram}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                                <img src={Viber} alt="Viber" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="Viber"
                                    name="Viber"
                                    onChange={handleChange}
                                    value={data.Viber === "Viber" ? "" : data.Viber}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                                <img src={TikTok} alt="TikTok" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="TikTok"
                                    name="TikTok"
                                    onChange={handleChange}
                                    value={data.TikTok === "TikTok" ? "" : data.TikTok}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                                <img src={Instagram} alt="Instagram" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="Instagram"
                                    name="Instagram"
                                    onChange={handleChange}
                                    value={data.Instagram === "Instagram" ? "" : data.Instagram}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                                <img src={WhatsApp} alt="WhatsApp" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="WhatsApp"
                                    name="WhatsApp"
                                    onChange={handleChange}
                                    value={data.WhatsApp === "WhatsApp" ? "" : data.WhatsApp}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                            <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px'}}>
                                <img src={YouTube} alt="YouTube" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                                <input
                                    type="text"
                                    placeholder="YouTube"
                                    name="YouTube"
                                    onChange={handleChange}
                                    value={data.YouTube === "YouTube" ? "" : data.YouTube}
                                    required
                                    className={styles.inputText}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                    Изменить
                </button>
            </form>
        </div>
    );
};

export default UpdateContactInfo;
