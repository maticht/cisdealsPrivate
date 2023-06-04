import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalUserPage from "../modalUserPage/modalUserPage";
import eye from "../../img/showPas.svg";


const Update = () => {
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
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
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
                <h1 style={{margin:"0 0 0 10px"}}>Изменение личной информации</h1>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>

                    <div>
                        <h5 style={{margin:"0 0 5px 0"}}>Имя или Название компании</h5>
                        <input
                            type="text"
                            placeholder="Apple"
                            name="nameOrCompany"
                            onChange={handleChange}
                            value={data.nameOrCompany}
                            required
                            className={styles.input}
                        />

                        <h5 style={{margin:"10px 0 5px 0"}}>Пароль</h5>
                        <div style={{position: 'relative', display:'flex', alignItems:'center'}}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Пароль"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            <button onClick={handleToggleShowPassword} type="button" style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'transparent',
                                border: 'none',
                                fontSize: '14px',
                                color: '#000',
                                cursor: 'pointer',
                                padding: 0,
                            }}>
                                <img src={eye} alt="eye" width="23px"  height="23px" style={{marginTop:'4px', opacity: showPassword ? "100%" : "50%"}}/>
                            </button>
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

export default Update;
