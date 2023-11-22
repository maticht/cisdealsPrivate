import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {createService, updateProfile, userProfile, viewServices} from "../../../httpRequests/cisdealsApi";
import Modal from './modalCustomServ';
import arrowDown from "../../../img/arrow_down=24.svg";
import arrowUp from "../../../img/UpProperty=24.svg";
import CategoriesJSON from "../../../data/categories.json";
import check from "../../../img/VectorCheck.svg"
import greenxMark from '../../../img/greenx-mark.svg'
import back from "../../../img/Arrow_left.svg";
import styles from "../styles.module.css";
import "./addingServicesList.css"

const AddingServicesList = () => {
    const {UserPage} = useParams();
    const navigate = useNavigate();
    const [modalServIsOpen, setModalServIsOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [serv, setServ] = useState([]);
    const [selectedServv, setSelectedServv] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedDownCategory, setSelectedDownCategory] = useState('');
    const [selectedDownDownCategory, setSelectedDownDownCategory] = useState('');
    const [error, setError] = useState("");
    const location = useLocation();
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

    const user = localStorage.getItem("token");
    let localUserObj = JSON.parse(user);
    let areasActivity = localUserObj.data ? localUserObj.data.areasActivity : null;
    let selected = areasActivity ? areasActivity.split(" / ") : [];
    const [selectedOption, setSelectedOption] = useState(selected);

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
            if (location.pathname === `/AddLoginServ/addingServicesList/${UserPage}`) {
                navigate(`/AddLoginServ/${UserPage}`);
            } else {
                navigate(`/addServ/${UserPage}`);
            }
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
        <div className={'serv_list_container'}>
            <div className="main-container">
                <Link className="form-update-link"
                      to={(location.pathname === `/AddLoginServ/addingServicesList/${UserPage}`)
                          ? `/AddLoginServ/${UserPage}`
                          : `/addServ/${UserPage}`}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <p className="form-heading">Выберите услуги</p>
                {selectedServices.length !== 0 ? (
                    <div className={'selectedCategoriesBlock'}>
                        <h5>Выбранные категории</h5>
                        <div className={'selectedCategoriesList'}>
                            {selectedServices.map((service) => (
                                <div className={'selectedCategoriesItem'} key={`${service.title}-${service.parent}`}>
                                    <p>{service.title}</p>
                                    <img src={greenxMark}
                                         onClick={() => handleRemoveService(service.title, service.parent)}>
                                    </img>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                <div>
                    <div className={'allCategoriesBlock'}>
                        {selectedOption !== "" &&
                            CategoriesJSON.categories.filter(category => selectedOption.includes(category.categoriestitle)).map((option, index, array) => (
                                <div className={'oneCategoryCheckItemBlock'} key={option.categoriestitle}>
                                    <div className={'oneCategoryCheckItem'}
                                        style={{
                                            borderBottom:
                                                (CategoriesJSON.categories.filter(category => selectedOption.includes(category.categoriestitle)).length - 1 === index)
                                                ? "#DDDDDD solid 0px" : "#DDDDDD solid 1px",
                                        }}
                                        onClick={() => handleCategoryClick(option.categoriestitle)}
                                    >
                                        <h4>{option.categoriestitle}</h4>
                                        <img src={selectedCategory === option.categoriestitle ? arrowUp : arrowDown}/>
                                    </div>
                                    {selectedCategory === option.categoriestitle && (
                                        <div className={'oneCategoryCheckItemCategoriesBlock'}
                                             style={{
                                                 borderBottom:
                                                     (CategoriesJSON.categories.filter(category =>
                                                         selectedOption.includes(category.categoriestitle)).length - 1 === index)
                                                         ? "#DDDDDD solid 0px" : "#DDDDDD solid 1px",
                                                 borderTop:
                                                     (CategoriesJSON.categories.filter(category =>
                                                         selectedOption.includes(category.categoriestitle)).length - 1 === index)
                                                         ? "#DDDDDD solid 1px" : "#DDDDDD solid 0px",
                                             }}
                                        >
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
                                                        className={'OneUnderCategoryCheckItemMain'}
                                                        style={{borderBottom: selectedCategory === opt.title || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',}}
                                                        key={opt.title}>
                                                        {opt.subsubcategories.length === 0 ? (
                                                            <div className={'OneUnderCategoryCheckItemMainBlock'}>
                                                                <input
                                                                    type="checkbox"
                                                                    id={opt.title}
                                                                    name={opt.title}
                                                                    style={{display: 'none'}}
                                                                    value={opt.title}
                                                                    onChange={(event) => handleServiceCheckboxChange(event, opt.title, opt.parent)}
                                                                    checked={selectedServices.some(service => service.title === opt.title && service.parent === opt.parent)}
                                                                />
                                                                <label className={'OneUnderCategoryCheckboxLabel'} style={{
                                                                    backgroundColor: selectedServices.some((service) => service.title === opt.title && service.parent === opt.parent) ? 'black' : 'white',
                                                                    color: selectedServices.some((service) => service.title === opt.title && service.parent === opt.parent) ? 'white' : 'black',
                                                                }} htmlFor={opt.title}>
                                                                    <img src={check}/>
                                                                </label>
                                                                <label className={'OneUnderCategoryCheckboxOption'} htmlFor={opt.title}>
                                                                    {opt.title}
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <div className={'OneUnderUnderCategoryCheckFirstItem'} key={opt.title}>
                                                                <div className={'selectedDownDown'}
                                                                    onClick={() => handleDownCategoryClick(opt.title)}>
                                                                    <div className={'selectedDownDownBlock'}>
                                                                        <p className={'selectedDownDownTitle'}>{opt.title}</p>
                                                                        <div>
                                                                            <img className={'selectedDownDownArrow'}
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
                                                                                    className={'OneUnderCategoryCheckItem'}
                                                                                    style={{borderBottom: selectedDownCategory === opt.title || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',}}
                                                                                    key={opt.title}>
                                                                                    {!opt.subsubsubcategories ? (
                                                                                        <div className={'OneUnderCategoryCheckItemBlock'}>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                id={opt.title}
                                                                                                name={opt.title}
                                                                                                style={{display: 'none'}}
                                                                                                value={opt.title}
                                                                                                onChange={(event) => handleServiceCheckboxChange(event, opt.title, opt.parent)}
                                                                                                checked={selectedServices.some(service => service.title === opt.title && service.parent === opt.parent)}
                                                                                            />
                                                                                            <label className={'OneUnderCategoryCheckboxLabel'}
                                                                                                style={{
                                                                                                    backgroundColor: selectedServices.some((service) => service.title === opt.title && service.parent === opt.parent) ? 'black' : 'white',
                                                                                                    color: selectedServices.some((service) => service.title === opt.title && service.parent === opt.parent) ? 'white' : 'black',
                                                                                                }}
                                                                                                htmlFor={opt.title}>
                                                                                                <img src={check}/>
                                                                                            </label>
                                                                                            <label className={'OneUnderCategoryCheckboxOption'} htmlFor={opt.title}>
                                                                                                {opt.title}
                                                                                            </label>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div>{opt.subsubsubcategories.length !== 0 ? (
                                                                                                <div className={'OneUnderUnderCategoryCheckItem'} key={opt.title}>
                                                                                                    <div className={'selectedDownDown'}
                                                                                                        onClick={() => handleDownDownCategoryClick(opt.title)}>
                                                                                                        <div className={'selectedDownDownBlock'}>
                                                                                                            <p className={'selectedDownDownTitle'}>{opt.title}</p>
                                                                                                            <div>
                                                                                                                <img className={'selectedDownDownArrow'}
                                                                                                                    src={selectedDownDownCategory === opt.title ? arrowUp : arrowDown}/>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    {selectedDownDownCategory === opt.title && (
                                                                                                        <div>
                                                                                                            {array.find((category) => category.title === opt.title)
                                                                                                                .subsubsubcategories.map((opt, index, array) => (
                                                                                                                    <div
                                                                                                                        className={'OneUnderCategoryCheckboxItem'}
                                                                                                                        style={{
                                                                                                                            borderBottom: selectedDownCategory === opt.title || index === array.length - 1 ? 'none' : '1px solid #DDDDDD',
                                                                                                                        }}>
                                                                                                                        <input
                                                                                                                            type="checkbox" id={opt.title} name={opt.title}
                                                                                                                            value={opt.title}
                                                                                                                            style={{display: 'none'}}
                                                                                                                            onChange={(event) => handleServiceCheckboxChange(event, opt.title, opt.parent)}
                                                                                                                            checked={selectedServices.some(service => service.title === opt.title && service.parent === opt.parent)}
                                                                                                                        />
                                                                                                                        <label className={'OneUnderCategoryCheckboxLabel'}
                                                                                                                            style={{
                                                                                                                                backgroundColor: selectedServices.some((service) => service.title === opt.title && service.parent === opt.parent) ? 'black' : 'white',
                                                                                                                                color: selectedServices.some((service) => service.title === opt.title && service.parent === opt.parent) ? 'white' : 'black',
                                                                                                                            }} htmlFor={opt.title}>
                                                                                                                            <img src={check}/>
                                                                                                                        </label>
                                                                                                                        <label className={'OneUnderCategoryCheckboxOption'} htmlFor={opt.title}>
                                                                                                                            {opt.title}
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                ))}
                                                                                                            <div className={'selectedDownCategoryBlock'}>
                                                                                                                {selectedDownDownCategory === opt.title ?
                                                                                                                    <button className={'selectedDownCategory'}
                                                                                                                        onClick={() => handleModalOpen(selectedDownDownCategory)}>
                                                                                                                        Добавить свою категорию
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
                                                                                            : null}
                                                                                        </div>)}
                                                                                </div>)
                                                                            )}
                                                                    </div>
                                                                )}
                                                                <div className={'selectedDownCategoryBlock'}>
                                                                    {selectedDownCategory === opt.title ?
                                                                        <button className={'selectedDownCategory'}
                                                                                onClick={() => handleModalOpen(selectedDownCategory)}>
                                                                            Добавить свою категорию
                                                                        </button>
                                                                        : null
                                                                    }
                                                                    <Modal isOpen={modalOpen}
                                                                           onClose={handleCloseModal}
                                                                           handleModalResult={handleModalResult}
                                                                           parentCategory={parentCategory}
                                                                           selectedUser={selectedUser}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button className={'submitServicesConfirmation'}
                            onClick={handleServicesConfirmation}>
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AddingServicesList;
