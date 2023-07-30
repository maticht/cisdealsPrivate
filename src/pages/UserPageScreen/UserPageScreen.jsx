import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import HeaderNavBar from "../../components/headerNavBar/headerNavBar";
import {createUseStyles} from "react-jss";
import arrowUp from '../../img/arrow_up=24.png'
import arrowDown from '../../img/arrow_down=24.png'
import arrow from "../../img/arrowright.svg";
import share from '../../img/share.svg';
import message from '../../img/message.svg';
import Facebook from "../../img/Facebook.svg";
import TikTok from "../../img/TikTok.svg";
import YouTube from "../../img/YouTube.svg";
import Instagram from "../../img/Instagram.svg";
import WhatsApp from "../../img/WhatsApp.svg";
import Telegram from "../../img/telegram.svg";
import Viber from "../../img/Viber.svg";
import LinkedIn from "../../img/LinkedIn.png";
import saveW from "../../img/saveW.svg";
import saveB from "../../img/SaveB.svg";
import Star from "../../img/Star1.svg";
import Star2 from "../../img/Star22.svg";
import xMark from "../../img/x-mark=24.svg";
import EditProfile from "../../img/EditProfile.svg";
import styles from "../../components/UpdateDescription/styles.module.css";

const useStyles = createUseStyles({
    button: {
        backgroundColor: "rgb(255,255,255)",
        color: "#5CA91A",
        fontWeight:'700',
        position: "fixed",
        zIndex: 5,
        fontSize:'15px',
        alignSelf:'center',
        bottom: 10,
        border:'2.5px solid #5CA91A',
        padding: "10px 40px",
        borderRadius: "8px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.9)"
        }
    },
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
    OneCategory2Item: {
        display: "flex",
        flexDirection: "column",
        width:'90vw',
        justifyContent: "space-between",
        padding: "0",
        margin:"0 10px",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
    },
    OneUnderCategoryCheckItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "15px 0 20px 0",
        borderBottom: "#DDDDDD solid 1px",
        textDecoration: "none",
        color: "#000000",
        marginRight:'10px'
    },
    OneCategoryInfo: {
        display: "flex",
        flexDirection: "row",
    },
});
const UserPage = (props, {link}) => {
    const {UserPage} = useParams();
    const [user, setUser] = useState([]);
    const [serv, setServ] = useState([]);
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    const {SortedCategories} = useParams();
    const [showDescription, setShowDescription] = useState(false);
    const [showWorkTime, setShowWorkTime] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyles();
    const [isCopied, setIsCopied] = useState(false);
    const [saved, setSaved] = useState(false);
    const [modalRate, setModalRate] = useState(false);
    const [averageRating, setAverageRating] = useState(0);

    const userLS = localStorage.getItem("token");
    let localUserObj = null;
    let firstNameObj = null;
    let lastNameObj = null;
    let UserId = null;

    if (userLS) {
        try {
            localUserObj = JSON.parse(userLS);
            firstNameObj = localUserObj?.data?.firstName || null;
            lastNameObj = localUserObj?.data?.lastName || null;
            UserId = localUserObj?.data?._id || null;
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }
    const copyLinkToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 800);
    };
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };
    const toggleWorkTime = () => {
        setShowWorkTime(!showWorkTime);
    };

    const fetchUserProfile = async (userId) => {
        try {
            const { data } = await axios.get(`http://backend.delkind.pl/user-profile/${UserPage}`);
            setUser(data.profile);
            calculateAverageRating(data.profile.rating);
            const savedUsers = localUserObj.data.savedUsers || [];
            if (savedUsers.includes(UserPage)) {
                setSaved(true);
            }
            console.log(localUserObj);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateAverageRating = (ratings) => {
        const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
        const average = sum / ratings.length;
        const roundedAverage = Math.round(average * 10) / 10;
        setAverageRating(roundedAverage);
    };

    useEffect(() => {
        fetchUserProfile(UserPage);
    }, []);

    const toggleRate = async (userid, rating, description, firstName, lastName, commentatorId) => {
        try {
            const url = `http://backend.delkind.pl/addingRating/${userid}`;
            const { data: res } = await axios.put(url, { userId: UserPage, value: rating, description: description, firstName: firstName, lastName: lastName, commentatorId: commentatorId });
            // window.location.reload();
            fetchUserProfile(UserPage);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleSave = async () => {
        try {
            const url = `http://backend.delkind.pl/${saved ? 'unSaveUser' : 'saveUser'}/${UserId}`;
            const { data: res } = await axios.put(url, { userId: UserPage });
            localStorage.setItem("token",  JSON.stringify(res));
            setSaved(!saved);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async (userId) => {
            try{
                const {data} = await axios.get(`http://backend.delkind.pl/viewbyid`, {
                    params: {
                        postedBy: UserPage
                    }
                });
                setServ(data)
            }catch (err){
                console.log(err)
            }
        };
        fetchUserProfile(UserPage);
    }, []);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        if (currentImageIndex === 0) {
            setCurrentImageIndex(user.image.length - 1);
        } else {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (currentImageIndex === user.image.length - 1) {
            setCurrentImageIndex(0);
        } else {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const ModalRate = () => {
        const [rating, setRating] = useState(0);
        const [ratingDesc, setRatingDesc] = useState({
            description: ""
        });
        const [showRatingDescription, setShowRatingDescription] = useState(false);
        const handleChange = ({ currentTarget: input }) => {
            const { name, value } = input;

            if (value.length <= 2000) {
                setRatingDesc({ ...ratingDesc, [name]: value });
            } else {
                setRatingDesc({ ...ratingDesc, [name]: value.slice(0, 2000) });
            }
        };
        const handleRate = (value) => {
            setRating(value);
        };
        const toggleRatingDescription = () => {
            setShowRatingDescription(!showRatingDescription);
        };
        const handleAddRating = () => {
            toggleRate(user._id, rating, ratingDesc.description, firstNameObj, lastNameObj, UserId)
                .then(() => {
                    setRating(0);
                    setRatingDesc({ description: "" });
                })
                .catch(error => {
                    console.log(error);
                });
        };
        return (
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: '#f1f1f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection:'column',
                zIndex:'100',
            }}>
                <div style={{ margin:'10px',width:'100%',borderRadius:'8px', display:'flex', justifyContent:'flex-start',alignSelf:'flex-start', alignItems:'flex-start', flexDirection:'column' }}>
                    <p onClick={() => setModalRate(!modalRate)} style={{textDecoration: "none", color: "#454545",margin:'5px 0', fontSize: "14px"}}>
                        {`< Назад`}
                    </p>
                    <h2 style={{margin:'5px 0 0 0'}}>{user.firstName} {user.lastName} рейтинг</h2>
                    <div style={{ margin: '10px 0 0 0', width: '100%', overflow: 'auto', maxHeight: UserPage && UserPage !== UserId ? '330px' : '100%' }}>
                        {user.rating.sort((a, b) => b.value - a.value).map((rating, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center',width:'95%', flexDirection:'column',padding: "10px 0", borderBottom: "#DDDDDD solid 1px", textDecoration: "none", color: "#000000" }}>
                                <div style={{display:'flex',width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                                    <Link onClick={() => {
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 150);
                                        setTimeout(() => {
                                            setModalRate(false);
                                        }, 250);
                                    }} style={{textDecoration:'none'}} to={`/AllCategories/Categories2/Categories3/Все специалисты/${rating.commentatorId}`}>
                                        <p style={{ margin: '0px', fontWeight:'500', color:'#000' }}>{rating.firstName} {rating.lastName}</p>
                                    </Link>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        {rating.value >= 1 && <img src={Star2} alt="Star" style={{ marginRight: '5px', width:'18px' }} />}
                                        {rating.value >= 2 && <img src={Star2} alt="Star" style={{ marginRight: '5px', width:'18px' }} />}
                                        {rating.value >= 3 && <img src={Star2} alt="Star" style={{ marginRight: '5px', width:'18px' }} />}
                                        {rating.value >= 4 && <img src={Star2} alt="Star" style={{ marginRight: '5px', width:'18px' }} />}
                                        {rating.value >= 5 && <img src={Star2} alt="Star" style={{ marginRight: '5px', width:'18px' }} />}
                                    </div>
                                </div>
                                <p style={{ wordWrap: "break-word",width:'93vw', color:'#666',margin:'5px 5px 5px 0', fontSize:'13px' }}>
                                    {rating.description ? (
                                        <>{rating.description}</>
                                    ) : null}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {UserPage && UserPage !== UserId ? (
                    <div style={{ position: 'relative', zIndex: 99, marginBottom:'10px' }}>
                        <div style={{ borderRadius: '8px', backgroundColor: '#fff', padding: '15px 10px 5px 10px', margin: '0 10px 0 10px', width: '89%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                <h4 style={{margin:'0'}}>Оценить:</h4>
                                <div>
                                    <img onClick={() => handleRate(1)} style={{ marginRight: '15px',}} src={rating >= 1 ? Star2 : Star} alt={'Star'} />
                                    <img onClick={() => handleRate(2)} style={{ marginRight: '15px',}} src={rating >= 2 ? Star2 : Star} alt={'Star'} />
                                    <img onClick={() => handleRate(3)} style={{ marginRight: '15px',}} src={rating >= 3 ? Star2 : Star} alt={'Star'} />
                                    <img onClick={() => handleRate(4)} style={{ marginRight: '15px',}} src={rating >= 4 ? Star2 : Star} alt={'Star'} />
                                    <img onClick={() => handleRate(5)} style={{}} src={rating >= 5 ? Star2 : Star} alt={'Star'} />
                                </div>
                            </div>
                            <div>
                            <textarea
                                placeholder={rating === 0 ? "Поставьте оценку перед написанием комментария" : "Напишите комментарий к оценке"}
                                name="description"
                                onChange={handleChange}
                                value={ratingDesc.description}
                                required
                                className={`${styles.input} ${styles["input-top"]}`}
                                style={{height: '50px', width:'81.5vw', margin:'10px 0 0 0'}}
                                disabled={rating === 0}
                            />
                            </div>
                            <button onClick={handleAddRating} className={styles.green_btn} style={{width:'100%', margin:'7px 10px'}}>
                                Добавить
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>

        );
    };



    return (
        <div style={{backgroundColor: '#f5f5f5', justifyContent:'center',height:'100%', paddingBottom:'65px'}}>
            <HeaderNavBar />
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', margin:'5px 10px 5px 0'}}>
                <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to={SortedCategories === undefined ? '/' : `/AllCategories/${Categories2}/${Categories3}/${SortedCategories}`}>
                    <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                        {`< Список специалистов`}
                    </p>
                </Link>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center',}}>
                    <p style={{display:'flex', alignSelf:'center', margin:'0 5px 3px 0', fontSize:'12px', color:'#666', opacity: isCopied ? "1" : "0",
                        transition: "opacity 0.3s ease-in-out",}}>{isCopied ? "Скопировано!" : null}</p>
                    <img style={{marginRight:'15px'}} onClick={copyLinkToClipboard} src={share} alt={'share'}/>

                    <div onClick={() => setModalRate(!modalRate)} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', marginRight: '15px' }}>
                            <img style={{marginRight:'0px'}} src={Star} alt={'Star'}/>
                            <p
                                style={{
                                    position: 'absolute',
                                    top: '46%',
                                    left: '50%',
                                    transform: 'translate(-50%, -52%)',
                                    margin: '0',
                                    color:'#000000',
                                    fontSize: '10px',
                                    fontWeight:'600',
                                }}
                            >
                                {averageRating}
                            </p>
                        </div>
                    </div>
                    {UserPage && UserPage !== UserId ? (
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <img onClick={toggleSave} style={{marginRight:'15px'}} src={saved ? saveB : saveW} alt={'save'}/>
                            <a href={`mailto:${user.email}`} style={{marginTop:"5px"}}>
                                <img src={message} alt={'message'}/>
                            </a>
                        </div>
                    ) : (
                        <Link to={`/EditProfile`}>
                            <img src={EditProfile} alt={'EditProfile'}/>
                        </Link>
                    )}
                </div>
            </div>

            <div style={{marginLeft:'10px', width:"94vw", flexDirection:'column', backgroundColor:"#fff", display:"flex", alignSelf:"center", justifyContent:"center", alignItems:'flex-start', borderRadius:8}}>
                {!user.image || user.image.length === 0 ? null :
                    <div style={{display:'flex', alignSelf: 'center', justifyContent: 'center', flexDirection:'column'}}>
                        <div
                            style={{
                                width: '310px',
                                height: '310px',
                                marginTop: '15px',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                        >
                            {user.image && (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        filter: 'blur(7px)',
                                        position: 'absolute',
                                    }}
                                    src={user.image[currentImageIndex]}
                                    alt='User Image'
                                />
                            )}
                            {user.image && (
                                <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
                                    <img
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        src={user.image[currentImageIndex]}
                                        alt='User Image'
                                    />
                                </div>
                            )}

                        </div>
                        {user.image.length > 1 &&
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems:'center',
                                    marginTop:'10px'
                                }}
                            >
                                <div style={{ marginLeft: '0px', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center'  }} onClick={handlePrevImage}>
                                    <img src={arrowDown} style={{rotate:'90deg'}} alt={'<'}/>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {user.image.map((image, index) => {
                                        return (
                                            <div style={{width: '44px', height: '44px',border: currentImageIndex === index ? '2px solid #000' : 'none', margin: '0 4px', padding:'0.5px', borderRadius:'6px', display:"flex", justifyContent:'center', alignItems:'center'}}>
                                                <img
                                                    key={index}
                                                    style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius:'6px',filter:'blur(0.3px)' }}
                                                    src={image}
                                                    alt='Preview'
                                                    onClick={() => setCurrentImageIndex(index)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{marginRight: '0px', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleNextImage}>
                                    <img src={arrowDown} style={{rotate:'-90deg'}} alt={'>'}/>
                                </div>
                            </div>
                        }
                    </div>


                }
                <div style={{paddingLeft:'10px', marginBottom:'15px'}}>
                    <h2 style={{margin:'5px 0'}}>{user.nameOrCompany}</h2>
                    <h5 style={{margin:'5px 0', display: user.areasActivity ==='areasActivity' ? 'none' : 'flex'}}>{user.areasActivity}</h5>
                    <p style={{ wordWrap: "break-word", textAlign: "left",width:'90vw', color:'#666',margin:'5px 0' }}>
                        {user.description !== 'description' ? (
                            <>
                                {showDescription
                                    ? user.description
                                    : `${user.description?.slice(0, 40)}${
                                        user.description?.length > 40 ? "... " : " "
                                    }`}

                                {user.description?.length > 40 && (
                                    <div >
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#666666',
                                                textDecoration: 'none',
                                                cursor: 'pointer',
                                                fontSize:'12px',
                                                margin:"0px",
                                                padding:'0px'
                                            }}
                                            onClick={toggleDescription}
                                        >
                                            {showDescription ? (
                                                <div style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                                    <p>Свернуть </p>
                                                    <img style={{width:'10px', height:'10px', marginLeft:'5px',marginTop:'3px'}} src={arrowUp} alt={'>'}/>
                                                </div>

                                            ) : (
                                                <div style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                                    <p>Показать больше </p>
                                                    <img style={{width:'10px', height:'10px',marginTop:'3px', marginLeft:'5px'}} src={arrowDown} alt={'>'}/>
                                                </div>
                                            )}
                                        </button>
                                    </div>

                                )}
                            </>
                        ) : (
                            'Описание отсутствует'
                        )}
                    </p>
                    <div style={{display: user.city ==="city"
                            && user.region ==="region"
                            && user.street ==='street'
                            && user.house ==='house'
                            && user.apartment ==='apartment'
                            && user.zip ==='zip'
                         ? 'none' : null}} >
                        <p style={{margin:'5px 0', fontSize:'12px', color:'#666'}}>
                            Адрес
                        </p>
                        <p style={{margin:'5px 0', fontWeight:'400'}}>
                            {user?.street ==='street'? null :`${user.street} `}
                            {user?.house ==='house'? null :`${user.house}`}
                            {user?.apartment ==='apartment'? null :`(${user.apartment}) `}
                            {user?.city ==='city'? null :`${user.city}, `}
                            {user?.region ==='region'? null :`${user.region}, `}
                            {user?.zip ==='zip'? null :`${user.zip}`}
                        </p>
                    </div>
                    <div style={{margin: '15px 0 0 0',
                        // display: user.workingHoursMon === 'workingHours'
                        //     && user.workingHoursTue === 'workingHours'
                        //     && user.workingHoursWed === 'workingHours'
                        //     && user.workingHoursThu === 'workingHours'
                        //     && user.workingHoursFri === 'workingHours'
                        //     && user.workingHoursSat === 'workingHours'
                        //     && user.workingHoursSun === 'workingHours'
                        //     ? 'none' : null
                    }}>
                        {user.workingHoursMon?.startHours1 !== 'startHours' ? (
                            <div>
                                <p style={{margin:'5px 0', fontSize:'12px', color:'#666'}}>
                                    Время работы
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400'}}>
                                    ПН: {user.workingHoursMon?.startHours1 === '' ? ' - ' : `${user.workingHoursMon?.startHours1}:${user.workingHoursMon?.startMinutes1}-${user.workingHoursMon?.endHours1}:${user.workingHoursMon?.endMinutes1}`}
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400', display: showWorkTime ? 'flex' : 'none'}}>
                                    ВТ: {user.workingHoursTue?.startHours2 === '' ? ' - ' : `${user.workingHoursTue?.startHours2}:${user.workingHoursTue?.startMinutes2}-${user.workingHoursTue?.endHours2}:${user.workingHoursTue?.endMinutes2}`}
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400', display: showWorkTime ? 'flex' : 'none'}}>
                                    СР: {user.workingHoursWed?.startHours3 === '' ? ' - ' : `${user.workingHoursWed?.startHours3}:${user.workingHoursWed?.startMinutes3}-${user.workingHoursWed?.endHours3}:${user.workingHoursWed?.endMinutes3}`}
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400', display: showWorkTime ? 'flex' : 'none'}}>
                                    ЧТ: {user.workingHoursThu?.startHours4 === '' ? ' - ' : `${user.workingHoursThu?.startHours4}:${user.workingHoursThu?.startMinutes4}-${user.workingHoursThu?.endHours4}:${user.workingHoursThu?.endMinutes4}`}
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400', display: showWorkTime ? 'flex' : 'none'}}>
                                    ПТ: {user.workingHoursFri?.startHours5 === '' ? ' - ' : `${user.workingHoursFri?.startHours5}:${user.workingHoursFri?.startMinutes5}-${user.workingHoursFri?.endHours5}:${user.workingHoursFri?.endMinutes5}`}
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400', display: showWorkTime ? 'flex' : 'none'}}>
                                    СБ: {user.workingHoursSat?.startHours6 === '' ? ' - ' : `${user.workingHoursSat?.startHours6}:${user.workingHoursSat?.startMinutes6}-${user.workingHoursSat?.endHours6}:${user.workingHoursSat?.endMinutes6}`}
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400', display: showWorkTime ? 'flex' : 'none'}}>
                                    ВС: {user.workingHoursSun?.startHours7 === '' ? ' - ' : `${user.workingHoursSun?.startHours7}:${user.workingHoursSun?.startMinutes7}-${user.workingHoursSun?.endHours7}:${user.workingHoursSun?.endMinutes7}`}
                                </p>
                                <div >
                                    <button
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#666666',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            fontSize:'12px',
                                            margin:"0px",
                                            padding:'0px'
                                        }}
                                        onClick={toggleWorkTime}
                                    >
                                        {showWorkTime ? (
                                            <div style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                                <p>Свернуть </p>
                                                <img style={{width:'10px', height:'10px', marginLeft:'5px',marginTop:'3px'}} src={arrowUp} alt={'>'}/>
                                            </div>

                                        ) : (
                                            <div style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                                <p>Показать больше </p>
                                                <img style={{width:'10px', height:'10px',marginTop:'3px', marginLeft:'5px'}} src={arrowDown} alt={'>'}/>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                            ) : null

                        }


                    </div>
                </div>
            </div>
            <div style={{display: serv.length === 0 ? 'none' : null}}>
                <h2 style={{margin:'15px 0 15px 10px'}}>Услуги</h2>
                <div style={{display: serv.length === 0 ? 'none' : null, marginBottom:'-10px'}}>
                    <div style={{ flexDirection:'column',margin:'0 10px', padding:'15px 10px', backgroundColor:"#fff", display:"flex", alignSelf:"center", justifyContent:"center", alignItems:'flex-start', borderRadius:8}}>
                        <div style={{width:'100%'}}>
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
                                <div key={parent} style={{width:'100%'}}>
                                    <h3 style={{margin:'5px 0 5px 0'}}>{parent}</h3>
                                    {data.map((obj, arr, index) => (

                                        <div key={obj.title} style={{margin:'-5px 0 5px 0', width:'100%'}}>
                                            <div className={classes.OneUnderCategoryCheckItem} style={{width:'100%', height:'50px',display:'flex', flexDirection:'row', justifyContent:'flex-start',alignItems:'center', marginLeft:'0',padding: "0", borderBottom: arr !== index.length - 1 ? 'solid #DDDDDD 1px' : 'solid #DDDDDD 0px'}}>
                                                <div style={{textDecoration:'none', display:'flex',width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                                                    <div style={{display:'flex',flexDirection:'column', alignItems:'flex-start'}}>
                                                        <p style={{textDecoration:'none', color:'#000',margin:'3px 3px 5px 0'}}>{obj.title}</p>
                                                        {obj.description !== 'description' && (
                                                            <p style={{margin:'0 0 5px 0', fontSize:'11px', color:'#666'}}>{obj.description}</p>
                                                        )}
                                                    </div>
                                                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                                                            {obj.prise !== 'prise' && (
                                                                <p style={{margin:'0 3px 5px 0', fontSize:'13px', color:'#000'}}>{`${obj.prise} zł`}</p>
                                                            )}
                                                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                                                {obj.days !== 'days' && (
                                                                    <p style={{margin:'0 3px 0 0', fontSize:'11px', color:'#666'}}>{`${obj.days} д`}</p>
                                                                )}
                                                                {obj.hours !== 'hours' && (
                                                                    <p style={{margin:'0 3px 0 0', fontSize:'11px', color:'#666'}}>{`${obj.hours} ч`}</p>
                                                                )}
                                                                {obj.minutes !== 'minutes' && (
                                                                    <p style={{margin:'0 3px 0 0', fontSize:'11px', color:'#666'}}>{`${obj.minutes} мин`}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <div style={{width:'100vw',display:'flex', justifyContent:'center', marginBottom:"10px"}}>
                <button className={classes.button} onClick={handleOpenModal}>
                    Посмотреть способы связи
                </button>
            </div>

            {modalRate && (
                <ModalRate />
            )}


            {modalOpen && (
                <div className={classes.overlay}>
                    <div className={classes.modal}>
                        <p style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} onClick={handleCloseModal}>
                            {`< ${user.firstName} ${user.lastName}`}
                        </p>
                        <h2>Контакты</h2>
                        <div style={{padding:'15px 10px',marginRight:'10px', flexDirection:'column', backgroundColor:"#fff", display:"flex", alignSelf:"center", justifyContent:"center", alignItems:'flex-start', borderRadius:8}}>
                            <div>
                                <p style={{margin:'5px 0', fontSize:'12px', color:'#666'}}>
                                    Почта
                                </p>
                                <p style={{margin:'5px 0', fontWeight:'400'}}>{user.email}</p>
                            </div>
                            <div style={{margin: '15px 0 0 0', display: user.Facebook ==='link' && user.LinkedIn ==='link' && user.Instagram ==='link' && user.Viber ==='link' && user.Telegram ==='link' && user.TikTok ==='link' && user.WhatsApp ==='link' && user.YouTube ==='link' ? 'none' : null}}>
                                <p style={{margin:'5px 0', fontSize:'12px', color:'#666'}}>
                                    Социальные сети
                                </p>
                                <div>
                                    {user.Facebook !== 'Facebook' && (
                                        <a href={user.Facebook}>
                                            <img src={Facebook} width="23px"  height="23px" style={{marginRight:'10px',}} alt='Facebook'/>
                                        </a>
                                    )}
                                    {user.LinkedIn !== 'LinkedIn' && (
                                        <a href={user.LinkedIn}>
                                            <img src={LinkedIn} width="23px"  height="23px" style={{marginRight:'10px',}} alt='LinkedIn'/>
                                        </a>
                                    )}
                                    {user.Instagram !== 'Instagram' && (
                                        <a href={user.Instagram}>
                                            <img src={Instagram} width="23px"  height="23px" style={{marginRight:'10px',}} alt='Instagram'/>
                                        </a>
                                    )}
                                    {user.Viber !== 'Viber' && (
                                        <a href={user.Viber}>
                                            <img src={Viber} width="23px"  height="23px" style={{marginRight:'10px',}} alt='Viber'/>
                                        </a>
                                    )}
                                    {user.Telegram !== 'Telegram' && (
                                        <a href={user.Telegram}>
                                            <img src={Telegram} width="23px"  height="23px" style={{marginRight:'10px',}} alt='Telegram'/>
                                        </a>
                                    )}
                                    {user.TikTok !== 'TikTok' && (
                                        <a href={user.TikTok}>
                                            <img src={TikTok} width="23px"  height="23px" style={{marginRight:'10px',}} alt='TikTok'/>
                                        </a>
                                    )}
                                    {user.WhatsApp !== 'WhatsApp' && (
                                        <a href={user.WhatsApp}>
                                            <img src={WhatsApp} width="23px"  height="23px" style={{marginRight:'10px',}} alt='WhatsApp'/>
                                        </a>
                                    )}
                                    {user.YouTube !== 'YouTube' && (
                                        <a href={user.YouTube}>
                                            <img src={YouTube} width="23px"  height="23px" style={{marginRight:'10px',}} alt='YouTube'/>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div style={{margin: '15px 0 0 0', display: user.phone1 ==='phone1' && user.phone2 ==='phone2' ? 'none' : null}}>
                                <p style={{margin:'5px 0', fontSize:'12px', color:'#666'}}>
                                    Номер телефона
                                </p>
                                {user.phone1 !== 'phone1' && (
                                    <p style={{margin:'5px 0', fontWeight:'400'}}>{user.phone1}</p>
                                )}
                                {user.phone2 !== 'phone2' && (
                                    <p style={{margin:'5px 0', fontWeight:'400'}}>{user.phone2}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserPage;
