import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {createUseStyles} from "react-jss";
import CategoriesJSON from '../../data/categories.json';
import CitiesJSON from '../../data/cities.json';
import arrow from '../../img/arrowright.svg';
import arrowDown from '../../img/arrow_down=24.png';

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
        width: "60px",
        marginRight: "10px",
    },
    OneCategoryItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "5px 0",
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
        justifyContent: "flex-start",
        padding: "15px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginRight:'10px'
    }

});


const UserServScreen = () => {
    const {UserPage, ServPage} = useParams();
    const [data, setData] = useState({
        prise: "",
        fixPrice: "",
        minutes: "",
        hours: "",
        days: "",
        fixTime: "",
        description: ""
    });
    const [error, setError] = useState("");
    const [serv, setServ] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [modalCitiesIsOpen, setModalCitiesIsOpen] = useState(false);
    const [modalRegionIsOpen, setModalRegionIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedServ, setSelectedServ] = useState("");
    const [selectedCities, setSelectedCities] = useState("");

    const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);

    const categories = CategoriesJSON.categories;

    const classes = useStyles();
    useEffect(() => {
        const fetchUserProfile = async (ServId) => {
            try{
                const {data} = await axios.get(`http://backend.delkind.pl/servProfile/${ServPage}`);
                setServ(data.profile)
                console.log(serv)
                console.log('user profile data', data.profile)
            }catch (err){
                console.log(err)
            }
        };
        fetchUserProfile(ServPage);
    }, []);


    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;
        if (name === "minutes") {
            if (!isNaN(value)) {
                if (Number(value) > 60) {
                    setData({ ...data, [name]: "60" });
                } else {
                    setData({ ...data, [name]: value });
                }
            }
        } else if (name === "hours") {
            if (!isNaN(value)) {
                if (Number(value) > 24) {
                    setData({ ...data, [name]: "24" });
                } else {
                    setData({ ...data, [name]: value });
                }
            }
        } else if (name === "days") {
            if (!isNaN(value)) {
                if (Number(value) > 99) {
                    setData({ ...data, [name]: "99" });
                } else {
                    setData({ ...data, [name]: value });
                }
            }
        } else if (name === "prise") {
            if (!isNaN(value)) {
                if (value.length <= 9) {
                    setData({ ...data, [name]: value });
                } else {
                    setData({ ...data, [name]: value.slice(0, 9) });
                }
            }
        } else if (name === "description") {
            if (value.length <= 30) {
                setData({ ...data, [name]: value });
            } else {
                setData({ ...data, [name]: value.slice(0, 30) });
            }
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSelectedServices([]);
        setData({ ...data, areasActivity: option });
        setModalIsOpen(false);
    };
    const handleOptionServClick = (option) => {
        setSelectedServ(option);
        setData({ ...data, services: option });
        setModalServIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/updateServ/${ServPage}`;
            const { data: res } = await axios.put(url, data);
            // localStorage.setItem("token",  JSON.stringify(res));
            navigate(`/AddServ/${UserPage}`);
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
    const [selectedServices, setSelectedServices] = useState([]);

    const handleServiceCheckboxChange = (event, optionTitle) => {
        if (event.target.checked) {
            setSelectedServices([...selectedServices, optionTitle]);
        } else {
            setSelectedServices(selectedServices.filter((title) => title !== optionTitle));
        }
    };

    // const handleServicesConfirmation = () => {
    //     setData({ ...data, services: selectedServices.join(", ") });
    //     setSelectedServ(selectedServices.join(", "));
    //     setModalServIsOpen(false);
    // };
    const handleCitiesClick = (city) => {
        setSelectedCities(city);
        setData({ ...data, city: city });
        setModalCitiesIsOpen(false);
    };
    const handleRegionsClick = (region) => {
        setSelectedServ(region);
        setData({ ...data, region: region });
        setModalServIsOpen(false);
    };


    const handleOpenModal = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    };

    const handleOpenServModal = (e) => {
        e.preventDefault();
        setModalServIsOpen(true);
    };
    const handleOpenCitiesModal = (e) => {
        e.preventDefault();
        setModalCitiesIsOpen(true);
    };
    const buttonStyles = selectedCities.length === 0 ? { opacity: 0.5, pointerEvents: 'none' } : {};
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div className={styles.signup_container} style={{minHeight:'100vh'}}>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to={`/addServ/${UserPage}`}>
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <h1 style={{margin:"0 0 10px 10px"}}>{`${serv.title}`}</h1>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"5px 10px 10px 10px"}}>
                    <div>
                        <h5 style={{margin:"10px 0 5px 0"}}>Цена</h5>
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <input
                                type="text"
                                placeholder="Введите цену"
                                name="prise"
                                onChange={handleChange}
                                value={data.prise}
                                required
                                className={styles.input}
                                style={{width:'100%'}}
                            />
                            <p style={{margin:'0 0 0 8px', fontSize:'15px'}}>zł</p>
                        </div>
                        {/*<h5 style={{margin:"10px 0 5px 0"}}>Тип цены</h5>*/}
                        {/*<div className="rowTimeInput">*/}
                        {/*    <div className={`${styles.servInput}`} onClick={toggleMenu}>*/}
                        {/*        <p style={{color:'#666', fontWeight:'400', fontSize:'15px', margin:'0'}}>{"Выберите значение"}</p>*/}
                        {/*    </div>*/}
                        {/*    {isOpen && (*/}
                        {/*        <div className={`${styles.servInput}`}>*/}
                        {/*            <div>*/}
                        {/*                <p style={{color:'#000', fontWeight:'400', fontSize:'15px', margin:'0 0 15px 0'}}>{"Фиксированная"}</p>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <p style={{color:'#000', fontWeight:'400', fontSize:'15px', margin:'0'}}>{"Договорная"}</p>*/}

                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <h5 style={{margin:"10px 0 5px 0"}}>Время исполнения услуги</h5>
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <input
                                    type="text"
                                    placeholder="00"
                                    name="minutes"
                                    onChange={handleChange}
                                    value={data.minutes}
                                    required
                                    className={styles.rowTimeInput}
                                />
                                <p style={{margin:'0 0 0 8px', fontSize:'13px'}}>Минут</p>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <input
                                    type="text"
                                    placeholder="00"
                                    name="hours"
                                    onChange={handleChange}
                                    value={data.hours}
                                    required
                                    className={styles.rowTimeInput}
                                />
                                <p style={{margin:'0 0 0 8px', fontSize:'13px'}}>Часов</p>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <input
                                    type="text"
                                    placeholder="00"
                                    name="days"
                                    onChange={handleChange}
                                    value={data.days}
                                    required
                                    className={styles.rowTimeInput}
                                />
                                <p style={{margin:'0 0 0 8px', fontSize:'13px'}}>Дней</p>
                            </div>
                        </div>
                        <div style={{justifyContent:"space-between", flexDirection:'row', display:'flex',alignItems:'center',}}>
                            <h5 style={{margin:"10px 0 5px 0"}}>Описание</h5>
                            <p style={{ margin: "10px 0 5px 0", fontSize:'12px' }}>{data.description.length}/30</p>
                        </div>
                        <div style={{justifyContent:"flex-start",width:'100%', backgroundColor:"#fff",borderRadius:8}}>
                            <textarea
                                placeholder="Напишите описание"
                                name="description"
                                onChange={handleChange}
                                value={data.description}
                                required
                                className={`${styles.servInput} ${styles["input-top"]}`}
                            />
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

export default UserServScreen;
