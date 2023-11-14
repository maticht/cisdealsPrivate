import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import Facebook from "../../img/Facebook.svg";
import TikTok from "../../img/TikTok.svg";
import YouTube from "../../img/YouTube.svg";
import Instagram from "../../img/Instagram.svg";
import WhatsApp from "../../img/WhatsApp.svg";
import Telegram from "../../img/Telegram.svg";
import Viber from "../../img/Viber.svg";
import LinkedIn from "../../img/LinkedIn.png";



const AddSocialInfo = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const { data: res } = await axios.put(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            navigate(`/AddWorkingHours/${UserPage}`);
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
    useEffect(() => {
        const progressBar = document.querySelector('#progressBar');
        progressBar.style.width = '50%';
    }, []);

    return (
        <div className={styles.signup_container}>
            <div style={{ width: "94%", height: "3px", background: "#fff", borderRadius:'5px', margin:'10px', alignSelf:'center' }}>
                <div id="progressBar" style={{ width: `37.5%`, height: "3px",transition: 'width 0.8s ease-in-out', background: "#5CA91A", borderRadius:'5px' }}></div>
            </div>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to={`/AddLocation/${UserPage}`}>
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <form className={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
            }} onSubmit={handleSubmit} noValidate>
                <h2 style={{margin:"0 0 0 10px"}}>Соцсети и мессенджеры</h2>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>

                    <div>
                        <div className={styles.input} style={{width:'83vw', display:'flex', alignItems:'center', padding:'10px', marginBottom:'10px'}}>
                            <img src={Facebook} alt="Facebook" width="23px"  height="23px" style={{marginRight:'10px',}}/>
                            <input
                                type="text"
                                placeholder="Facebook"
                                name="Facebook"
                                onChange={handleChange}
                                value={data.Facebook}
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
                                value={data.LinkedIn}
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
                                value={data.Telegram}
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
                                value={data.Viber}
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
                                value={data.TikTok}
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
                                value={data.Instagram}
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
                                value={data.WhatsApp}
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
                                value={data.YouTube}
                                required
                                className={styles.inputText}
                            />
                        </div>
                    </div>
                </div>

                <div style={{alignSelf:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                    {error && <div className={styles.error_msg}>{error}</div>}
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'center', flexDirection:'column', marginBottom:'25px'}}>
                    <button type="submit" style={{}} className={styles.green_btn}>
                        Изменить
                    </button>
                    <Link style={{textDecoration:'none', fontSize:'13px', color:'#666', alignSelf:'center'}} to={`/AddWorkingHours/${UserPage}`}>
                        Пропустить
                    </Link>
                </div>

            </form>
        </div>
    );
};

export default AddSocialInfo;
