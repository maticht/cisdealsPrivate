import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import line from '../../img/Line 26.svg'
import {updateProfile, userProfile} from "../../httpRequests/cisdealsApi";
import back from "../../img/Arrow_left.svg";

const UpdateWorkingHours = () => {
    const {UserPage} = useParams();
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const progressBarRef = useRef(null);
    const targetWidth = 43;
    const [workingMon, setWorkingMon] = useState(true);
    const [workingTue, setWorkingTue] = useState(true);
    const [workingWed, setWorkingWed] = useState(true);
    const [workingThu, setWorkingThu] = useState(true);
    const [workingFri, setWorkingFri] = useState(true);
    const [workingSat, setWorkingSat] = useState(true);
    const [workingSun, setWorkingSun] = useState(true);
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

    const fetchUserProfile = async (userId) => {
        try {
            const data = await userProfile(UserPage);
            console.log(data.profile);
            setData({
                firstName: "",
                lastName: "",
                password: "",
                nameOrCompany: "",
                areasActivity: "",
                phone1: "",
                phone2: "",
                image: [],
                workingHoursMon: {
                    startHours1: data.profile.workingHoursMon.startHours1,
                    startMinutes1: data.profile.workingHoursMon.startMinutes1,
                    endHours1: data.profile.workingHoursMon.endHours1,
                    endMinutes1: data.profile.workingHoursMon.endMinutes1,
                },
                workingHoursTue: {
                    startHours2: data.profile.workingHoursTue.startHours2,
                    startMinutes2: data.profile.workingHoursTue.startMinutes2,
                    endHours2: data.profile.workingHoursTue.endHours2,
                    endMinutes2: data.profile.workingHoursTue.endMinutes2,
                },
                workingHoursWed: {
                    startHours3: data.profile.workingHoursWed.startHours3,
                    startMinutes3: data.profile.workingHoursWed.startMinutes3,
                    endHours3: data.profile.workingHoursWed.endHours3,
                    endMinutes3: data.profile.workingHoursWed.endMinutes3,
                },
                workingHoursThu: {
                    startHours4: data.profile.workingHoursThu.startHours4,
                    startMinutes4: data.profile.workingHoursThu.startMinutes4,
                    endHours4: data.profile.workingHoursThu.endHours4,
                    endMinutes4: data.profile.workingHoursThu.endMinutes4,
                },
                workingHoursFri: {
                    startHours5: data.profile.workingHoursFri.startHours5,
                    startMinutes5: data.profile.workingHoursFri.startMinutes5,
                    endHours5: data.profile.workingHoursFri.endHours5,
                    endMinutes5: data.profile.workingHoursFri.endMinutes5,
                },
                workingHoursSat: {
                    startHours6: data.profile.workingHoursSat.startHours6,
                    startMinutes6: data.profile.workingHoursSat.startMinutes6,
                    endHours6: data.profile.workingHoursSat.endHours6,
                    endMinutes6: data.profile.workingHoursSat.endMinutes6,
                },
                workingHoursSun: {
                    startHours7: data.profile.workingHoursSun.startHours7,
                    startMinutes7: data.profile.workingHoursSun.startMinutes7,
                    endHours7: data.profile.workingHoursSun.endHours7,
                    endMinutes7: data.profile.workingHoursSun.endMinutes7,
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
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserProfile(UserPage);

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const res = await updateProfile(UserPage, data);
            localStorage.setItem("token",  JSON.stringify(res));
            console.log(localStorage.getItem("token"))
            if (location.pathname === `/AddWorkingHours/${UserPage}`) {
                navigate(`/AddLocation/${UserPage}`);
            } else {
                navigate("/EditProfile");
            }
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
    useEffect(() => {
        const progressBar = progressBarRef.current;
        let width = 29;
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
                {location.pathname === `/AddWorkingHours/${UserPage}` && (
                    <div className="ProgressBarBlock">
                        <div className="ProgressBarLine" ref={progressBarRef} style={{ width: `29%` }}>
                        </div>
                    </div>
                )}
                <Link className="form-update-link"
                      to={(location.pathname === `/AddWorkingHours/${UserPage}`)
                          ? `/AddSocialInfo/${UserPage}`
                          : "/EditProfile"}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                    <p className="form-heading">
                        {(location.pathname === `/AddWorkingHours/${UserPage}`)
                            ? "Добавление времени работы"
                            : "Изменение времени работы"}</p>
                    <div className={styles.container}>
                        <div>
                            <div className={styles.dayContainer}>
                                <div className={styles.toggleSwitchBlock}>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={workingMon} onChange={() => setWorkingMon(!workingMon)} />
                                        <span className={styles.switch} />
                                    </label>
                                    <h5>Понедельник</h5>
                                </div>
                                {!workingMon ? null : (
                                    <div className={styles.toggleSwitchBlock}>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursMon-startHours1"
                                                value={data.workingHoursMon.startHours1  === "startHours" ? "" : data.workingHoursMon.startHours1}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursMon-startMinutes1"
                                                value={data.workingHoursMon.startMinutes1  === "startMinutes" ? "" : data.workingHoursMon.startMinutes1}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <img className={styles.workingHoursLine} src={line}/>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursMon-endHours1"
                                                value={data.workingHoursMon.endHours1  === "endHours" ? "" : data.workingHoursMon.endHours1}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursMon-endMinutes1"
                                                value={data.workingHoursMon.endMinutes1  === "endMinutes" ? "" : data.workingHoursMon.endMinutes1}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.dayContainer}>
                                <div className={styles.toggleSwitchBlock}>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={workingTue} onChange={() => setWorkingTue(!workingTue)} />
                                        <span className={styles.switch} />
                                    </label>
                                    <h5>Вторник</h5>
                                </div>
                                {!workingTue ? null : (
                                    <div className={styles.toggleSwitchBlock}>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursTue-startHours2"
                                                value={data.workingHoursTue.startHours2  === "startHours" ? "" : data.workingHoursTue.startHours2}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursTue-startMinutes2"
                                                value={data.workingHoursTue.startMinutes2  === "startMinutes" ? "" : data.workingHoursTue.startMinutes2}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <img className={styles.workingHoursLine} src={line}/>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursTue-endHours2"
                                                value={data.workingHoursTue.endHours2  === "endHours" ? "" : data.workingHoursTue.endHours2}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursTue-endMinutes2"
                                                value={data.workingHoursTue.endMinutes2  === "endMinutes" ? "" : data.workingHoursTue.endMinutes2}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.dayContainer}>
                                <div className={styles.toggleSwitchBlock}>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={workingWed} onChange={() => setWorkingWed(!workingWed)} />
                                        <span className={styles.switch} />
                                    </label>
                                    <h5>Среда</h5>
                                </div>
                                {!workingWed ? null : (
                                    <div className={styles.toggleSwitchBlock}>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursWed-startHours3"
                                                value={data.workingHoursWed.startHours3  === "startHours" ? "" : data.workingHoursWed.startHours3}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursWed-startMinutes3"
                                                value={data.workingHoursWed.startMinutes3  === "startMinutes" ? "" : data.workingHoursWed.startMinutes3}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <img className={styles.workingHoursLine} src={line}/>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursWed-endHours3"
                                                value={data.workingHoursWed.endHours3  === "endHours" ? "" : data.workingHoursWed.endHours3}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursWed-endMinutes3"
                                                value={data.workingHoursWed.endMinutes3  === "endMinutes" ? "" : data.workingHoursWed.endMinutes3}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.dayContainer}>
                                <div className={styles.toggleSwitchBlock}>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={workingThu} onChange={() => setWorkingThu(!workingThu)} />
                                        <span className={styles.switch} />
                                    </label>
                                    <h5>Четверг</h5>
                                </div>
                                {!workingThu ? null : (
                                    <div className={styles.toggleSwitchBlock}>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursThu-startHours4"
                                                value={data.workingHoursThu.startHours4  === "startHours4" ? "" : data.workingHoursThu.startHours4}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursThu-startMinutes4"
                                                value={data.workingHoursThu.startMinutes4  === "startMinutes4" ? "" : data.workingHoursThu.startMinutes4}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <img className={styles.workingHoursLine} src={line}/>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursThu-endHours4"
                                                value={data.workingHoursThu.endHours4  === "endHours4" ? "" : data.workingHoursThu.endHours4}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursThu-endMinutes4"
                                                value={data.workingHoursThu.endMinutes4  === "endMinutes4" ? "" : data.workingHoursThu.endMinutes4}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.dayContainer}>
                                <div className={styles.toggleSwitchBlock}>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={workingFri} onChange={() => setWorkingFri(!workingFri)} />
                                        <span className={styles.switch} />
                                    </label>
                                    <h5>Пятница</h5>
                                </div>
                                {!workingFri ? null : (
                                    <div className={styles.toggleSwitchBlock}>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursFri-startHours5"
                                                value={data.workingHoursFri.startHours5  === "startHours5" ? "" : data.workingHoursFri.startHours5}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursFri-startMinutes5"
                                                value={data.workingHoursFri.startMinutes5  === "startMinutes5" ? "" : data.workingHoursFri.startMinutes5}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <img className={styles.workingHoursLine} src={line}/>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursFri-endHours5"
                                                value={data.workingHoursFri.endHours5  === "endHours5" ? "" : data.workingHoursFri.endHours5}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursFri-endMinutes5"
                                                value={data.workingHoursFri.endMinutes5  === "endMinutes5" ? "" : data.workingHoursFri.endMinutes5}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.dayContainer}>
                                <div className={styles.toggleSwitchBlock}>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={workingSat} onChange={() => setWorkingSat(!workingSat)} />
                                        <span className={styles.switch} />
                                    </label>
                                    <h5>Суббота</h5>
                                </div>
                                {!workingSat ? null : (
                                    <div className={styles.toggleSwitchBlock}>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursSat-startHours6"
                                                value={data.workingHoursSat.startHours6  === "startHours6" ? "" : data.workingHoursSat.startHours6}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursSat-startMinutes6"
                                                value={data.workingHoursSat.startMinutes6  === "startMinutes6" ? "" : data.workingHoursSat.startMinutes6}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <img className={styles.workingHoursLine} src={line}/>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursSat-endHours6"
                                                value={data.workingHoursSat.endHours6  === "endHours6" ? "" : data.workingHoursSat.endHours6}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursSat-endMinutes6"
                                                value={data.workingHoursSat.endMinutes6  === "endMinutes6" ? "" : data.workingHoursSat.endMinutes6}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.dayContainer}>
                                <div className={styles.toggleSwitchBlock}>
                                    <label className={styles.toggleSwitch}>
                                        <input type="checkbox" checked={workingSun} onChange={() => setWorkingSun(!workingSun)} />
                                        <span className={styles.switch} />
                                    </label>
                                    <h5>Воскресенье</h5>
                                </div>
                                {!workingSun ? null : (
                                    <div className={styles.toggleSwitchBlock}>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursSun-startHours7"
                                                value={data.workingHoursSun.startHours7  === "startHours7" ? "" : data.workingHoursSun.startHours7}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursSun-startMinutes7"
                                                value={data.workingHoursSun.startMinutes7  === "startMinutes7" ? "" : data.workingHoursSun.startMinutes7}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <img className={styles.workingHoursLine} src={line}/>
                                        <div className={styles.workingHours}>
                                            <input
                                                type="text"
                                                name="workingHoursSun-endHours7"
                                                value={data.workingHoursSun.endHours7  === "endHours7" ? "" : data.workingHoursSun.endHours7}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                            :
                                            <input
                                                type="text"
                                                name="workingHoursSun-endMinutes7"
                                                value={data.workingHoursSun.endMinutes7  === "endMinutes7" ? "" : data.workingHoursSun.endMinutes7}
                                                onChange={handleChange}
                                                className={styles.timeInput}
                                                placeholder={'00'}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {error && <div className={'error_msg'}>{error}</div>}
                    <button type="submit" className={'create_btn'}>
                        {(location.pathname === `/AddWorkingHours/${UserPage}`)
                            ? "Далее"
                            : "Изменить"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};
export default UpdateWorkingHours;
