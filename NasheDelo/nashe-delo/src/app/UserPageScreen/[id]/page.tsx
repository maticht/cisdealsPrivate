"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from "next/link";
import {useParams} from "react-router-dom";
import HeaderNavBar from "../../../components/headerNavBar/headerNavBar";
import {createUseStyles} from "react-jss";
import arrowUp from '../../../img/arrow_up=24.png'
import arrowDown from '../../../img/arrow_down=24.png'
import arrow from "../../../img/arrowright.svg";
import share from '../../../img/share.svg';
import message from '../../../img/message.svg';
import Facebook from "../../../img/Facebook.svg";
import TikTok from "../../../img/TikTok.svg";
import YouTube from "../../../img/YouTube.svg";
import Instagram from "../../../img/Instagram.svg";
import WhatsApp from "../../../img/WhatsApp.svg";
import Telegram from "../../../img/telegram.svg";
import Viber from "../../../img/Viber.svg";
import LinkedIn from "../../../img/LinkedIn.png";
import saveW from "../../../img/saveW.svg";
import saveB from "../../../img/SaveB.svg";
import Star from "../../../img/Star1.svg";
import Star2 from "../../../img/Star22.svg";
import shearlogo from "../../../img/shearlogo.svg";
import oklogo from '../../../img/oklogo.png';
import fblogo from '../../../img/fblogo.png';
import vklogo from '../../../img/vklogo.png';
import tglogo from '../../../img/tglogo.png';
import viberlogo from '../../../img/viberlogo.png';
import wtplogo from '../../../img/wtplogo.png';
import EditProfile from "../../../img/EditProfile.svg";
import styles from "../../UpdateDescription/styles.module.css";
import {
    userProfile,
    viewServices,
    saveUserProfile,
    unSaveUserProfile,
    updateServ
} from "@/httpRequests/cisdealsApi";
import './UserPageScreen.css'
import back from "../../../img/Arrow_left.svg";
import Image from "next/image";

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
        backgroundColor: "rgb(250,250,250)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    },
    contactOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgb(250,250,250)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        zIndex: 9999
    },
    modal: {
        width: "calc(100%)",
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
type Props = {
    params: {
        UserPage: any;
    }
};
const UserPage = ({params: {UserPage}}: Props) => {
    const [user, setUser] = useState([]);
    const [serv, setServ] = useState([]);
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    const {Categories4} = useParams();
    const {SortedCategories} = useParams();
    const [showDescription, setShowDescription] = useState(false);
    const [showWorkTime, setShowWorkTime] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyles();
    const [isCopied, setIsCopied] = useState(false);
    const [saved, setSaved] = useState(false);
    const [modalRate, setModalRate] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const [inputCurrentUrl, setInputCurrentUrl] = useState(window.location.href);
    const deskMobileContactBlockRef = useRef(null);
    const [isContactBlockVisible, setContactBlockVisible] = useState(false);
    const wrapperRef = useRef(null);

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
    const copyLinkAndShowMessage = () => {
        let currentUrl = window.location.href;
        setCurrentUrl(currentUrl);
        setInputCurrentUrl(currentUrl);
        navigator.clipboard.writeText(currentUrl).then(() => {
            (showCopiedMessage !== true) ? setShowCopiedMessage(true) : setShowCopiedMessage(false)
        }).catch(err => console.error('Could not copy text: ', err));

        setIsCopied(true);
    };

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
            setInputCurrentUrl('Скопировано!')
        }).catch(err => console.error('Could not copy text: ', err));
    };

    const sharingText = `Специалист ${user.nameOrCompany}`;
    let socialMediaLogos = [];
    socialMediaLogos = [
        {
            name: 'Telegram',
            logo: tglogo,
            url: `https://telegram.me/share/url?url=${encodeURIComponent(`${sharingText}\n${currentUrl}`)}`
        },
        {
            name: 'VK',
            logo: vklogo,
            url: `https://vk.com/share.php?url=${encodeURIComponent(`${currentUrl}`)}`
        },
        {
            name: 'Facebook',
            logo: fblogo,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${sharingText}\n${currentUrl}`)}`
        },
        {
            name: 'OK',
            logo: oklogo,
            url: `https://connect.ok.ru/offer?url=${encodeURIComponent(`${sharingText}\n${currentUrl}`)}`
        },
        {
            name: 'WhatsApp',
            logo: wtplogo,
            url: `https://wa.me/?text=${encodeURIComponent(`${currentUrl}\n${sharingText}`)}`
        },
        {
            name: 'Viber',
            logo: viberlogo,
            url: `viber://forward?text=${encodeURIComponent(`${currentUrl}\n${sharingText}`)}`
        }
    ];

useEffect(() => {
    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowCopiedMessage(false);
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [wrapperRef]);


    const handleScrollToContacts = () => {
        if (deskMobileContactBlockRef.current) {
            deskMobileContactBlockRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            if (deskMobileContactBlockRef.current) {
                const rect = deskMobileContactBlockRef.current.getBoundingClientRect();
                setContactBlockVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
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
            const response = await userProfile(UserPage);
            setUser(response.profile);
            calculateAverageRating(response.profile.rating);
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
    }, [saved]);

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
            console.log(UserId);
            console.log(UserPage);

            const res = await saveUserProfile(UserId, UserPage);
            localStorage.setItem("token", JSON.stringify(res));
            setSaved(!saved);
            console.log(saved);
        } catch (error) {
            console.log(error);
        }
    };
    const toggleUnSave = async () => {
        try {
            console.log(UserPage)
            let res = await unSaveUserProfile(UserId, UserPage);
            localStorage.setItem("token", JSON.stringify(res));
            setSaved(!saved);
            console.log(saved);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async (userId) => {
            try{
                const data = await viewServices(UserPage);
                setServ(data)
            }catch (err){
                console.log(err)
            }
        };
        fetchUserProfile(UserPage);
    }, [saved]);

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
            <div className="userPageContainer">
                <div className="mainContainer">
                    <p onClick={() => setModalRate(!modalRate)}
                       style={{textDecoration: "none", color: "#454545", margin: '5px 0', fontSize: "14px"}}>
                        {`< Назад`}
                    </p>
                    <h2 style={{margin: '5px 0 0 0'}}>{user.firstName} {user.lastName} рейтинг</h2>
                    <div style={{
                        margin: '10px 0 0 0',
                        width: '100%',
                        overflow: 'auto',
                        maxHeight: UserPage && UserPage !== UserId ? '330px' : '100%'
                    }}>
                        {user.rating.sort((a, b) => b.value - a.value).map((rating, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '95%',
                                flexDirection: 'column',
                                padding: "10px 0",
                                borderBottom: "#DDDDDD solid 1px",
                                textDecoration: "none",
                                color: "#000000"
                            }}>
                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Link onClick={() => {
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 150);
                                        setTimeout(() => {
                                            setModalRate(false);
                                        }, 250);
                                    }} style={{textDecoration: 'none'}}
                                          href={`/AllCategories/Categories2/Categories3/Categories4/Все специалисты/${rating.commentatorId}`}>
                                        <p style={{
                                            margin: '0px',
                                            fontWeight: '500',
                                            color: '#000'
                                        }}>{rating.firstName} {rating.lastName}</p>
                                    </Link>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        {rating.value >= 1 &&
                                            <Image src={Star2} alt="Star" style={{marginRight: '5px', width: '18px'}}/>}
                                        {rating.value >= 2 &&
                                            <Image src={Star2} alt="Star" style={{marginRight: '5px', width: '18px'}}/>}
                                        {rating.value >= 3 &&
                                            <Image src={Star2} alt="Star" style={{marginRight: '5px', width: '18px'}}/>}
                                        {rating.value >= 4 &&
                                            <Image src={Star2} alt="Star" style={{marginRight: '5px', width: '18px'}}/>}
                                        {rating.value >= 5 &&
                                            <Image src={Star2} alt="Star" style={{marginRight: '5px', width: '18px'}}/>}
                                    </div>
                                </div>
                                <p style={{
                                    wordWrap: "break-word",
                                    width: '93vw',
                                    color: '#666',
                                    margin: '5px 5px 5px 0',
                                    fontSize: '13px'
                                }}>
                                    {rating.description ? (
                                        <>{rating.description}</>
                                    ) : null}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {UserPage && UserPage !== UserId ? (
                    <div style={{position: 'relative', zIndex: 99, marginBottom: '10px'}}>
                        <div style={{
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            padding: '15px 10px 5px 10px',
                            margin: '0 10px 0 10px',
                            width: '89%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <h4 style={{margin: '0'}}>Оценить:</h4>
                                <div>
                                    <Image onClick={() => handleRate(1)} style={{marginRight: '15px',}}
                                         src={rating >= 1 ? Star2 : Star} alt={'Star'}/>
                                    <Image onClick={() => handleRate(2)} style={{marginRight: '15px',}}
                                         src={rating >= 2 ? Star2 : Star} alt={'Star'}/>
                                    <Image onClick={() => handleRate(3)} style={{marginRight: '15px',}}
                                         src={rating >= 3 ? Star2 : Star} alt={'Star'}/>
                                    <Image onClick={() => handleRate(4)} style={{marginRight: '15px',}}
                                         src={rating >= 4 ? Star2 : Star} alt={'Star'}/>
                                    <Image onClick={() => handleRate(5)} style={{}} src={rating >= 5 ? Star2 : Star}
                                         alt={'Star'}/>
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
                                style={{height: '50px', width: '81.5vw', margin: '10px 0 0 0'}}
                                disabled={rating === 0}
                            />
                            </div>
                            <button onClick={handleAddRating} className={styles.green_btn}
                                    style={{width: '100%', margin: '7px 10px'}}>
                                Добавить
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>

        );
    };


    return (
        <div className="userPageContainer">
            <HeaderNavBar />
            <div className="mainUserPageContainer">
                <div className="mainUserNav">
                    <div className="mainUserBackLink" onClick={() => {window.history.back()}}>
                        <Image src={back} alt="back"/>
                        <p>Назад</p>
                    </div>
                    <div className="mainUserNavBtns">

                        {/*<button className="mainUserNavBtn" onClick={() => setModalRate(!modalRate)}>*/}
                        {/*    <div className="mainUserNavRating">*/}
                        {/*        <img src={Star} alt={'Star'}/>*/}
                        {/*        {isNaN(averageRating) ? null : (*/}
                        {/*            <p  className="mainUserNavRatingText">{averageRating}</p>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</button>*/}
                        {UserPage && UserPage !== UserId ? (
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <button className="mainUserNavBtn" onClick={!saved ? toggleSave : toggleUnSave}>
                                    <Image src={saved ? saveB : saveW} alt={'save'}/>
                                </button>
                                {/*<a href={`mailto:${user.email}`}>*/}
                                {/*    <button className="mainUserNavBtn">*/}
                                {/*        <img src={message} alt={'message'}/>*/}
                                {/*    </button>*/}
                                {/*</a>*/}
                            </div>
                        ) : (
                            <Link href={`/EditProfile`}>
                                <Image className="mainUserNavLink" src={EditProfile} alt={'EditProfile'}/>
                            </Link>
                        )}
                        <div className="shearContainer" ref={wrapperRef}>
                            <button className="mainUserNavBtnLast" onClick={copyLinkAndShowMessage}>
                                <Image src={share} alt={'share'}/>
                            </button>
                            <div>
                                {showCopiedMessage && (
                                    <div className="copiedMessage">
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: "row",
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <input type="text" value={inputCurrentUrl}/>
                                                <Image style={{
                                                    width: '20px',
                                                    marginLeft: '8px',
                                                    cursor: "pointer"
                                                }} src={shearlogo} onClick={copyLinkToClipboard}/>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: "10px",
                                                marginBottom: "5px"
                                            }}>
                                                {socialMediaLogos.map((platform, index) => (
                                                    <Image
                                                        key={index}
                                                        style={{width: '24px', cursor: 'pointer'}}
                                                        src={platform.logo}
                                                        alt={platform.name}
                                                        onClick={() => window.open(platform.url, '_blank')}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainUserInfoBlocks">
                    <div className="mainUserPhotoContainer">
                        <div className="mainUserInfoBlock">
                            {!user.image || user.image.length === 0 ? null :
                                <div className={'photosSliderBlock'}>
                                    <div className="mainUserMainPhotoBlock">
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
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: '0 auto'
                                            }}>
                                                <img
                                                    style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
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
                                                alignItems: 'center',
                                                marginTop: '10px'
                                            }}
                                        >
                                            <div style={{
                                                marginLeft: '0px',
                                                width: '30px',
                                                height: '30px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                cursor:'pointer',
                                                alignItems: 'center'
                                            }} onClick={handlePrevImage}>
                                                <Image src={arrowDown} style={{rotate: '90deg'}} alt={'<'}/>
                                            </div>
                                            <div className={'smallUserPhotosBlock'} style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                {user.image.map((image, index) => {
                                                    return (
                                                        <div style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            border: currentImageIndex === index ? '2px solid #000' : 'none',
                                                            margin: '0 4px',
                                                            padding: '0.5px',
                                                            borderRadius: '6px',
                                                            cursor:'pointer',
                                                            display: "flex",
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <img
                                                                key={index}
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '6px',
                                                                    filter: 'blur(0.3px)'
                                                                }}
                                                                src={image}
                                                                alt='Preview'
                                                                onClick={() => setCurrentImageIndex(index)}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div style={{
                                                marginRight: '0px',
                                                width: '30px',
                                                height: '30px',
                                                display: 'flex',
                                                cursor:'pointer',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }} onClick={handleNextImage}>
                                                <Image src={arrowDown} style={{rotate: '-90deg'}} alt={'>'}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        <div className={'deskContactBlock'}>
                            <h2 style={{margin:'15px 0'}}>Контакты</h2>
                            <div style={{
                                padding: '15px 10px',
                                marginRight: '20px',
                                flexDirection: 'column',
                                backgroundColor: "#fff",
                                display: "flex",
                                alignSelf: "center",
                                justifyContent: "center",
                                alignItems: 'flex-start',
                                borderRadius: 8
                            }}>
                                <div>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Почта
                                    </p>
                                    <p style={{margin: '5px 0', fontWeight: '400'}}>
                                        <a href={`mailto:${user.email}`}
                                           style={{textDecoration: 'none', color: 'inherit'}}>
                                            {user.email}
                                        </a>
                                    </p>
                                </div>
                                <div style={{
                                    margin: '15px 0 0 0',
                                    display: user.Facebook === 'Facebook' && user.LinkedIn === 'LinkedIn' && user.Instagram === 'Instagram' && user.Viber === 'Viber' && user.Telegram === 'Telegram' && user.TikTok === 'TikTok' && user.WhatsApp === 'WhatsApp' && user.YouTube === 'YouTube' ? 'none' : "block"
                                }}>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Социальные сети
                                    </p>
                                    <div>
                                        {user.Facebook !== 'Facebook' && (
                                            <a href={user.Facebook} target="_blank">
                                                <Image src={Facebook} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Facebook'/>
                                            </a>
                                        )}
                                        {user.LinkedIn !== 'LinkedIn' && (
                                            <a href={user.LinkedIn} target="_blank">
                                                <Image src={LinkedIn} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='LinkedIn'/>
                                            </a>
                                        )}
                                        {user.Instagram !== 'Instagram' && (
                                            <a href={user.Instagram} target="_blank">
                                                <Image src={Instagram} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Instagram'/>
                                            </a>
                                        )}
                                        {user.Viber !== 'Viber' && (
                                            <a href={user.Viber} target="_blank">
                                                <Image src={Viber} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Viber'/>
                                            </a>
                                        )}
                                        {user.Telegram !== 'Telegram' && (
                                            <a href={user.Telegram} target="_blank">
                                                <Image src={Telegram} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Telegram'/>
                                            </a>
                                        )}
                                        {user.TikTok !== 'TikTok' && (
                                            <a href={user.TikTok} target="_blank">
                                                <Image src={TikTok} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='TikTok'/>
                                            </a>
                                        )}
                                        {user.WhatsApp !== 'WhatsApp' && (
                                            <a href={user.WhatsApp} target="_blank">
                                                <Image src={WhatsApp} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='WhatsApp'/>
                                            </a>
                                        )}
                                        {user.YouTube !== 'YouTube' && (
                                            <a href={user.YouTube} target="_blank">
                                                <Image src={YouTube} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='YouTube'/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div style={{
                                    margin: '15px 0 0 0',
                                    display: user.phone1 === 'phone1' && user.phone2 === 'phone2' ? 'none' : null
                                }}>
                                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                                        Номер телефона
                                    </p>
                                    {user.phone1 !== 'phone1' && (
                                        <p style={{ margin: '5px 0', fontWeight: '400' }}>
                                            <a href={`tel:${user.phone1}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {user.phone1}
                                            </a>
                                        </p>
                                    )}
                                    {user.phone2 !== 'phone2' && (
                                        <p style={{ margin: '5px 0', fontWeight: '400' }}>
                                            <a href={`tel:${user.phone2}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {user.phone2}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mainUserInfoContainer">
                        <div className="mainUserMainInfo">
                            <div style={{paddingLeft: '10px', marginBottom: '15px'}}>
                                <h2 style={{margin: '5px 0'}}>{user.nameOrCompany}</h2>
                                <h5 style={{
                                    margin: '5px 0',
                                    display: user.areasActivity === 'areasActivity' ? 'none' : 'flex'
                                }}>{user.areasActivity}</h5>
                                <p style={{
                                    wordWrap: "break-word",
                                    textAlign: "left",
                                    color: '#666',
                                    margin: '5px 0'
                                }}>
                                    {user.description !== 'description' ? (
                                        <>
                                            {showDescription
                                                ? user.description
                                                : `${user.description?.slice(0, 40)}${
                                                    user.description?.length > 40 ? "... " : " "
                                                }`}

                                            {user.description?.length > 40 && (
                                                <div>
                                                    <button
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#666666',
                                                            textDecoration: 'none',
                                                            cursor: 'pointer',
                                                            fontSize: '12px',
                                                            margin: "0px",
                                                            padding: '0px'
                                                        }}
                                                        onClick={toggleDescription}
                                                    >
                                                        {showDescription ? (
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexDirection: 'row'
                                                            }}>
                                                                <p>Свернуть </p>
                                                                <Image style={{
                                                                    width: '10px',
                                                                    height: '10px',
                                                                    marginLeft: '5px',
                                                                    marginTop: '3px'
                                                                }} src={arrowUp} alt={'>'}/>
                                                            </div>

                                                        ) : (
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexDirection: 'row'
                                                            }}>
                                                                <p>Показать больше </p>
                                                                <Image style={{
                                                                    width: '10px',
                                                                    height: '10px',
                                                                    marginTop: '3px',
                                                                    marginLeft: '5px'
                                                                }} src={arrowDown} alt={'>'}/>
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
                                <div style={{
                                    display: user.city === "city"
                                    && user.region === "region"
                                    && user.street === 'street'
                                    && user.house === 'house'
                                    && user.apartment === 'apartment'
                                    && user.zip === 'zip'
                                        ? 'none' : null
                                }}>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Адрес
                                    </p>
                                    <p style={{margin: '5px 0', fontSize: '14px', color: '#000000', fontWeight:'600'}}>
                                        {user?.workLocation === 'remote' ?
                                            'Я работаю только удалённо или выезжаю на локацию клиента'
                                            : 'У меня есть салон, офис или постоянная локация работы'
                                        }
                                    </p>
                                    <p style={{margin: '5px 0', fontWeight: '400'}}>
                                        {user?.street === 'street' ? null : `${user.street} `}
                                        {user?.house === 'house' ? null : `${user.house}`}
                                        {user?.apartment === 'apartment' ? null : `(${user.apartment}) `}
                                        {user?.city === 'city' ? null : `${user.city}, `}
                                        {user?.region === 'region' ? null : `${user.region}, `}
                                        {user?.zip === 'zip' ? null : `${user.zip}`}
                                    </p>
                                </div>
                                <div style={{
                                    margin: '15px 0 0 0',
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
                                            <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                                Время работы
                                            </p>
                                            <p style={{margin: '5px 0', fontWeight: '400'}}>
                                                ПН: {user.workingHoursMon?.startHours1 === '' ? ' - ' : `${user.workingHoursMon?.startHours1}:${user.workingHoursMon?.startMinutes1}-${user.workingHoursMon?.endHours1}:${user.workingHoursMon?.endMinutes1}`}
                                            </p>
                                            <p style={{
                                                margin: '5px 0',
                                                fontWeight: '400',
                                                display: showWorkTime ? 'flex' : 'none'
                                            }}>
                                                ВТ: {user.workingHoursTue?.startHours2 === '' ? ' - ' : `${user.workingHoursTue?.startHours2}:${user.workingHoursTue?.startMinutes2}-${user.workingHoursTue?.endHours2}:${user.workingHoursTue?.endMinutes2}`}
                                            </p>
                                            <p style={{
                                                margin: '5px 0',
                                                fontWeight: '400',
                                                display: showWorkTime ? 'flex' : 'none'
                                            }}>
                                                СР: {user.workingHoursWed?.startHours3 === '' ? ' - ' : `${user.workingHoursWed?.startHours3}:${user.workingHoursWed?.startMinutes3}-${user.workingHoursWed?.endHours3}:${user.workingHoursWed?.endMinutes3}`}
                                            </p>
                                            <p style={{
                                                margin: '5px 0',
                                                fontWeight: '400',
                                                display: showWorkTime ? 'flex' : 'none'
                                            }}>
                                                ЧТ: {user.workingHoursThu?.startHours4 === '' ? ' - ' : `${user.workingHoursThu?.startHours4}:${user.workingHoursThu?.startMinutes4}-${user.workingHoursThu?.endHours4}:${user.workingHoursThu?.endMinutes4}`}
                                            </p>
                                            <p style={{
                                                margin: '5px 0',
                                                fontWeight: '400',
                                                display: showWorkTime ? 'flex' : 'none'
                                            }}>
                                                ПТ: {user.workingHoursFri?.startHours5 === '' ? ' - ' : `${user.workingHoursFri?.startHours5}:${user.workingHoursFri?.startMinutes5}-${user.workingHoursFri?.endHours5}:${user.workingHoursFri?.endMinutes5}`}
                                            </p>
                                            <p style={{
                                                margin: '5px 0',
                                                fontWeight: '400',
                                                display: showWorkTime ? 'flex' : 'none'
                                            }}>
                                                СБ: {user.workingHoursSat?.startHours6 === '' ? ' - ' : `${user.workingHoursSat?.startHours6}:${user.workingHoursSat?.startMinutes6}-${user.workingHoursSat?.endHours6}:${user.workingHoursSat?.endMinutes6}`}
                                            </p>
                                            <p style={{
                                                margin: '5px 0',
                                                fontWeight: '400',
                                                display: showWorkTime ? 'flex' : 'none'
                                            }}>
                                                ВС: {user.workingHoursSun?.startHours7 === '' ? ' - ' : `${user.workingHoursSun?.startHours7}:${user.workingHoursSun?.startMinutes7}-${user.workingHoursSun?.endHours7}:${user.workingHoursSun?.endMinutes7}`}
                                            </p>
                                            <div>
                                                <button
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#666666',
                                                        textDecoration: 'none',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        margin: "0px",
                                                        padding: '0px'
                                                    }}
                                                    onClick={toggleWorkTime}
                                                >
                                                    {showWorkTime ? (
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            flexDirection: 'row'
                                                        }}>
                                                            <p>Свернуть </p>
                                                            <Image style={{
                                                                width: '10px',
                                                                height: '10px',
                                                                marginLeft: '5px',
                                                                marginTop: '3px'
                                                            }} src={arrowUp} alt={'>'}/>
                                                        </div>

                                                    ) : (
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            flexDirection: 'row'
                                                        }}>
                                                            <p>Показать больше </p>
                                                            <Image style={{
                                                                width: '10px',
                                                                height: '10px',
                                                                marginTop: '3px',
                                                                marginLeft: '5px'
                                                            }} src={arrowDown} alt={'>'}/>
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
                        <div style={{width: '100%', display: serv.length === 0 ? 'none' : null}}>
                            <h2 style={{margin: '15px 0 15px 0'}}>Услуги</h2>
                            <div style={{
                                width: '100%',
                                display: serv.length === 0 ? 'none' : null,
                            }}>
                                <div className="mainUserMainServ">
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
                                            <div key={parent} style={{width: '100%'}}>
                                                <h3 style={{margin: '10px 0 5px 10px'}}>{parent}</h3>
                                                {data.map((obj, arr, index) => (

                                                    <div key={obj.title}
                                                         style={{margin: '0 0 0 0', width: '100%'}}>
                                                        <div className={classes.OneUnderCategoryCheckItem} style={{
                                                            width: 'calc(100% - 20px)',
                                                            height: '50px',
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',
                                                            marginLeft: '0',
                                                            padding: "5px 10px",
                                                            borderBottom: arr !== index.length - 1 ? 'solid #DDDDDD 1px' : 'solid #DDDDDD 0px'
                                                        }}>
                                                            <div style={{
                                                                textDecoration: 'none',
                                                                display: 'flex',
                                                                width: '100%',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between'
                                                            }}>
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
                        <div ref={deskMobileContactBlockRef} className={'deskMobileContactBlock'}>
                            <h2 style={{margin:'15px 0 15px'}}>Контакты</h2>
                            <div style={{
                                padding: '15px 10px',
                                flexDirection: 'column',
                                backgroundColor: "#fff",
                                display: "flex",
                                alignSelf: "center",
                                justifyContent: "center",
                                alignItems: 'flex-start',
                                borderRadius: 8
                            }}>
                                <div>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Почта
                                    </p>
                                    <p style={{margin: '5px 0', fontWeight: '400'}}>
                                        <a href={`mailto:${user.email}`}
                                           style={{textDecoration: 'none', color: 'inherit'}}>
                                            {user.email}
                                        </a>
                                    </p>
                                </div>
                                <div style={{
                                    margin: '15px 0 0 0',
                                    display: user.Facebook === 'Facebook' && user.LinkedIn === 'LinkedIn' && user.Instagram === 'Instagram' && user.Viber === 'Viber' && user.Telegram === 'Telegram' && user.TikTok === 'TikTok' && user.WhatsApp === 'WhatsApp' && user.YouTube === 'YouTube' ? 'none' : "block"
                                }}>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Социальные сети
                                    </p>
                                    <div>
                                        {user.Facebook !== 'Facebook' && (
                                            <a href={user.Facebook} target="_blank">
                                                <Image src={Facebook} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Facebook'/>
                                            </a>
                                        )}
                                        {user.LinkedIn !== 'LinkedIn' && (
                                            <a href={user.LinkedIn} target="_blank">
                                                <Image src={LinkedIn} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='LinkedIn'/>
                                            </a>
                                        )}
                                        {user.Instagram !== 'Instagram' && (
                                            <a href={user.Instagram} target="_blank">
                                                <Image src={Instagram} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Instagram'/>
                                            </a>
                                        )}
                                        {user.Viber !== 'Viber' && (
                                            <a href={user.Viber} target="_blank">
                                                <Image src={Viber} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Viber'/>
                                            </a>
                                        )}
                                        {user.Telegram !== 'Telegram' && (
                                            <a href={user.Telegram} target="_blank">
                                                <Image src={Telegram} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Telegram'/>
                                            </a>
                                        )}
                                        {user.TikTok !== 'TikTok' && (
                                            <a href={user.TikTok} target="_blank">
                                                <Image src={TikTok} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='TikTok'/>
                                            </a>
                                        )}
                                        {user.WhatsApp !== 'WhatsApp' && (
                                            <a href={user.WhatsApp} target="_blank">
                                                <Image src={WhatsApp} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='WhatsApp'/>
                                            </a>
                                        )}
                                        {user.YouTube !== 'YouTube' && (
                                            <a href={user.YouTube} target="_blank">
                                                <Image src={YouTube} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='YouTube'/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div style={{
                                    margin: '15px 0 0 0',
                                    display: user.phone1 === 'phone1' && user.phone2 === 'phone2' ? 'none' : null
                                }}>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Номер телефона
                                    </p>
                                    {user.phone1 !== 'phone1' && (
                                        <p style={{margin: '5px 0', fontWeight: '400'}}>
                                            <a href={`tel:${user.phone1}`}
                                               style={{textDecoration: 'none', color: 'inherit'}}>
                                                {user.phone1}
                                            </a>
                                        </p>
                                    )}
                                    {user.phone2 !== 'phone2' && (
                                        <p style={{margin: '5px 0', fontWeight: '400'}}>
                                            <a href={`tel:${user.phone2}`}
                                               style={{textDecoration: 'none', color: 'inherit'}}>
                                                {user.phone2}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!isContactBlockVisible && (
                    <div className={'userContactBtn'}>
                        <button className={classes.button} onClick={handleScrollToContacts}>
                            Посмотреть способы связи
                        </button>
                    </div>
                )}

                {modalRate && (
                    <ModalRate/>
                )}


                {modalOpen && (
                    <div className={classes.contactOverlay}>
                        <div className={'contactsModalPage'}>
                            <Link className="mainUserBackLink" onClick={handleCloseModal}>
                                <img src={back} alt="back"/>
                                <p>Назад</p>
                            </Link>
                            <h2 style={{margin: '10px 0 20px'}}>Контакты</h2>
                            <div style={{
                                padding: '15px 10px',
                                flexDirection: 'column',
                                backgroundColor: "#fff",
                                display: "flex",
                                alignSelf: "center",
                                justifyContent: "center",
                                alignItems: 'flex-start',
                                borderRadius: 8
                            }}>
                                <div>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Почта
                                    </p>
                                    <p style={{margin: '5px 0', fontWeight: '400'}}>{user.email}</p>
                                </div>
                                <div style={{
                                    margin: '15px 0 0 0',
                                    display: user.Facebook === 'Facebook' && user.LinkedIn === 'LinkedIn' && user.Instagram === 'Instagram' && user.Viber === 'Viber' && user.Telegram === 'Telegram' && user.TikTok === 'TikTok' && user.WhatsApp === 'WhatsApp' && user.YouTube === 'YouTube' ? 'none' : "block"
                                }}>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Социальные сети
                                    </p>
                                    <div>
                                        {user.Facebook !== 'Facebook' && (
                                            <a href={user.Facebook} target="_blank">
                                                <Image src={Facebook} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Facebook'/>
                                            </a>
                                        )}
                                        {user.LinkedIn !== 'LinkedIn' && (
                                            <a href={user.LinkedIn} target="_blank">
                                                <Image src={LinkedIn} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='LinkedIn'/>
                                            </a>
                                        )}
                                        {user.Instagram !== 'Instagram' && (
                                            <a href={user.Instagram} target="_blank">
                                                <Image src={Instagram} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Instagram'/>
                                            </a>
                                        )}
                                        {user.Viber !== 'Viber' && (
                                            <a href={user.Viber} target="_blank">
                                                <Image src={Viber} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Viber'/>
                                            </a>
                                        )}
                                        {user.Telegram !== 'Telegram' && (
                                            <a href={user.Telegram} target="_blank">
                                                <Image src={Telegram} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='Telegram'/>
                                            </a>
                                        )}
                                        {user.TikTok !== 'TikTok' && (
                                            <a href={user.TikTok} target="_blank">
                                                <Image src={TikTok} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='TikTok'/>
                                            </a>
                                        )}
                                        {user.WhatsApp !== 'WhatsApp' && (
                                            <a href={user.WhatsApp} target="_blank">
                                                <Image src={WhatsApp} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='WhatsApp'/>
                                            </a>
                                        )}
                                        {user.YouTube !== 'YouTube' && (
                                            <a href={user.YouTube} target="_blank">
                                                <Image src={YouTube} width="23px" height="23px"
                                                     style={{marginRight: '10px',}} alt='YouTube'/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div style={{
                                    margin: '15px 0 0 0',
                                    display: user.phone1 === 'phone1' && user.phone2 === 'phone2' ? 'none' : null
                                }}>
                                    <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                                        Номер телефона
                                    </p>
                                    {user.phone1 !== 'phone1' && (
                                        <p style={{margin: '5px 0', fontWeight: '400'}}>{user.phone1}</p>
                                    )}
                                    {user.phone2 !== 'phone2' && (
                                        <p style={{margin: '5px 0', fontWeight: '400'}}>{user.phone2}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default UserPage;
