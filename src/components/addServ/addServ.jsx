import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import arrowDown from "../../img/arrow_down=24.svg";
import arrowUp from "../../img/UpProperty=24.svg";
import plus from "../../img/Plus.svg";
import CategoriesJSON from "../../data/categories.json";
import check from "../../img/VectorCheck.svg"
import {createUseStyles} from "react-jss";
import xMark from '../../img/x-mark=24.svg'
import greenxMark from '../../img/greenx-mark.svg'
import beauty from "../../img/CategoriesLogo/beauty.svg";
import sport from "../../img/CategoriesLogo/sport.svg";
import health from "../../img/CategoriesLogo/health.svg";
import auto from "../../img/CategoriesLogo/auto.svg";
import finance from "../../img/CategoriesLogo/finance.svg";
import animals from "../../img/CategoriesLogo/animals.svg";
import study from "../../img/CategoriesLogo/study.svg";
import photo from "../../img/CategoriesLogo/photo.svg";
import ads from "../../img/CategoriesLogo/ads.svg";
import design from "../../img/CategoriesLogo/design.svg";
import programming from "../../img/CategoriesLogo/programming.svg";
import logistics from "../../img/CategoriesLogo/logistics.svg";
import house from "../../img/CategoriesLogo/house.svg";
import build from "../../img/CategoriesLogo/build.svg";
import party from "../../img/CategoriesLogo/party.svg";
import food from "../../img/CategoriesLogo/food.png";

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
        paddingLeft: '10px',
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
        textDecoration: 'none',
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
    OneCategoryCheckItemServ: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: "15px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginRight: '10px'
    },
    OneCategoryCheckItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "15px 0 20px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginRight: '10px'
    },
    OneUnderCategoryCheckItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "15px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginLeft: '10px'
    },
    OneUnderUnderCategoryCheckItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        textDecoration: "none",
        color: "#000000",
        marginLeft: '15px'
    },


});
const AddServ = () => {
    const {UserPage} = useParams();
    const classes = useStyles();
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const user = localStorage.getItem("token");
    let localUserObj = JSON.parse(user);
    let areasActivity = localUserObj.data ? localUserObj.data.areasActivity : null;
    let selected = areasActivity ? areasActivity.split(" / ") : [];
    const [selectedOption, setSelectedOption] = useState(selected);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [serv, setServ] = useState([]);
    const [deleteObjId, setDeleteObjId] = useState(null);
    const [errorServ, setErrorServ] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalServvIsOpen, setModalServvIsOpen] = useState(false);
    const [selectedServv, setSelectedServv] = useState("");
    const [data, setData] = useState({
        title: "",
        parent: "",
        postedBy: UserPage,
        prise: "prise",
        fixPrice: "fixPrice",
        minutes: "minutes",
        hours: "hours",
        days: "days",
        fixTime: "fixTime",
        description: "description"
    });
    const [userData, setUserData] = useState({
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


    const [userDataForAreasActivity, setUserDataForAreasActivity] = useState({
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

    const handleDeleteClick = (objId) => {
        setDeleteModal(true);
        setDeleteObjId(objId);
    };

    const fetchUserServicess = async (userId, userData) => {
        try {
            const {data} = await axios.get(`http://backend.delkind.pl/viewbyid`, {
                params: {
                    postedBy: UserPage
                }
            });
            console.log(data)
            setServ(data)
            const servicesString = await data.map(service => [service.title, service.parent]).reduce((acc, curr) => {
                if (!acc.includes(curr.join())) {
                    acc.push(curr.join());
                }
                return acc;
            }, []).join(', ').toString();
            setUserData({...userData, services: servicesString});
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const {data: res} = await axios.put(url, userData);
        } catch (err) {
            console.log(err)
        }
    };


    const fetchUserProfile = async (userId) => {
        try {
            const {data} = await axios.get(`http://backend.delkind.pl/user-profile/${userId}`);
            setSelectedServv(data.profile.areasActivity)
            setSelectedServicess(data.profile.areasActivity.split(" / "));
            console.log(selectedServices)
        } catch (err) {
            console.log(err)
        }
    }

    let servData = []

    useEffect(() => {
        fetchUserServicess(UserPage, userData);
        fetchUserProfile(UserPage);
    }, []);

    const handleCategoryClick = (categoryTitle) => {
        setSelectedCategory(selectedCategory === categoryTitle ? '' : categoryTitle);
    };
    const [selectedDownCategory, setSelectedDownCategory] = useState('');

    const handleDownCategoryClick = (categoryTitle) => {
        setSelectedDownCategory(selectedDownCategory === categoryTitle ? '' : categoryTitle);
    };


    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = ({currentTarget: input}) => {
        const {name, value} = input;
        if (value.length <= 900) {
            setData({...data, [name]: value});
        } else {
            setData({...data, [name]: value.slice(0, 900)});
        }
    };
    const handleOpenServModal = (e) => {
        e.preventDefault();
        setModalServIsOpen(true);
    };
    // const handleServiceCheckboxChange = (event, optionTitle,optionParent) => {
    //     if (event.target.checked) {
    //         console.log({ title: optionTitle, parent: optionParent })
    //         setSelectedServices([...selectedServices, { title: optionTitle, parent: optionParent }]);
    //     } else {
    //         setSelectedServices(selectedServices.reduce((acc, service) => {
    //             if (service.title === optionTitle && service.parent === optionParent) {
    //                 return acc;
    //             }
    //             return [...acc, service];
    //         }, []));
    //     }
    // };

    const handleServiceCheckboxChange = (event, optionTitle, optionParent) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedServices([...selectedServices, {title: optionTitle, parent: optionParent}]);
        } else {
            setSelectedServices(selectedServices.filter((service) => {
                return !(service.title === optionTitle && service.parent === optionParent);
            }));
        }
    };

    const handleRemoveService = (title, parent) => {
        setSelectedServices(selectedServices.filter((service) => {
            return !(service.title === title && service.parent === parent);
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const {data: res} = await axios.put(url, data);
            localStorage.setItem("token", JSON.stringify(res));
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
    const handleServicesConfirmation = async (e) => {
        e.preventDefault();
        console.log(selectedOption);
        setModalServIsOpen(true);
        let success = true;
        if (selectedServices.length === 0) {
            setError('Вы не добавили ни одной услуги');
            return;
        }
        for (const service of selectedServices) {
            const dataForService = {
                ...data,
                title: service.title,
                parent: service.parent,
            };
            try {
                const url = `http://backend.delkind.pl/create`;
                const {data: res} = await axios.post(url, dataForService);
                console.log(dataForService);
            } catch (error) {
                success = false;
                if (error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.error);
                }
            }
        }
        if (success) {
            setModalServIsOpen(false);
            const {data: updatedServ} = await axios.get(`http://backend.delkind.pl/viewbyid`, {
                params: {
                    postedBy: UserPage
                }
            });
            setServ(updatedServ);
        }
    };
    const servDelete = async (ServId) => {
        try {
            const {data} = await axios.delete(`http://backend.delkind.pl/post-delete/${ServId}`);
            setDeleteModal(false);
            console.log(data)
            const {data: updatedServ} = await axios.get(`http://backend.delkind.pl/viewbyid`, {
                params: {
                    postedBy: UserPage
                }
            });
            setServ(updatedServ);
        } catch (err) {
            console.log(err)
        }
    }

    const [selectedServicess, setSelectedServicess] = useState([]);

    const handleServiceCheckboxChangeServ = (event, optionTitle) => {
        if (event.target.checked) {
            if (selectedServicess.length < 3) {
                setSelectedServicess([...selectedServicess, optionTitle]);
            }
        } else {
            setSelectedServicess(selectedServicess.filter((title) => title !== optionTitle));
        }
    };
    const handleServicesConfirmationServ = () => {
        setUserDataForAreasActivity({...userDataForAreasActivity, areasActivity: selectedServicess.join(" / ")});
        console.log(userData)
        setSelectedServv(selectedServicess.join(" / "));
        setModalServvIsOpen(false);
    };
    const handleOpenServModalServ = (e) => {
        e.preventDefault();
        setModalServvIsOpen(true);
    };

    const handleSubmitServ = async (e) => {
        e.preventDefault();
        try {
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const {data: res} = await axios.put(url, userDataForAreasActivity);
            localStorage.setItem("token", JSON.stringify(res));
            navigate("/EditProfile");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setErrorServ(error.response.data.message);
            }
        }
    };


    return (
        <div className={styles.signup_container} style={{zIndex: 1, minHeight: '100vh'}}>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to="/EditProfile">
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft: '10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <div
                style={{justifyContent: "space-between", flexDirection: 'row', display: 'flex', alignItems: 'center',}}>
                <h1 style={{margin: "0 0 10px 10px"}}>Услуги</h1>
            </div>
            <form className={styles.form_container} onSubmit={handleSubmitServ} noValidate>
                <h1 style={{margin: "0 0 0 10px"}}>О себе</h1>
                <div style={{
                    justifyContent: "flex-start",
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    margin: "10px 10px",
                    padding: "20px 10px"
                }}>

                    <div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <h5 style={{margin: "10px 0 5px 0"}}>Услуги</h5>
                            <p style={{fontSize: '12px', margin: "10px 0 5px 0"}}>{`${selectedServicess.length}/3`}</p>
                        </div>
                        <button className={styles.inputBtn} onClick={handleOpenServModalServ}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <p style={{margin: '0px'}}>{selectedServv || "Выбрать услугу"}</p>
                                <img style={{width: '15px'}} src={arrowDown} alt={'>'}/>
                            </div>
                        </button>
                        {modalServvIsOpen && (
                            <div className={classes.overlay}>
                                <div className={classes.modal}>
                                    <p onClick={() => setModalServvIsOpen(false)}
                                       style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                                        {`< Назад`}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <h2>Выберите Услугу</h2>
                                        <p style={{
                                            fontSize: '12px',
                                            margin: "0 10px 0 0"
                                        }}>{`${selectedServicess.length}/3`}</p>
                                    </div>
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column'
                                        }}>
                                            {CategoriesJSON.categories.map((option) => (
                                                <div className={classes.OneCategoryCheckItemServ}
                                                     key={option.categoriestitle}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <input
                                                            type="checkbox"
                                                            id={option.categoriestitle}
                                                            name={option.categoriestitle}
                                                            style={{
                                                                display: 'none'
                                                            }}
                                                            value={option.categoriestitle}
                                                            onChange={(event) => handleServiceCheckboxChangeServ(event, option.categoriestitle)}
                                                            checked={selectedServicess.includes(option.categoriestitle)}
                                                            disabled={
                                                                selectedServicess.length >= 3 &&
                                                                !selectedServicess.includes(option.categoriestitle)
                                                            }
                                                        />
                                                        <label style={{
                                                            margin: '0 0 0 5px',
                                                            width: '18px',
                                                            border: selectedServicess.length >= 3 && !selectedServicess.includes(option.categoriestitle) ? '#A3A3A3 solid 3px' : '#000 solid 3px',
                                                            height: '18px',
                                                            backgroundColor: selectedServicess.includes(option.categoriestitle) ? 'black' : 'white',
                                                            color: selectedServicess.includes(option.categoriestitle) ? 'white' : 'black',
                                                            borderRadius: '6px',
                                                        }} htmlFor={option.categoriestitle}>
                                                            <img src={check} style={{margin: '3.5px'}}/>
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
                                                             filter: selectedServicess.includes(option.categoriestitle) ? 'none' : 'grayscale(100%)',
                                                         }}
                                                    />
                                                </div>
                                            ))}
                                            <button style={{
                                                display: 'flex',
                                                border: 'none',
                                                outline: 'none',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                padding: '12px 0',
                                                backgroundColor: '#000000',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                width: '180px',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                margin: '15px 0'
                                            }} onClick={handleServicesConfirmationServ}>Подтвердить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {errorServ && <div className={styles.error_msg}>{errorServ}</div>}
                <button type="submit" className={styles.green_btn}>
                    Изменить
                </button>
            </form>
            <div className={styles.form_container} noValidate>
                <div style={{
                    justifyContent: "flex-start",
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    margin: "10px 11px",
                    padding: "15px 10px 5px 10px"
                }}>
                    <div style={{display: serv.length === 0 ? 'none' : null, marginBottom: '-10px'}}>
                        <div style={{
                            flexDirection: 'column',
                            backgroundColor: "#fff",
                            display: "flex",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: 'flex-start',
                            borderRadius: 8
                        }}>
                            <div style={{width: '100%'}}>
                                {Object.entries(
                                    serv.reduce((acc, obj) => {
                                        if (obj.parent in acc) {
                                            acc[obj.parent].push(obj);
                                        } else {
                                            acc[obj.parent] = [obj];
                                        }
                                        return acc;
                                    }, {})
                                ).map(([parent, data]) => (
                                    <div key={parent} style={{width: '100%', marginBottom: '35px'}}>
                                        <h3 style={{margin: '0 0 5px 0'}}>{parent}</h3>
                                        {data.map((obj) => (

                                            <div key={obj.title} style={{margin: '-5px 0 5px 0', width: '100%'}}>
                                                <div className={classes.OneUnderCategoryCheckItem} style={{
                                                    width: '100%',
                                                    height: '50px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    marginLeft: '0',
                                                    padding: "0",
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center'
                                                    }}>
                                                        <img style={{margin: '2px 5px 0 0', width: '12px'}}
                                                             onClick={() => handleDeleteClick(obj._id)} src={xMark}/>
                                                    </div>
                                                    <Link style={{
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        width: '100%',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }} to={`/addServ/${UserPage}/UserServScreen/${obj._id}`}>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start'
                                                        }}>
                                                            <p style={{
                                                                textDecoration: 'none',
                                                                color: '#000',
                                                                margin: '3px 3px 5px 0'
                                                            }}>{obj.title}</p>
                                                            {obj.description !== 'description' && (
                                                                <p style={{
                                                                    margin: '0 0 5px 0',
                                                                    fontSize: '11px',
                                                                    color: '#666'
                                                                }}>{obj.description}</p>
                                                            )}
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-end'
                                                            }}>
                                                                {obj.prise !== 'prise' && (
                                                                    <p style={{
                                                                        margin: '0 3px 5px 0',
                                                                        fontSize: '13px',
                                                                        color: '#000'
                                                                    }}>{`${obj.prise} zł`}</p>
                                                                )}
                                                                <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    {obj.days !== 'days' && (
                                                                        <p style={{
                                                                            margin: '0 3px 0 0',
                                                                            fontSize: '11px',
                                                                            color: '#666'
                                                                        }}>{`${obj.days} д`}</p>
                                                                    )}
                                                                    {obj.hours !== 'hours' && (
                                                                        <p style={{
                                                                            margin: '0 3px 0 0',
                                                                            fontSize: '11px',
                                                                            color: '#666'
                                                                        }}>{`${obj.hours} ч`}</p>
                                                                    )}
                                                                    {obj.minutes !== 'minutes' && (
                                                                        <p style={{
                                                                            margin: '0 3px 0 0',
                                                                            fontSize: '11px',
                                                                            color: '#666'
                                                                        }}>{`${obj.minutes} мин`}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <img style={{
                                                                marginTop: '5px',
                                                                width: '12px',
                                                                rotate: "-90deg"
                                                            }} src={arrowDown}/>
                                                        </div>

                                                    </Link>
                                                </div>
                                                {deleteModal && deleteObjId === obj._id && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            position: "fixed",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100vw",
                                                            height: "100vh",
                                                            zIndex: 10,
                                                            backgroundColor: "rgba(0,0,0,0.5)",
                                                        }}
                                                    >
                                                        <div style={{
                                                            width: "300px",
                                                            backgroundColor: "#fff",
                                                            borderRadius: '10px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            padding: '15px 10px'
                                                        }}>
                                                            <p style={{margin: '0'}}>Вы уверены, что хотите удалить
                                                                услугу <p style={{
                                                                    fontWeight: '500',
                                                                    margin: '0'
                                                                }}>{`“${obj.title}”`}</p></p>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                marginTop: '20px'
                                                            }}>
                                                                <div style={{
                                                                    width: '142px',
                                                                    height: '45px',
                                                                    backgroundColor: '#000',
                                                                    borderRadius: '8px',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    paddingBottom: '2px'
                                                                }} onClick={() => setDeleteModal(false)}>
                                                                    <p style={{color: '#fff', fontWeight: '600'}}>Не
                                                                        удалять</p>
                                                                </div>
                                                                <div style={{
                                                                    width: '142px',
                                                                    height: '45px',
                                                                    backgroundColor: '#fff',
                                                                    borderRadius: '8px',
                                                                    border: '#000 solid 2px',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    paddingBottom: '2px'
                                                                }} onClick={() => servDelete(deleteObjId)}>
                                                                    <p style={{
                                                                        color: '#000',
                                                                        fontWeight: '600'
                                                                    }}>Удалить</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <button className={styles.inputBtn} style={{backgroundColor: '#ffffff', marginTop: '-10px'}}
                            onClick={handleOpenServModal}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <img style={{width: '25px'}} src={plus} alt={'+'}/>
                            <p style={{margin: '5px 0 0 0', fontWeight: '600', color: '#000'}}>{"Добавить услугу"}</p>
                        </div>
                    </button>
                    {modalServIsOpen && (
                        <div className={classes.overlay}>
                            <div className={classes.modal}>
                                <p onClick={() => setModalServIsOpen(false)}
                                   style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                                    {`< Назад`}
                                </p>
                                {selectedServices.length !== 0 ? (
                                    <div>
                                        <h4 style={{margin: '10px 0'}}>Выбранные категории</h4>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}>
                                            {selectedServices.map((service) => (
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    padding: '1px 6px',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    border: " #5CA91A solid 2px",
                                                    borderRadius: '9px',
                                                    margin: '0 6px 6px 0'
                                                }} key={`${service.title}-${service.parent}`}>
                                                    <p style={{
                                                        color: '#5CA91A',
                                                        margin: '2px 0 5px 1px',
                                                        fontSize: '14px'
                                                    }}>{service.title}</p>
                                                    <img style={{margin: '1px 0 0 5px'}} src={greenxMark}
                                                         onClick={() => handleRemoveService(service.title, service.parent)}></img>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                                <h2 style={{margin: '15px 0 7px 0'}}>Выберите Услугу</h2>
                                <div>
                                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                        {selectedOption !== "" &&
                                            CategoriesJSON.categories.filter(category => selectedOption.includes(category.categoriestitle)).map((option, index, array) => (
                                                <div
                                                    className={classes.OneCategoryCheckItem}
                                                    style={{
                                                        borderBottom: selectedCategory === option.categoriestitle || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',
                                                    }}
                                                    key={option.categoriestitle}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between'
                                                        }}
                                                        onClick={() => handleCategoryClick(option.categoriestitle)}
                                                    >
                                                        <h4 style={{margin: '5px 0'}}>
                                                            {option.categoriestitle}
                                                        </h4>
                                                        <img style={{marginTop: '5px'}}
                                                             src={selectedCategory === option.categoriestitle ? arrowUp : arrowDown}/>
                                                    </div>

                                                    {selectedCategory === option.categoriestitle && (
                                                        <div>
                                                            {array.find((category) => category.categoriestitle === option.categoriestitle)
                                                                .subcategories.map((opt, index, array) => (
                                                                    <div
                                                                        className={classes.OneUnderCategoryCheckItem}
                                                                        key={opt.title}>
                                                                        {opt.subsubcategories.length === 0 ? (
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                alignItems: 'center'
                                                                            }}>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={opt.title}
                                                                                    name={opt.title}
                                                                                    style={{display: 'none'}}
                                                                                    value={opt.title}
                                                                                    onChange={(event) => handleServiceCheckboxChange(event, opt.title, opt.parent)}
                                                                                    checked={selectedServices.some(service => service.title === opt.title && service.parent === opt.parent)}
                                                                                />
                                                                                <label style={{
                                                                                    margin: '0 0 0 5px',
                                                                                    width: '18px',
                                                                                    border: '#000 solid 3px',
                                                                                    height: '18px',
                                                                                    backgroundColor: selectedServices.some(
                                                                                        (service) => service.title === opt.title && service.parent === opt.parent
                                                                                    )
                                                                                        ? 'black'
                                                                                        : 'white',
                                                                                    color: selectedServices.some(
                                                                                        (service) => service.title === opt.title && service.parent === opt.parent
                                                                                    )
                                                                                        ? 'white'
                                                                                        : 'black',
                                                                                    borderRadius: '6px',
                                                                                }} htmlFor={opt.title}>
                                                                                    <img src={check}
                                                                                         style={{margin: '3.5px'}}/>
                                                                                </label>
                                                                                <label style={{
                                                                                    margin: '0 0 0 5px',
                                                                                    padding: '2px 6px',
                                                                                    borderRadius: '4px',
                                                                                }} htmlFor={opt.title}>
                                                                                    {opt.title}
                                                                                </label>
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                className={classes.OneUnderUnderCategoryCheckItem}
                                                                                style={{
                                                                                    margin: '5px 0',
                                                                                    borderBottom: 'none',
                                                                                }}
                                                                                key={opt.title}>
                                                                                <div
                                                                                    style={{
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        justifyContent: 'space-between'
                                                                                    }}
                                                                                    onClick={() => handleDownCategoryClick(opt.title)}
                                                                                >
                                                                                    <p style={{margin: '5px 0'}}>
                                                                                        {opt.title}
                                                                                    </p>
                                                                                    <img style={{marginTop: '5px'}}
                                                                                         src={selectedDownCategory === opt.title ? arrowUp : arrowDown}/>
                                                                                </div>

                                                                                {selectedDownCategory === opt.title && (
                                                                                    <div style={{
                                                                                        padding: "0",
                                                                                        borderLeft: "#DDDDDD solid 0px",
                                                                                    }}>
                                                                                        {array.find((category) => category.title === opt.title)
                                                                                            .subsubcategories.map((opt, index, array) => (
                                                                                                <div
                                                                                                    className={classes.OneUnderCategoryCheckItem}
                                                                                                    style={{borderBottom: selectedDownCategory === opt.title || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',}}
                                                                                                    key={opt.title}>
                                                                                                    <div style={{
                                                                                                        display: 'flex',
                                                                                                        alignItems: 'center'
                                                                                                    }}>
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            id={opt.title}
                                                                                                            name={opt.title}
                                                                                                            style={{display: 'none'}}
                                                                                                            value={opt.title}
                                                                                                            onChange={(event) => handleServiceCheckboxChange(event, opt.title, opt.parent)}
                                                                                                            checked={selectedServices.some(service => service.title === opt.title && service.parent === opt.parent)}
                                                                                                        />
                                                                                                        <label style={{
                                                                                                            margin: '0 0 0 5px',
                                                                                                            width: '18px',
                                                                                                            border: '#000 solid 3px',
                                                                                                            height: '18px',
                                                                                                            backgroundColor: selectedServices.some(
                                                                                                                (service) => service.title === opt.title && service.parent === opt.parent
                                                                                                            )
                                                                                                                ? 'black'
                                                                                                                : 'white',
                                                                                                            color: selectedServices.some(
                                                                                                                (service) => service.title === opt.title && service.parent === opt.parent
                                                                                                            )
                                                                                                                ? 'white'
                                                                                                                : 'black',
                                                                                                            borderRadius: '6px',
                                                                                                        }}
                                                                                                               htmlFor={opt.title}>
                                                                                                            <img
                                                                                                                src={check}
                                                                                                                style={{margin: '3.5px'}}/>
                                                                                                        </label>
                                                                                                        <label style={{
                                                                                                            margin: '0 0 0 5px',
                                                                                                            padding: '2px 6px',
                                                                                                            borderRadius: '4px',
                                                                                                        }}
                                                                                                               htmlFor={opt.title}>
                                                                                                            {opt.title}
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>))}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )
                                                                        }

                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        }
                                        {error && <div className={styles.error_msg}>{error}</div>}
                                        <button style={{
                                            display: 'flex',
                                            border: 'none',
                                            outline: 'none',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            padding: '12px 0',
                                            backgroundColor: '#000000',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            width: '180px',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            margin: '15px 0'
                                        }} onClick={handleServicesConfirmation}>Подтвердить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default AddServ;
