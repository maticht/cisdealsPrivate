import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import selfie from '../../img/selfie.svg'
import eye from "../../img/showPas.svg";



const Signup = () => {
    const [data, setData] = useState({
        firstName: "firstName",
        lastName: "lastName",
        password: "",
        nameOrCompany: "",
        areasActivity: "areasActivity",
        phone1: "phone1",
        phone2: "phone2",
        image: [],
        workingHoursMon: {
            startHours1:'startHours',
            startMinutes1:'startMinutes',
            endHours1:'endHours',
            endMinutes1:'endMinutes',
        },
        workingHoursTue: {
            startHours2:'startHours',
            startMinutes2:'startMinutes',
            endHours2:'endHours',
            endMinutes2:'endMinutes',
        },
        workingHoursWed: {
            startHours3:'startHours',
            startMinutes3:'startMinutes',
            endHours3:'endHours',
            endMinutes3:'endMinutes',
        },
        workingHoursThu: {
            startHours4:'startHours4',
            startMinutes4:'startMinutes4',
            endHours4:'endHours4',
            endMinutes4:'endMinutes4',
        },
        workingHoursFri: {
            startHours5:'startHours5',
            startMinutes5:'startMinutes5',
            endHours5:'endHours5',
            endMinutes5:'endMinutes5',
        },
        workingHoursSat: {
            startHours6:'startHours6',
            startMinutes6:'startMinutes6',
            endHours6:'endHours6',
            endMinutes6:'endMinutes6',
        },
        workingHoursSun: {
            startHours7:'startHours7',
            startMinutes7:'startMinutes7',
            endHours7:'endHours7',
            endMinutes7:'endMinutes7',
        },
        Facebook: "Facebook",
        TikTok: "TikTok",
        YouTube: "YouTube",
        Instagram: "Instagram",
        WhatsApp: "WhatsApp",
        Telegram: "Telegram",
        Viber: "Viber",
        LinkedIn: "LinkedIn",
        city: "city",
        region: "region",
        street: "street",
        house: "house",
        apartment: "apartment",
        zip: "zip",
        workLocation: 'workLocation',
        description: "description",
        services: "services",
        price: "price",
        savedUsers: [],
        likes: "likes",
        rating: [],
    });

    const [error, setError] = useState("");
    const [msg,setMsg] = useState('');
    const [userId, setUserId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/users`;
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            const user = localStorage.getItem("token");
            let localUserObj = JSON.parse(user);
            let User = localUserObj.data ? localUserObj.data?._id : null;
            setUserId(User);
            setMsg(res.message)
            // navigate("/SuccessfulLoginScreen");
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
    // const Modal = ({ handleClose, show }) => {
    //     const showHideClassName = show ? "modal display-block" : "modal display-none";
    //
    //     return (
    //         <div className={showHideClassName} style={{display: show ? "block" : "none",
    //             width: '100%',
    //             height: '100vh',
    //             paddingTop:'30px',
    //             flexDirection: 'column',
    //             backgroundColor: '#f5f5f5',
    //             zIndex:9999,
    //             position: 'fixed',
    //             top: 0,
    //             left: 0,}}>
    //             <section className="modal-main">
    //                 <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
    //                     <img src={selfie} style={{width:'200px'}} alt={"Hello"}/>
    //                     <p style={{alignSelf:'center', fontSize:'24px', fontWeight:'700', flexWrap:'wrap', textAlign: 'center'}}>Спасибо!<br/>Ваш аккаунт<br/>зарегистрирован!</p>
    //                     <Link  to={`/AddServicesScreen/${userId}`} style={{textDecoration:'none',backgroundColor:'#000',display:'flex', width:'90%', alignItems:'center', borderRadius:'8px', justifyContent:'center', marginBottom:'15px'}}>
    //                         <p style={{color:'#fff', fontSize:'14px', fontWeight:'500', alignSelf:'center', justifyContent:'center'}}>Добавить свои услуги</p>
    //                     </Link>
    //                     <div style={{backgroundColor:'rgba(0,0,0,0)',display:'flex', width:'90%', alignItems:'center', borderRadius:'8px', justifyContent:'center', marginBottom:'15px', border: '2px solid #000'}} onClick={handleClose}>
    //                         <p style={{color:'#000', fontSize:'14px', fontWeight:'500', alignSelf:'center', justifyContent:'center'}}>Перейти к поиску специалистов</p>
    //                     </div>
    //                 </div>
    //             </section>
    //         </div>
    //     );
    // };


    return (
        <div className={styles.signup_container}>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px",margin:"20px 0 10px 10px"}} to="/">˂ Главная</Link>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <h1 style={{margin:"0 0 0 10px"}}>Регистрация</h1>
                <div style={{display:'flex', flexDirection:'row',alignItems:'center', marginLeft:10, justifyContent:"flex-start"}}>
                    <p style={{fontSize:14}}>Ещё нет аккаунта?</p>
                    <Link to="/login" style={{textDecoration:"none"}}>
                        <p style={{textDecoration:"none",color:"#5CA91A", fontWeight:"bold"}}>Войти</p>
                    </Link>
                </div>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>
                    <h5 style={{margin:"0 0 5px 0"}}>Имя или название компании</h5>
                    <input
                        type="text"
                        placeholder="Имя"
                        name="nameOrCompany"
                        onChange={handleChange}
                        value={data.nameOrCompany}
                        required
                        className={styles.input}
                    />
                    <h5 style={{margin:"10px 0 5px 0"}}>Email</h5>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
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
                {error && <div className={styles.error_msg}>{error}</div>}
                {msg && <div className={styles.success_msg}>{msg}</div>}
                <button type="submit" className={styles.green_btn}>
                    Sing Up
                </button>
            </form>

        </div>
    );

};

export default Signup;
