import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {createUseStyles} from "react-jss";
import CategoriesJSON from '../../data/categories.json';
import beauty from '../../img/CategoriesLogo/beauty.svg';
import sport from '../../img/CategoriesLogo/sport.svg';
import health from '../../img/CategoriesLogo/health.svg';
import auto from '../../img/CategoriesLogo/auto.svg'
import finance from '../../img/CategoriesLogo/finance.svg'
import animals from '../../img/CategoriesLogo/animals.svg';
import photo from '../../img/CategoriesLogo/photo.svg';
import study from '../../img/CategoriesLogo/study.svg';
import ads from '../../img/CategoriesLogo/ads.svg';
import design from '../../img/CategoriesLogo/design.svg';
import programming from '../../img/CategoriesLogo/programming.svg';
import logistics from '../../img/CategoriesLogo/logistics.svg';
import house from '../../img/CategoriesLogo/house.svg';
import build from '../../img/CategoriesLogo/build.svg';
import party from '../../img/CategoriesLogo/party.svg';
import arrowDown from '../../img/arrow_down=24.png';
import check from "../../img/VectorCheck.svg";
import food from '../../img/CategoriesLogo/food.png';

const useStyles = createUseStyles({
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    },
    modal: {
        paddingLeft:'10px',
        backgroundColor: '#f5f5f5',
        width: "100%",
        height: "100%",
        overflow: "auto"
    },
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
    allCategoriesBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
    },
    AllCategoryContainer: {
        margin: "0 2vw",
        padding: "15px 0 40px 0",
    },
    OneCategoryInfo: {
        display: "flex",
        textDecoration:'none',
        flexDirection: "row",
    },
    OneCategoryImg: {
        width: "35px",
    },
    OneCategoryItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",

    },
    OneCategoryCity: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "#000000",

    },
    OneCategoryCheckItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center',
        padding: "15px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginRight:'10px'
    }

});
const UpdateService = () => {
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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [selectedServ, setSelectedServ] = useState("");
    const classes = useStyles();
    const navigate = useNavigate();


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
    const [selectedServices, setSelectedServices] = useState([]);

    const handleServiceCheckboxChange = (event, optionTitle) => {
        if (event.target.checked) {
            if (selectedServices.length < 3) {
                setSelectedServices([...selectedServices, optionTitle]);
            }
        } else {
            setSelectedServices(selectedServices.filter((title) => title !== optionTitle));
        }
    };
    const handleServicesConfirmation = () => {
        setData({ ...data, areasActivity: selectedServices.join(" / ")});
        setSelectedServ(selectedServices.join(" / "));
        setModalServIsOpen(false);
    };
    const handleOpenServModal = (e) => {
        e.preventDefault();
        setModalServIsOpen(true);
    };



    return (
        <div className={styles.signup_container}>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to="/EditProfile">
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <h1 style={{margin:"0 0 0 10px"}}>О себе</h1>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>

                    <div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <h5 style={{margin:"10px 0 5px 0"}}>Услуги</h5>
                            <p style={{fontSize:'12px', margin:"10px 0 5px 0"}}>{`${selectedServices.length}/3`}</p>
                        </div>
                        <button className={styles.inputBtn} onClick={handleOpenServModal} >
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <p style={{margin:'0px'}}>{selectedServ || "Выбрать услугу"}</p>
                                <img style={{width:'15px'}} src={arrowDown} alt={'>'}/>
                            </div>
                        </button>
                        {modalServIsOpen && (
                            <div className={classes.overlay}>
                                <div className={classes.modal}>
                                    <p onClick={() => setModalServIsOpen(false)} style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                                        {`< Назад`}
                                    </p>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                        <h2>Выберите Услугу</h2>
                                        <p style={{fontSize:'12px', margin:"0 10px 0 0"}}>{`${selectedServices.length}/3`}</p>
                                    </div>
                                    <div>
                                        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                                            {CategoriesJSON.categories.map((option) => (
                                                    <div className={classes.OneCategoryCheckItem} key={option.categoriestitle}>
                                                        <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                                                            <input
                                                                type="checkbox"
                                                                id={option.categoriestitle}
                                                                name={option.categoriestitle}
                                                                style={{
                                                                    display:'none'
                                                                }}
                                                                value={option.categoriestitle}
                                                                onChange={(event) => handleServiceCheckboxChange(event, option.categoriestitle)}
                                                                checked={selectedServices.includes(option.categoriestitle)}
                                                                disabled={
                                                                    selectedServices.length >= 3 &&
                                                                    !selectedServices.includes(option.categoriestitle)
                                                                }
                                                            />
                                                            <label style={{
                                                                margin: '0 0 0 5px',
                                                                width:'18px',
                                                                border:selectedServices.length >= 3 && !selectedServices.includes(option.categoriestitle) ? '#A3A3A3 solid 3px' : '#000 solid 3px',
                                                                height:'18px',
                                                                backgroundColor: selectedServices.includes(option.categoriestitle) ? 'black' : 'white',
                                                                color: selectedServices.includes(option.categoriestitle) ? 'white' : 'black',
                                                                borderRadius: '6px',
                                                            }} htmlFor={option.categoriestitle}>
                                                                <img src={check} style={{margin:'3.5px'}}/>
                                                            </label>
                                                            <label style={{
                                                                margin: '0 0 0 5px',
                                                                padding: '2px 6px',
                                                                borderRadius: '4px',
                                                            }} htmlFor={option.categoriestitle}>
                                                                {option.categoriestitle}
                                                            </label>
                                                        </div>
                                                        <img className={classes.OneCategoryImg} src={
                                                            (option.categoriestitle === "Красота и уход") ?
                                                                beauty : (option.categoriestitle === "Спорт") ?
                                                                sport : (option.categoriestitle === "Здоровье") ?
                                                                health : (option.categoriestitle === "Авто") ?
                                                                auto : (option.categoriestitle === "Финансы и законы") ?
                                                                finance : (option.categoriestitle === "Животные") ?
                                                                animals : (option.categoriestitle === "Образование") ?
                                                                study : (option.categoriestitle === "Фото, видео, аудио") ?
                                                                photo : (option.categoriestitle === "Продвижение и реклама") ?
                                                                ads : (option.categoriestitle === "Дизайн и проектирование") ?
                                                                design : (option.categoriestitle === "Разработка") ?
                                                                programming : (option.categoriestitle === "Транспорт и логистика") ?
                                                                logistics : (option.categoriestitle === "Помощь по дому") ?
                                                                house : (option.categoriestitle === "Строительство и ремонт") ?
                                                                build : (option.categoriestitle === "Развлечения и мероприятия") ?
                                                                party : (option.categoriestitle === "Еда") ?
                                                                food : option.imgId
                                                            } alt="image not found"
                                                             style={{
                                                                 filter: selectedServices.includes(option.categoriestitle) ? 'none' : 'grayscale(100%)',
                                                             }}
                                                        />
                                                    </div>
                                            ))}
                                            <button style={{
                                                display:'flex',
                                                border: 'none',
                                                outline: 'none',
                                                justifyContent:'center',
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                padding: '12px 0',
                                                backgroundColor: '#000000',
                                                borderRadius: '8px',
                                                color:'#fff',
                                                width: '180px',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                margin:'15px 0'
                                            }} onClick={handleServicesConfirmation}>Подтвердить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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

export default UpdateService;
