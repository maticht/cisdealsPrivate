import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {createUseStyles} from "react-jss";
import CategoriesJSON from '../../data/categories.json';
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
        justifyContent: "flex-start",
        padding: "15px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginRight:'10px'
    }

});


const AddDescription = () => {
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
    const [modalCitiesIsOpen, setModalCitiesIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedServ, setSelectedServ] = useState("");
    const [selectedCities, setSelectedCities] = useState("");

    const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);

    // Получение доступа к объекту CategoriesJSON.categories
    const categories = CategoriesJSON.categories;
    //
    // // Поиск элемента с выбранным значением selectedOption по параметру categoriesTitle
    // const selectedCategory = categories.find((category) => category.categoriestitle === selectedOption);
    //
    // // Создание нового массива, содержащего найденный элемент
    // const newSelectedCategoryArray = [selectedCategory];
    //
    // // Обновление состояния с помощью setSelectedCategoryArray
    // setSelectedCategoryArray(newSelectedCategoryArray);
    const classes = useStyles();


    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;

        if (value.length <= 900) {
            setData({ ...data, [name]: value });
        } else {
            setData({ ...data, [name]: value.slice(0, 900) });
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
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const { data: res } = await axios.put(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            navigate(`/AddLoginServ/${UserPage}`);
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

    const handleServicesConfirmation = () => {
        setData({ ...data, services: selectedServices.join(", ") });
        setSelectedServ(selectedServices.join(", "));
        setModalServIsOpen(false);
    };
    const handleCitiesClick = (city) => {
        setSelectedCities(city);
        setData({ ...data, city: city });
        setModalCitiesIsOpen(false);
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
    useEffect(() => {
        const progressBar = document.querySelector('#progressBar');
        progressBar.style.width = '75%';
    }, []);



    return (
        <div className={styles.signup_container}>
            <div style={{ width: "94%", height: "3px", background: "#fff", borderRadius:'5px', margin:'10px', alignSelf:'center' }}>
                <div id="progressBar" style={{ width: `62.5%`, height: "3px",transition: 'width 0.8s ease-in-out', background: "#5CA91A", borderRadius:'5px' }}></div>
            </div>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to={`/AddWorkingHours/${UserPage}`}>
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <div style={{justifyContent:"space-between", flexDirection:'row', display:'flex',alignItems:'center',}}>
                    <h1 style={{margin:"0 0 10px 10px"}}>Описание</h1>
                    <p style={{ margin: "0 10px 0 0", fontSize:'12px' }}>{data.description.length}/900</p>
                </div>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"15px 10px 12px 10px"}}>
                    <div>
                        <textarea
                            placeholder="Напишите описание"
                            name="description"
                            onChange={handleChange}
                            value={data.description}
                            required
                            className={`${styles.input} ${styles["input-top"]}`}
                        />
                    </div>
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                    Изменить
                </button>
                <Link style={{textDecoration:'none', fontSize:'13px', color:'#666', alignSelf:'center'}} to={`/AddLoginServ/${UserPage}`}>
                    Пропустить
                </Link>
            </form>
        </div>
    );
};

export default AddDescription;
