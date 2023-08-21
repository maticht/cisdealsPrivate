import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./Update.css";
import eye from "../../img/showPas.svg";
import yesEye from "../../img/24=yes.svg";


const Update = () => {
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
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState([]);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });

    };
    const fetchUserProfile = async (userId) => {
        try {
            const { data } = await axios.get(`http://backend.delkind.pl/user-profile/${UserPage}`);
            setUser(data.profile);
            setData({
                firstName: "",
                lastName: "",
                password: "",
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
                nameOrCompany: data.profile.nameOrCompany,
            });
            console.log(data.profile);
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
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const { data: res } = await axios.put(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            navigate("/EditProfile");
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
        <div className={'signup_container'}>
            <div style={{width: '100%', margin: '0 auto', maxWidth:'800px'}}>
                <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to="/EditProfile">
                    <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                        {`< Назад`}
                    </p>
                </Link>
                <form className={'form_container'} onSubmit={handleSubmit} noValidate>
                    <h1 style={{margin:"0 0 0 10px"}}>Изменение личной информации</h1>
                    <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>

                        <div>
                            <h5 style={{margin:"0 0 5px 0"}}>Имя или Название компании</h5>
                            <input
                                type="text"
                                placeholder="Apple"
                                name="nameOrCompany"
                                onChange={handleChange}
                                value={data.nameOrCompany}
                                required
                                className={'input'}
                            />

                            <h5 style={{margin:"10px 0 5px 0"}}>Пароль</h5>
                            <div style={{position: 'relative', display:'flex', alignItems:'center'}}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Пароль"
                                    name="password"
                                    onChange={handleChange}
                                    value={data.password}
                                    required
                                    className={'input'}
                                />
                                <button onClick={handleToggleShowPassword} type="button" style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontSize: '14px',
                                    color: '#000',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}>
                                    <img src={showPassword ? eye : yesEye} alt="eye" width="23px"  height="23px" style={{marginTop:'4px'}}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {error && <div className={'error_msg'}>{error}</div>}
                    <button type="submit" className={'green_btn'}>
                        Изменить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;
