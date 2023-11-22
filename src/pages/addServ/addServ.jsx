import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {deleteService, updateProfile, userProfile, viewServices} from "../../httpRequests/cisdealsApi";
import styles from "./styles.module.css";
import arrowDown from "../../img/arrow_down=24.svg";
import plus from "../../img/Plus.svg";
import xMark from '../../img/x-mark=24.svg'
import back from "../../img/Arrow_left.svg";

const AddServ = () => {
    const {UserPage} = useParams();
    const location = useLocation();
    const progressBarRef = useRef(null);
    const targetWidth = 100;
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [serv, setServ] = useState([]);
    const [deleteObjId, setDeleteObjId] = useState(null);
    const [selectedServv, setSelectedServv] = useState("");
    const [selectedUser, setSelectedUser] = useState({});
    const [servicesString, setServicesString] = useState('');
    const [selectedServicess, setSelectedServicess] = useState([]);
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

    const handleDeleteClick = (objId) => {
        setDeleteModal(true);
        setDeleteObjId(objId);
    };

    const fetchUserServicess = async (UserPage) => {
        try {
            const data = await viewServices(UserPage);
            setServ(data)
            const servicesString = await data.map(service => [service.title, service.parent]).reduce((acc, curr) => {
                if (!acc.includes(curr.join())) {
                    acc.push(curr.join());
                }
                return acc;
            }, []).join(', ').toString();
            setUserData({...userData, services: servicesString});
            await updateProfile(UserPage, userData);
        } catch (err) {
            console.log(err)
        }
    };
    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(userId);
            setSelectedUser(data.profile);
            console.log(data.profile);
            if (data.profile.areasActivity !== 'areasActivity') {
                setSelectedServv(data.profile.areasActivity);
                setSelectedServicess(data.profile.areasActivity.split(' / '));
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchUserServicess(UserPage);
        fetchUserProfile(UserPage);
    }, []);

    useEffect(() => {
        sendDataToServer();
    }, [servicesString]);
    const sendDataToServer = async () => {
        const updatedServ = await viewServices(UserPage);
        setServ(updatedServ);
        const servicesStr = updatedServ.map(service => [service.title, service.parent]).reduce((acc, curr) => {
            if (!acc.includes(curr.join())) {
                acc.push(curr.join());
            }
            return acc;
        }, []).join(', ').toString();
        setServicesString(servicesStr);
        await updateProfile(UserPage, {...userData, services: servicesString});
    };
    const servDelete = async (ServId) => {
        try {
            await deleteService(ServId);
            setDeleteModal(false);
            const updatedServ = await viewServices(UserPage);
            setServ(updatedServ);
        } catch (err) {
            console.log(err)
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
        <div className={styles.signup_container}>
            <div className="main-container">
                {location.pathname === `/AddLoginServ/${UserPage}` && (
                    <div className="ProgressBarBlock">
                        <div className="ProgressBarLine" ref={progressBarRef} style={{ width: `86%` }}>
                        </div>
                    </div>
                )}
                <Link className="form-update-link"
                      to={(location.pathname === `/AddLoginServ/${UserPage}`)
                          ? `/AddImage/${UserPage}`
                          : "/EditProfile"}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <p className="form-heading">
                    {(location.pathname === `/AddLoginServ/${UserPage}`)
                        ? "Добавление услуг"
                        : "Изменение услуг"}</p>
                <div className={styles.form_container}>
                    <div className={styles.categories_link_container}>
                        <div className={styles.categories_link_content}>
                            <div className={styles.categories_link_header}>
                                <h5 className={styles.categories_link_heading}>Категории</h5>
                                <p className={styles.categories_link_info}>
                                    {`${selectedServicess.length}/3`}
                                </p>
                            </div>
                            <Link to={(location.pathname === `/AddLoginServ/${UserPage}`)
                                ? `/AddLoginServ/addServCategories/${UserPage}`
                                : `/addServ/addServCategories/${UserPage}`}>
                                <button className={`${styles.inputBtn} ${styles.categories_link}`}>
                                    <div className={styles.categories_link_buttonContent}>
                                        <p className={styles.categories_link_buttonText}>
                                            {selectedServv || "Выбрать услугу"}
                                        </p>
                                        <img className={styles.categories_link_arrowIcon} src={arrowDown} alt={'>'}/>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {selectedUser.areasActivity !== 'areasActivity' && (
                    <div className={styles.form_container}>
                        <div className={styles.form_serv_block}>
                            <div style={{display: serv.length === 0 ? 'none' : null, marginBottom: '-10px'}}>
                                <div className={styles.serv_area_block}>
                                    {Object.entries( serv.reduce((acc, obj) => {
                                            if (obj.parent in acc) {
                                                acc[obj.parent].push(obj);
                                            } else {
                                                acc[obj.parent] = [obj];
                                            }
                                            return acc
                                        }, {})
                                    ).map(([parent, data]) => (
                                        <div key={parent} className={styles.serv_area_parent}>
                                            <p className={styles.serv_parent_title}>{parent}</p>
                                            {data.map((obj, dataIndex) => (
                                                <div key={obj.title}>
                                                    <div className={styles.serv_item}>
                                                        <div>
                                                            <img className={styles.serv_item_delete_btn}
                                                                 onClick={() => handleDeleteClick(obj._id)}
                                                                 src={xMark}/>
                                                        </div>
                                                        <Link
                                                            className={styles.serv_screen_link}
                                                            to={(location.pathname === `/AddLoginServ/${UserPage}`)
                                                            ? `/AddLoginServ/${UserPage}/UserServScreen/${obj._id}`
                                                            : `/addServ/${UserPage}/UserServScreen/${obj._id}`}>
                                                            <div className={styles.serv_screen_link_block}>
                                                                <p className={styles.serv_screen_link_text}>{obj.title}</p>
                                                                {obj.description !== 'description' && (
                                                                    <p className={styles.serv_screen_link_description}>{obj.description}</p>
                                                                )}
                                                            </div>
                                                            <div className={styles.serv_screen_time}>
                                                                <div  className={styles.serv_screen_time_block}>
                                                                    {obj.prise !== 'prise' && (
                                                                        <p className={styles.serv_screen_link_prise}>{`${obj.prise} zł`}</p>
                                                                    )}
                                                                    <div className={styles.serv_screen_time}>
                                                                        {obj.days !== 'days' && (
                                                                            <p className={styles.serv_screen_link_time}>{`${obj.days}д`}</p>
                                                                        )}
                                                                        {obj.hours !== 'hours' && (
                                                                            <p className={styles.serv_screen_link_time}>{`${obj.hours}ч`}</p>
                                                                        )}
                                                                        {obj.minutes !== 'minutes' && (
                                                                            <p className={styles.serv_screen_link_time}>{`${obj.minutes}мин`}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <img className={styles.serv_item_link_btn} src={arrowDown}/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    {deleteModal && deleteObjId === obj._id && (
                                                        <div className={styles.delete_modal_overlay}>
                                                            <div className={styles.delete_modal_block}>
                                                                <p className={styles.delete_modal_text}>Вы уверены, что хотите удалить
                                                                    услугу <b>{`"${obj.title}"`}</b>?</p>
                                                                <div className={styles.delete_modal_btn_block}>
                                                                    <div className={styles.delete_modal_nodelete_btn}
                                                                         onClick={() => setDeleteModal(false)}>
                                                                        <p>Не удалять</p>
                                                                    </div>
                                                                    <div className={styles.delete_modal_delete_btn}
                                                                         onClick={() => servDelete(deleteObjId)}>
                                                                        <p>Удалить</p>
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
                            <Link to={(location.pathname === `/AddLoginServ/${UserPage}`)
                                ? `/AddLoginServ/addingServicesList/${UserPage}`
                                : `/addServ/addingServicesList/${UserPage}`}>
                                <button className={styles.addServBtn}
                                        style={{margin: serv.length === 0 ? '3px 10px 10px' : '-5px 10px 10px'}}>
                                    <div className={styles.addServBtnBlock}>
                                        <img src={plus} alt={'+'}/>
                                        <p>{"Добавить услугу"}</p>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                {location.pathname === `/AddLoginServ/${UserPage}` ? (
                    <Link to={`/`}>
                        <button className={styles.endLoginServ}>
                            <p>{"Завершить настройку"}</p>
                        </button>
                    </Link>
                ) : (
                    <div><br/></div>
                )}
            </div>
        </div>
    );
};

export default AddServ;
