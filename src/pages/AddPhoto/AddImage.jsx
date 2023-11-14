import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import PersonalUserPage from "../PersonalUserPage/PersonalUserPage";
import plus from "../../img/Plus.svg";
import Resizer from "react-image-file-resizer";
import arrowUp from '../../img/Property 1=24.svg'

const AddImage = () => {
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
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [buttonText, setButtonText] = useState("Добавить");
    const userLS = localStorage.getItem("token");
    const favoriteUsers = JSON.parse(userLS);
    const [user, setUser] = useState(favoriteUsers.data);
    const [selectedImage, setSelectedImage] = useState('');
    let userId = favoriteUsers.data?._id;

    const [selectedImage2, setSelectedImage2] = useState('');

    useEffect(() => {
        const fetchUserProfile = async (userId) => {
            try {
                const response = await fetch(`http://backend.delkind.pl/user-profile/${UserPage}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.profile);
                } else {
                    throw new Error('Failed to fetch user profile');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile(UserPage);
    }, []);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile.size > 5 * 1024 * 1024) {
            setErrorMessage("Размер файла не может превышать 5Mb");
        } else {
            setErrorMessage("");
            setData({...data, image: event.target.files[0]});
            const reader = new FileReader();
            Resizer.imageFileResizer(
                selectedFile,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    // setSelectedImage(uri);
                    setData({...data, image: event.target.files[0]});
                },
                "base64",
                200,
                200
            );
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                if(user.image.length === 0) {
                    setSelectedImage(reader.result);
                } else {
                    setSelectedImage2(reader.result);
                }

            };
        }
    };
    const handleUpload = async () => {
        try {
            const url = `http://backend.delkind.pl/uploadPhoto/${UserPage}`;
            const formData = new FormData();
            formData.append("image", data.image);
            const res = await axios.put(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setData({...data, image: res.data}); // update image URL in data state
            localStorage.setItem("token", JSON.stringify(res));
            // navigate("/EditProfile");
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        let intervalId;
        let counter = 0;
        if (buttonText === "Загрузка") {
            intervalId = setInterval(() => {
                if (counter % 3 === 0) {
                    setButtonText("Загрузка.");
                } else if (counter % 3 === 1) {
                    setButtonText("Загрузка..");
                } else {
                    setButtonText("Загрузка...");
                }
                counter++;
            }, 500);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [buttonText]);
    const handleSubmit = async (e) => {
        setButtonText("Загрузка");
        let counter = 0;
        const intervalId = setInterval(() => {
            if (counter % 4 === 0) {
                setButtonText("Загрузка");
            } else if (counter % 3 === 1) {
                setButtonText("Загрузка.");
            } else if (counter % 3 === 2) {
                setButtonText("Загрузка..");
            } else {
                setButtonText("Загрузка...");
            }
            counter++;
        }, 250);
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const {data: res} = await axios.put(url, data);
            localStorage.setItem("token", JSON.stringify(res));
            // navigate("/EditProfile");
            setButtonText("Добавить");
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
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const moveImage = async (imageUrl) => {
        try {
            await axios.put(`http://backend.delkind.pl/moveToFront/${UserPage}`, { imageUrl });
            const updatedUser = await axios.get(`http://backend.delkind.pl/user-profile/${UserPage}`);
            setUser(updatedUser.data.profile);
        } catch (err) {
            console.log("Ошибка перемещения изображения", err);
        }
    }
    const removeImage = async (imageUrl) => {
        try {
            await axios.put(`http://backend.delkind.pl/removeImage/${UserPage}`, { imageUrl });
            const updatedUser = { ...user };
            const imageIndex = updatedUser.image.findIndex((image) => image === imageUrl);
            if (imageIndex !== -1) {
                updatedUser.image.splice(imageIndex, 1);
                setUser(updatedUser);
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className={styles.signup_container}>
            <div style={{ width: "94%", height: "3px", background: "#fff", borderRadius:'5px', margin:'10px', alignSelf:'center' }}>
                <div id="progressBar" style={{ width: `100%`, height: "3px",transition: 'width 0.8s ease-in-out', background: "#5CA91A", borderRadius:'5px' }}></div>
            </div>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to={`/AddLoginServ/${UserPage}`}>
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            {/*<div>*/}
            {/*    <ModalUserPage isOpen={modalOpen} onClose={handleCloseModal}/>*/}
            {/*</div>*/}
            <div style={{height: '100%', width: '100%'}}>
                <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                    <h1 style={{margin: "0 0 0 10px"}}>Изображения</h1>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        margin: "10px",
                        padding: "20px 15px"
                    }}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <label
                                    htmlFor={user.image.length === 0 ? "image-upload" : undefined}
                                    style={{
                                        position: "relative",
                                        width: "40vw",
                                        height: "40vw",
                                        borderRadius: "8px",
                                        backgroundColor: "#f1f1f1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {user.image.length > 0 ? (
                                        <img style={{width: "100%", borderRadius: "8px", height: "100%", objectFit:'cover'}} src={user.image[0]} alt="Plus"/>
                                    ) : selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt="Selected"
                                            style={{width: "100%", borderRadius: "8px", height: "100%", objectFit:'cover'}}
                                        />
                                    ) : (
                                        <>
                                            <img src={plus} alt="Plus"/>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                onChange={handleImageChange}
                                                style={{
                                                    position: "absolute",
                                                    width: "100%",
                                                    height: "100%",
                                                    top: 0,
                                                    left: 0,
                                                    opacity: 0,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </>
                                    )}
                                </label>
                            </div>
                            <div style={{
                                width: "40vw",
                                height: "40vw",
                            }}>
                                <h5 style={{margin: "0px 0 5px 0", fontSize: '12px'}}>Главное изображение</h5>
                                <p style={{fontSize: '10px', color: '#5B5B5B'}}>Желательно добавить ваше фото или
                                    логотип. Рекомендуемое соотношение — 1:1</p>
                                <p style={{fontSize: '10px', color: '#5B5B5B'}}>Нажмите кнопку "Добавить", чтобы загрузить фотографию</p>
                            </div>
                        </div>
                        {user.image.length !== 0 && (
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    margin: '20px 0 0 0'
                                }}>
                                    <h5 style={{margin: "0px 0 5px 0", fontSize: '12px'}}>Все изображения</h5>
                                    <p style={{
                                        fontSize: '12px',
                                        color: '#000',
                                        margin: '0'
                                    }}>{`${user.image.length}/5`}</p>
                                </div>
                                <p style={{fontSize: '10px', color: '#5B5B5B', margin: '1px 0 8px 0'}}>Желательно добавить фото
                                    работ, офиса или салона. Рекомендуемое соотношение — 1:1</p>
                                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {user.image.map((imageUrl, index) => (
                                        <div>
                                            <div key={index} style={{
                                                width: '57px',
                                                marginRight: index === user.image.length - 1 ? 0 : '6px',
                                                height: '57px',
                                                alignSelf: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                borderRadius: '6px',
                                                overflow: 'hidden',
                                                zIndex:'1'
                                            }}>
                                                <img src={imageUrl} alt={`image-${index}`} style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    filter: 'blur(0.4px)'
                                                }}/>
                                                <div onClick={() => removeImage(imageUrl)} style={{
                                                    position: 'absolute',
                                                    top: '0px',
                                                    right: '0px',
                                                    backgroundColor: '#F1F1F1',
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '0px 4px 0px 4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                                                    zIndex:'2',
                                                }}>
                                                    <img style={{width:'12px', rotate:'45deg'}} src={plus} alt="Plus"/>
                                                </div>
                                            </div>
                                            <div onClick={() => moveImage(imageUrl)} style={{
                                                width: '57px',
                                                height: '20px',
                                                marginTop:'5px',
                                                display:'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '6px',
                                                backgroundColor:'#f1f1f1'
                                            }}>
                                                <img style={{width:'14px'}} src={arrowUp} alt="Поднять"/>
                                            </div>
                                        </div>
                                    ))}
                                    {user.image.length < 5 && (
                                        <label
                                            htmlFor="image-upload"
                                            style={{
                                                position: "relative",
                                                width: '57px',
                                                height: '57px',
                                                marginLeft: user.image.length === 0 ? '0px' : '6px',
                                                borderRadius: "6px",
                                                backgroundColor: "#f1f1f1",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >

                                            <div style={{
                                                width: '57px',
                                                height: '57px',
                                                marginLeft: '6px',
                                                backgroundColor: '#EFEFEF',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 6
                                            }}>
                                                {selectedImage2 ? (
                                                    <img
                                                        src={selectedImage2}
                                                        alt="Selected"
                                                        style={{width: '57px', height: '57px',marginRight:'3px', borderRadius: "6px", objectFit:'cover',filter: 'blur(0.4px)' }}
                                                    />
                                                ) : (
                                                    <img style={{marginRight: '6px'}} src={plus} alt="Plus"/>
                                                )}

                                            </div>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                onChange={handleImageChange}
                                                style={{
                                                    position: "absolute",
                                                    width: "100%",
                                                    height: "100%",
                                                    top: 0,
                                                    left: 0,
                                                    opacity: 0,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </label>

                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {errorMessage && <div className={styles.error_msg}>{errorMessage}</div>}
                    <button disabled={data.image.length === 0 ||!data.image || data.image.length > 5242880} type="submit" onClick={handleUpload}
                            className={styles.green_btn}>
                        <p  style={{margin:'0', fontSize:'14px', color:'#fff', fontWeight:'600'}}>{buttonText}</p>
                    </button>
                    <Link to={'/'} style={{textDecoration:'none', alignSelf:'center'}}>
                        <div style={{width:'220px', border:'2px solid #000', display:'flex', justifyContent:"center", borderRadius:'8px'}}>
                            <p style={{margin:'10px 0', fontSize:'14px', color:'#000', fontWeight:'600'}}>Завершить регистрацию</p>
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    );
};
export default AddImage;
