import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {createService, deleteService, updateProfile, userProfile, viewServices} from "../../../httpRequests/cisdealsApi";
import {createUseStyles} from "react-jss";
import Modal from './modalCustomServ';
import styles from "../styles.module.css";
import arrowDown from "../../../img/arrow_down=24.svg";
import arrowUp from "../../../img/UpProperty=24.svg";
import plus from "../../../img/Plus.svg";
import CategoriesJSON from "../../../data/categories.json";
import check from "../../../img/VectorCheck.svg"
import xMark from '../../../img/x-mark=24.svg'
import greenxMark from '../../../img/greenx-mark.svg'

const useStyles = createUseStyles({
    overlay: {
        height: "100%",
        width: '100%',
        margin: '0 auto',
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f5f5f5',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        overflow: "auto"
    },
    modal: {
        padding: '0 10px',
        backgroundColor: '#f5f5f5',
        width: "calc(100% - 20px)",
        height: "100%",
        maxWidth: '800px',

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
        marginRight: '8px'
    },
    OneCategoryCheckItem: {
        display: "flex",
        backgroundColor: '#fff',
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "10px 10px 10px ",
        textDecoration: "none",
        color: "#000000",
        borderRadius: '8px',
        margin: '5px 0 5px 0'
    },
    OneUnderCategoryCheckItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "15px 0 10px 10px",
        borderBottom: "#DDDDDD solid 1px",
        borderLeft: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginLeft: '0'
    },
    OneUnderUnderCategoryCheckItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        textDecoration: "none",
        color: "#000000",
        marginLeft: '10px'
    },


});
const AddingServicesList = () => {
    const {UserPage} = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [serv, setServ] = useState([]);
    const [deleteObjId, setDeleteObjId] = useState(null);
    const [errorServ, setErrorServ] = useState("");
    const [modalServvIsOpen, setModalServvIsOpen] = useState(false);
    const [selectedServv, setSelectedServv] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedDownCategory, setSelectedDownCategory] = useState('');
    const [selectedDownDownCategory, setSelectedDownDownCategory] = useState('');
    const [error, setError] = useState("");
    const [servicesString, setServicesString] = useState('');
    const [selectedServicess, setSelectedServicess] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [parentCategory, setParentCategory] = useState('');
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

    const user = localStorage.getItem("token");
    let localUserObj = JSON.parse(user);
    let areasActivity = localUserObj.data ? localUserObj.data.areasActivity : null;
    let selected = areasActivity ? areasActivity.split(" / ") : [];
    const [selectedOption, setSelectedOption] = useState(selected);

    const handleDeleteClick = (objId) => {
        setDeleteModal(true);
        setDeleteObjId(objId);
    };

    const fetchUserServicess = async (userId) => {
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
            if (data.profile.areasActivity !== 'areasActivity') {
                console.log('del er act');
                setSelectedServv(data.profile.areasActivity);
                setSelectedUser(data.profile);
                setSelectedServicess(data.profile.areasActivity.split(' / '));
                console.log(selectedServices);
            }
            console.log(selectedServices);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserServicess(UserPage);
        fetchUserProfile(UserPage);
    }, []);

    const handleCategoryClick = (categoryTitle) => {
        setSelectedCategory(selectedCategory === categoryTitle ? '' : categoryTitle);
    };
    const handleDownCategoryClick = (categoryTitle) => {
        setSelectedDownCategory(selectedDownCategory === categoryTitle ? '' : categoryTitle);
    };
    const handleDownDownCategoryClick = (categoryTitle) => {
        setSelectedDownDownCategory(selectedDownDownCategory === categoryTitle ? '' : categoryTitle);
    };

    const handleOpenServModal = (e) => {
        e.preventDefault();
        setModalServIsOpen(true);
    };

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
                const res = await createService(dataForService);
                console.log(res);
            } catch (error) {
                success = false;
                if (error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.error);
                }
            }
        }
        if (success) {
            navigate(`/addServ/${UserPage}`);
            sendDataToServer();
        }
    };

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


    const handleOpenServModalServ = (e) => {
        e.preventDefault();
        setModalServvIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleModalResult = (title, parent) => {
        console.log(title, parent)
        setSelectedServices([...selectedServices, {title: title, parent: parent}]);
    };
    const handleModalOpen = (parent) => {
        setParentCategory(parent)
        setModalOpen(true);
    };

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <Link to={`/addServ/${UserPage}`}>
                    {`< Назад`}
                </Link>
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
                                        margin: '3px 0 4px 1px',
                                        fontSize: '14px'
                                    }}>{service.title}</p>
                                    <img style={{margin: '1px 0 0 5px'}} src={greenxMark}
                                         onClick={() => handleRemoveService(service.title, service.parent)}></img>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                <h2 style={{margin: '15px 0 7px 0'}}>Выберите услугу</h2>
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        {selectedOption !== "" &&
                            CategoriesJSON.categories.filter(category => selectedOption.includes(category.categoriestitle)).map((option, index, array) => (
                                <div
                                    className={classes.OneCategoryCheckItem}
                                    key={option.categoriestitle}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            cursor: 'pointer',
                                            margin: '0 0 3px 0'
                                        }}
                                        onClick={() => handleCategoryClick(option.categoriestitle)}
                                    >
                                        <h4 style={{margin: '5px 0'}}>
                                            {option.categoriestitle}
                                        </h4>
                                        <img style={{
                                            marginTop: '5px',
                                            width: '20px',
                                            marginLeft: "10px"
                                        }}
                                             src={selectedCategory === option.categoriestitle ? arrowUp : arrowDown}/>
                                    </div>

                                    {selectedCategory === option.categoriestitle && (
                                        <div>
                                            {array
                                                .find((category) => category.categoriestitle === option.categoriestitle)
                                                .subcategories
                                                .sort((a, b) => {
                                                    if (a.subsubcategories.length !== 0 && b.subsubcategories.length === 0) {
                                                        return -1;
                                                    } else if (a.subsubcategories.length === 0 && b.subsubcategories.length !== 0) {
                                                        return 1;
                                                    } else {
                                                        return 0;
                                                    }
                                                })
                                                .map((opt, index, array) => (
                                                    <div
                                                        className={classes.OneUnderCategoryCheckItem}
                                                        style={{
                                                            borderBottom: selectedCategory === opt.title || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',
                                                        }}
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
                                                                    margin: '1px 0 8px 5px',
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
                                                                    cursor: 'pointer'
                                                                }} htmlFor={opt.title}>
                                                                    <img src={check}
                                                                         style={{margin: '3.5px'}}/>
                                                                </label>
                                                                <label style={{
                                                                    margin: '1px 0 8px 5px',
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
                                                                        width: '100%',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        flexDirection: 'column',

                                                                    }}
                                                                    onClick={() => handleDownCategoryClick(opt.title)}
                                                                >
                                                                    <div style={{
                                                                        width: '100%',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'space-between',
                                                                        cursor: 'pointer',
                                                                        margin: '0 0 5px 0'
                                                                    }}>
                                                                        <p style={{
                                                                            margin: '0 0 5px 0',
                                                                            fontWeight: '500'
                                                                        }}>
                                                                            {opt.title}
                                                                        </p>
                                                                        <div style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            flexDirection: 'row',
                                                                        }}>
                                                                            <img
                                                                                style={{
                                                                                    marginTop: '0',
                                                                                    width: '20px',
                                                                                    marginLeft: "10px"
                                                                                }}
                                                                                src={selectedDownCategory === opt.title ? arrowUp : arrowDown}/>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                {selectedDownCategory === opt.title && (
                                                                    <div style={{
                                                                        padding: "0",
                                                                        borderLeft: "#DDDDDD solid 0px",
                                                                    }}>
                                                                        {array.find((category) => category.title === opt.title)
                                                                            .subsubcategories.sort((a, b) => {
                                                                                const aHasSubsubsub = Array.isArray(a.subsubsubcategories);
                                                                                const bHasSubsubsub = Array.isArray(b.subsubsubcategories);
                                                                                if (aHasSubsubsub && !bHasSubsubsub) {
                                                                                    return -1;
                                                                                } else if (!aHasSubsubsub && bHasSubsubsub) {
                                                                                    return 1;
                                                                                } else if (aHasSubsubsub && bHasSubsubsub) {
                                                                                    if (a.subsubsubcategories.length !== b.subsubsubcategories.length) {
                                                                                        return a.subsubsubcategories.length - b.subsubsubcategories.length;
                                                                                    }
                                                                                }
                                                                                return 0;
                                                                            }).map((opt, index, array) => (
                                                                                <div
                                                                                    className={classes.OneUnderCategoryCheckItem}
                                                                                    style={{borderBottom: selectedDownCategory === opt.title || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',}}
                                                                                    key={opt.title}>
                                                                                    {!opt.subsubsubcategories ? (
                                                                                        <div
                                                                                            style={{
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
                                                                                            <label
                                                                                                style={{
                                                                                                    margin: '0 0 7px 0',
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
                                                                                                    cursor: 'pointer'
                                                                                                }}
                                                                                                htmlFor={opt.title}>
                                                                                                <img
                                                                                                    src={check}
                                                                                                    style={{margin: '3.5px'}}/>
                                                                                            </label>
                                                                                            <label
                                                                                                style={{
                                                                                                    margin: '0 0 7px 5px',
                                                                                                    padding: '2px 6px',
                                                                                                    borderRadius: '4px',
                                                                                                }}
                                                                                                htmlFor={opt.title}>
                                                                                                {opt.title}
                                                                                            </label>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div>{opt.subsubsubcategories.length !== 0 ? (
                                                                                                <div
                                                                                                    className={classes.OneUnderUnderCategoryCheckItem}
                                                                                                    style={{
                                                                                                        margin: '2px 0',
                                                                                                        borderBottom: 'none',
                                                                                                    }}
                                                                                                    key={opt.title}>
                                                                                                    <div
                                                                                                        style={{
                                                                                                            display: 'flex',
                                                                                                            alignItems: 'center',
                                                                                                            flexDirection: 'column',
                                                                                                            justifyContent: 'space-between'
                                                                                                        }}
                                                                                                        onClick={() => handleDownDownCategoryClick(opt.title)}
                                                                                                    >
                                                                                                        <div
                                                                                                            style={{
                                                                                                                width: '100%',
                                                                                                                display: 'flex',
                                                                                                                alignItems: 'center',
                                                                                                                flexDirection: 'row',
                                                                                                                justifyContent: 'space-between',
                                                                                                                cursor: 'pointer',
                                                                                                                margin: '0 0 3px 0'
                                                                                                            }}>
                                                                                                            <p style={{
                                                                                                                margin: '0 0 7px 0',
                                                                                                                fontWeight: '500'
                                                                                                            }}>
                                                                                                                {opt.title}
                                                                                                            </p>
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    display: 'flex',
                                                                                                                    alignItems: 'center',
                                                                                                                    flexDirection: 'row',
                                                                                                                }}>
                                                                                                                <img
                                                                                                                    style={{
                                                                                                                        marginTop: '0',
                                                                                                                        width: '20px',
                                                                                                                        marginLeft: "10px"
                                                                                                                    }}
                                                                                                                    src={selectedDownDownCategory === opt.title ? arrowUp : arrowDown}/>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    {selectedDownDownCategory === opt.title && (
                                                                                                        <div>
                                                                                                            {array.find((category) => category.title === opt.title)
                                                                                                                .subsubsubcategories.map((opt, index, array) => (
                                                                                                                    <div
                                                                                                                        className={classes.OneUnderCategoryCheckItem}
                                                                                                                        style={{
                                                                                                                            margin: '0 0 0 0',
                                                                                                                            display: 'flex',
                                                                                                                            flexDirection: 'row',
                                                                                                                            alignItems: 'center',
                                                                                                                            borderBottom: selectedDownCategory === opt.title || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',
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
                                                                                                                        <label
                                                                                                                            style={{
                                                                                                                                margin: '0 0 7px 5px',
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
                                                                                                                                cursor: 'pointer'
                                                                                                                            }}
                                                                                                                            htmlFor={opt.title}>
                                                                                                                            <img
                                                                                                                                src={check}
                                                                                                                                style={{margin: '3.5px'}}/>
                                                                                                                        </label>
                                                                                                                        <label
                                                                                                                            style={{
                                                                                                                                margin: '0 0 7px 5px',
                                                                                                                                padding: '2px 6px',
                                                                                                                                borderRadius: '4px',
                                                                                                                            }}
                                                                                                                            htmlFor={opt.title}>
                                                                                                                            {opt.title}
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                ))}
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    width: 'calc(100% + 10px)',
                                                                                                                    display: 'flex',
                                                                                                                    alignItems: 'center',
                                                                                                                    flexDirection: 'row',
                                                                                                                    alignSelf: 'flex-start'
                                                                                                                }}>
                                                                                                                {selectedDownDownCategory === opt.title ?
                                                                                                                    <button
                                                                                                                        style={{
                                                                                                                            display: 'flex',
                                                                                                                            border: '2px solid #000',
                                                                                                                            outline: 'none',
                                                                                                                            justifyContent: 'center',
                                                                                                                            alignItems: 'center',
                                                                                                                            alignSelf: 'center',
                                                                                                                            padding: '13px 12px 13px 12px',
                                                                                                                            backgroundColor: '#fff',
                                                                                                                            borderRadius: '10px',
                                                                                                                            color: '#000',
                                                                                                                            width: '100%',
                                                                                                                            fontWeight: 'bold',
                                                                                                                            fontSize: '14px',
                                                                                                                            cursor: 'pointer',
                                                                                                                            margin: '10px 15px 0px 0'
                                                                                                                        }}
                                                                                                                        onClick={() => handleModalOpen(selectedDownDownCategory)}>
                                                                                                                        Добавить
                                                                                                                        свою
                                                                                                                        категорию
                                                                                                                    </button>
                                                                                                                    : null
                                                                                                                }
                                                                                                                <Modal
                                                                                                                    isOpen={modalOpen}
                                                                                                                    onClose={handleCloseModal}
                                                                                                                    handleModalResult={handleModalResult}
                                                                                                                    parentCategory={parentCategory}/>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )}

                                                                                                </div>)
                                                                                            :
                                                                                            null}
                                                                                        </div>)}
                                                                                </div>))}
                                                                    </div>
                                                                )}
                                                                <div style={{
                                                                    width: 'calc(100% + 10px)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    alignSelf: 'flex-start'
                                                                }}>
                                                                    {selectedDownCategory === opt.title ?
                                                                        <button style={{
                                                                            display: 'flex',
                                                                            border: '2px solid #000',
                                                                            outline: 'none',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center',
                                                                            padding: '13px 12px 13px 12px',
                                                                            backgroundColor: '#fff',
                                                                            borderRadius: '10px',
                                                                            color: '#000',
                                                                            width: '100%',
                                                                            fontWeight: 'bold',
                                                                            fontSize: '14px',
                                                                            cursor: 'pointer',
                                                                            margin: '10px 15px 0px 0'
                                                                        }}
                                                                                onClick={() => handleModalOpen(selectedDownCategory)}>
                                                                            Добавить свою категорию
                                                                        </button>
                                                                        : null
                                                                    }
                                                                    <Modal isOpen={modalOpen}
                                                                           onClose={handleCloseModal}
                                                                           handleModalResult={handleModalResult}
                                                                           parentCategory={parentCategory}
                                                                           selectedUser={selectedUser}/>
                                                                </div>
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
                            margin: '10px 0'
                        }} onClick={handleServicesConfirmation}>Подтвердить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddingServicesList;
