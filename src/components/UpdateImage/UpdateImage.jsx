import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";
import plus from "../../img/Plus.svg";
import Resizer from "react-image-file-resizer";
import arrowUp from '../../img/Property 1=24.svg'
import {moveToFront, updateProfile, uploadPhoto, userProfile, removeImage} from "../../httpRequests/cisdealsApi";
import back from "../../img/Arrow_left.svg";

const UpdateImage = () => {
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
                const data = await userProfile(userId);
                setUser(data.profile);
                console.log(data.profile);
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
                if (user.image.length === 0) {
                    setSelectedImage(reader.result);
                } else {
                    setSelectedImage2(reader.result);
                }

            };
        }
    };
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("image", data.image);
            const res = await uploadPhoto(UserPage, data);
            setData({...data, image: res.data});
            console.log(res.data)
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
            const res = await updateProfile(UserPage, data);
            localStorage.setItem("token",  JSON.stringify(res));
            console.log(localStorage.getItem("token"))
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
    const moveImage = async (imageUrl) => {
        try {
            await moveToFront(UserPage, imageUrl);
            const updatedUser = await userProfile(UserPage);
            setUser(updatedUser.profile);
        } catch (err) {
            console.log("Ошибка перемещения изображения", err);
        }
    }
    const removeUserImage = async (imageUrl) => {
        try {
            await removeImage(UserPage, imageUrl);
            const updatedUser = {...user};
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
            <div className="main-container">
                <Link className="form-update-link" to="/EditProfile">
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <div>
                    <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                        <p className="form-heading">Изображения</p>
                        <div className={styles.imageContainer}>
                            <div className={styles.firstImageCont}>
                                <div>
                                    <label
                                        className={styles.firstImageBlock}
                                        htmlFor={user.image.length === 0 ? "image-upload" : undefined}>
                                        {user.image.length === 0 ?
                                            selectedImage ? (
                                                <img src={selectedImage} alt="Selected" className={styles.userImage}/>
                                            ) : (
                                                <img src={plus} alt="Plus"/>
                                            ) : (
                                                <img className={styles.userImage} src={user.image[0]} alt="Plus"/>
                                            )
                                        }
                                        {user.image.length === 0 && (
                                            <input
                                                id="image-upload"
                                                type="file"
                                                onChange={handleImageChange}
                                                className={styles.userImageInput}
                                            />
                                        )}
                                    </label>
                                </div>
                                <div className={styles.imageDescription}>
                                    <h5 className={styles.imageDescriptionTitle}>Главное изображение</h5>
                                    <p className={styles.imageDescriptionText}>Желательно добавить ваше фото или
                                        логотип. Рекомендуемое соотношение — 1:1</p>
                                    <p className={styles.imageDescriptionText}>Нажмите кнопку "Добавить", чтобы
                                        загрузить фотографию</p>
                                </div>
                            </div>
                            {user.image.length !== 0 && (
                                <div>
                                    <div className={styles.allImageDescBlock}>
                                        <h5 className={styles.imageDescriptionTitle}>Все изображения</h5>
                                        <p className={styles.allImageDescriptionNum}>{`${user.image.length}/5`}</p>
                                    </div>
                                    <p className={styles.allImageDescriptionText}>Желательно
                                        добавить фото
                                        работ, офиса или салона. Рекомендуемое соотношение — 1:1</p>
                                    <div className={styles.flexImgContainer}>
                                        {user.image.map((imageUrl, index) => (
                                            <div>
                                                <div key={index} className={styles.imageСontainer} style={{
                                                    marginRight: index === user.image.length - 1 ? 0 : '6px',
                                                }}>
                                                    <img src={imageUrl} alt={`image-${index}`} className={styles.imageContainerImg}/>
                                                    <div onClick={() => removeUserImage(imageUrl)} className={styles.removeImgButton}>
                                                        <img src={plus}
                                                             alt="Plus"/>
                                                    </div>
                                                </div>
                                                <div onClick={() => moveImage(imageUrl)} className={styles.upImageСontainer}>
                                                    <img src={arrowUp} alt="Поднять"/>
                                                </div>
                                            </div>
                                        ))}
                                        {user.image.length < 5 && (
                                            <label
                                                htmlFor="image-upload"
                                                className={styles.imageAddСontainer}
                                            >
                                                <div className={styles.adidionalImageСontainer}>
                                                    {selectedImage2 ? (
                                                        <img
                                                            src={selectedImage2}
                                                            alt="Selected"
                                                            className={styles.imageContainerImg}
                                                        />
                                                    ) : (
                                                        <img className={styles.imagePlus} src={plus} alt="Plus"/>
                                                    )}

                                                </div>
                                                <input
                                                    id="image-upload"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    className={styles.userImageInput}
                                                />
                                            </label>

                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {errorMessage && <div className={styles.error_msg}>{errorMessage}</div>}
                        <button disabled={data.image.length === 0 || !data.image || data.image.length > 5242880}
                                type="submit" onClick={handleUpload}
                                className={'create_btn'}>
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};
export default UpdateImage;
