import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {createUseStyles} from "react-jss";
import CategoriesJSON from '../../data/categories.json';
import line from '../../img/Line 26.svg'


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


const UpdateWorkingHours = () => {
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
        workingHoursMon: {
            startHours1:'',
            startMinutes1:'',
            endHours1:'',
            endMinutes1:'',
        },
        workingHoursTue: {
            startHours2:'',
            startMinutes2:'',
            endHours2:'',
            endMinutes2:'',
        },
        workingHoursWed: {
            startHours3:'',
            startMinutes3:'',
            endHours3:'',
            endMinutes3:'',
        },
        workingHoursThu: {
            startHours4:'',
            startMinutes4:'',
            endHours4:'',
            endMinutes4:'',
        },
        workingHoursFri: {
            startHours5:'',
            startMinutes5:'',
            endHours5:'',
            endMinutes5:'',
        },
        workingHoursSat: {
            startHours6:'',
            startMinutes6:'',
            endHours6:'',
            endMinutes6:'',
        },
        workingHoursSun: {
            startHours7:'',
            startMinutes7:'',
            endHours7:'',
            endMinutes7:'',
        },
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

    const [workingMon, setWorkingMon] = useState(true);
    const [workingTue, setWorkingTue] = useState(true);
    const [workingWed, setWorkingWed] = useState(true);
    const [workingThu, setWorkingThu] = useState(true);
    const [workingFri, setWorkingFri] = useState(true);
    const [workingSat, setWorkingSat] = useState(false);
    const [workingSun, setWorkingSun] = useState(false);

    const navigate = useNavigate();
    const handleChange = ({ target }) => {
        const [working, time] = target.name.split("-");
        let value = target.value;

        if (target.name.includes("startHours") || target.name.includes("endHours")) {
            if (!isNaN(value)) {
                if (Number(value) > 23) {
                    setData({
                        ...data,
                        [working]: {
                            ...data[working],
                            [time]: "23"
                        }
                    });
                } else {
                    if (value.length < 2 || (value.length === 2 && value.charAt(0) !== "0" && value !== "0")) {
                        value = "0" + value;
                    }
                    else if (value > 9 && value.charAt(0) === "0") {
                        let zerosToRemove = 0;
                        for (let i = 0; i < value.length - 1; i++) {
                            if (value.charAt(i) === "0") {
                                zerosToRemove++;
                            } else {
                                break;
                            }
                        }
                        if (zerosToRemove > 0) {
                            value = value.substring(zerosToRemove);
                        }
                    }else if (value.length > 2) {
                        value = value.substring(1);
                    }
                    setData({
                        ...data,
                        [working]: {
                            ...data[working],
                            [time]: value
                        }
                    });
                }
            }
        }
        if (target.name.includes("startMinutes") || target.name.includes("endMinutes")) {
            if (!isNaN(value)) {
                if (Number(value) > 59) {
                    setData({
                        ...data,
                        [working]: {
                            ...data[working],
                            [time]: "59"
                        }
                    });
                } else {
                    if (value.length < 2 || (value.length === 2 && value.charAt(0) !== "0" && value !== "0")) {
                        value = "0" + value;
                    }
                    else if (value > 9 && value.charAt(0) === "0") {
                        let zerosToRemove = 0;
                        for (let i = 0; i < value.length - 1; i++) {
                            if (value.charAt(i) === "0") {
                                zerosToRemove++;
                            } else {
                                break;
                            }
                        }
                        if (zerosToRemove > 0) {
                            value = value.substring(zerosToRemove);
                        }
                    }else if (value.length > 2) {
                        value = value.substring(1);
                    }
                    setData({
                        ...data,
                        [working]: {
                            ...data[working],
                            [time]: value
                        }
                    });
                }
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const { data: res } = await axios.put(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            navigate(`/EditProfile`);
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

    return (
        <div className={styles.signup_container}>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to="/EditProfile">
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <h1 style={{margin:"0 0 0 10px"}}>Время работы</h1>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"15px 10px"}}>
                    <div>
                        <div style={{display:"flex",height:'38px', justifyContent:"space-between", alignItems:'center', margin:'0 0 10px 0',paddingBottom:'10px', borderBottom:'1.5px solid #DDDDDD'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" checked={workingMon} onChange={() => setWorkingMon(!workingMon)} />
                                    <span className={styles.switch} />
                                </label>
                                <h5 style={{margin:'0'}}>Понедельник</h5>
                            </div>
                            {!workingMon ? null : (
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursMon-startHours1"
                                            value={data.workingHoursMon.startHours1}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursMon-startMinutes1"
                                            value={data.workingHoursMon.startMinutes1}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <img style={{margin:'0 5px'}} src={line}/>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursMon-endHours1"
                                            value={data.workingHoursMon.endHours1}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursMon-endMinutes1"
                                            value={data.workingHoursMon.endMinutes1}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{display:"flex",height:'38px', justifyContent:"space-between", alignItems:'center', margin:'0 0 10px 0',paddingBottom:'10px', borderBottom:'1.5px solid #DDDDDD'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" checked={workingTue} onChange={() => setWorkingTue(!workingTue)} />
                                    <span className={styles.switch} />
                                </label>
                                <h5 style={{margin:'0'}}>Вторник</h5>
                            </div>
                            {!workingTue ? null : (
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursTue-startHours2"
                                            value={data.workingHoursTue.startHours2}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursTue-startMinutes2"
                                            value={data.workingHoursTue.startMinutes2}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <img style={{margin:'0 5px'}} src={line}/>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursTue-endHours2"
                                            value={data.workingHoursTue.endHours2}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursTue-endMinutes2"
                                            value={data.workingHoursTue.endMinutes2}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{display:"flex",height:'38px', justifyContent:"space-between", alignItems:'center', margin:'0 0 10px 0',paddingBottom:'10px', borderBottom:'1.5px solid #DDDDDD'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" checked={workingWed} onChange={() => setWorkingWed(!workingWed)} />
                                    <span className={styles.switch} />
                                </label>
                                <h5 style={{margin:'0'}}>Среда</h5>
                            </div>
                            {!workingWed ? null : (
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursWed-startHours3"
                                            value={data.workingHoursWed.startHours3}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursWed-startMinutes3"
                                            value={data.workingHoursWed.startMinutes3}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <img style={{margin:'0 5px'}} src={line}/>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursWed-endHours3"
                                            value={data.workingHoursWed.endHours3}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursWed-endMinutes3"
                                            value={data.workingHoursWed.endMinutes3}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{display:"flex",height:'38px', justifyContent:"space-between", alignItems:'center', margin:'0 0 10px 0',paddingBottom:'10px', borderBottom:'1.5px solid #DDDDDD'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" checked={workingThu} onChange={() => setWorkingThu(!workingThu)} />
                                    <span className={styles.switch} />
                                </label>
                                <h5 style={{margin:'0'}}>Четверг</h5>
                            </div>
                            {!workingThu ? null : (
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursThu-startHours4"
                                            value={data.workingHoursThu.startHours4}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursThu-startMinutes4"
                                            value={data.workingHoursThu.startMinutes4}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <img style={{margin:'0 5px'}} src={line}/>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursThu-endHours4"
                                            value={data.workingHoursThu.endHours4}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursThu-endMinutes4"
                                            value={data.workingHoursThu.endMinutes4}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{display:"flex",height:'38px', justifyContent:"space-between", alignItems:'center', margin:'0 0 10px 0',paddingBottom:'10px', borderBottom:'1.5px solid #DDDDDD'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" checked={workingFri} onChange={() => setWorkingFri(!workingFri)} />
                                    <span className={styles.switch} />
                                </label>
                                <h5 style={{margin:'0'}}>Пятница</h5>
                            </div>
                            {!workingFri ? null : (
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursFri-startHours5"
                                            value={data.workingHoursFri.startHours5}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursFri-startMinutes5"
                                            value={data.workingHoursFri.startMinutes5}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <img style={{margin:'0 5px'}} src={line}/>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursFri-endHours5"
                                            value={data.workingHoursFri.endHours5}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursFri-endMinutes5"
                                            value={data.workingHoursFri.endMinutes5}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{display:"flex",height:'38px', justifyContent:"space-between", alignItems:'center', margin:'0 0 10px 0',paddingBottom:'10px', borderBottom:'1.5px solid #DDDDDD'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" checked={workingSat} onChange={() => setWorkingSat(!workingSat)} />
                                    <span className={styles.switch} />
                                </label>
                                <h5 style={{margin:'0'}}>Суббота</h5>
                            </div>
                            {!workingSat ? null : (
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursSat-startHours6"
                                            value={data.workingHoursSat.startHours6}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursSat-startMinutes6"
                                            value={data.workingHoursSat.startMinutes6}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <img style={{margin:'0 5px'}} src={line}/>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursSat-endHours6"
                                            value={data.workingHoursSat.endHours6}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursSat-endMinutes6"
                                            value={data.workingHoursSat.endMinutes6}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{display:"flex",height:'38px', justifyContent:"space-between", alignItems:'center'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" checked={workingSun} onChange={() => setWorkingSun(!workingSun)} />
                                    <span className={styles.switch} />
                                </label>
                                <h5 style={{margin:'0'}}>Воскресенье</h5>
                            </div>
                            {!workingSun ? null : (
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursSun-startHours7"
                                            value={data.workingHoursSun.startHours7}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursSun-startMinutes7"
                                            value={data.workingHoursSun.startMinutes7}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <img style={{margin:'0 5px'}} src={line}/>
                                    <div style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#f1f1f1',
                                        padding:'8px 5px 10px 5px',
                                        verticalAlign: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            name="workingHoursSun-endHours7"
                                            value={data.workingHoursSun.endHours7}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                        :
                                        <input
                                            type="text"
                                            name="workingHoursSun-endMinutes7"
                                            value={data.workingHoursSun.endMinutes7}
                                            onChange={handleChange}
                                            className={styles.timeInput}
                                            placeholder={'00'}
                                            style={{width:'17px'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
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
export default UpdateWorkingHours;
