import React, { useEffect,useState } from "react";
import { Link,useParams, useNavigate } from "react-router-dom";
import selfie from '../../img/selfie.svg';
import {updateProfile} from "../../httpRequests/cisdealsApi";
import './SuccessfulLoginScreen.css'

const SuccessfulLoginScreen = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("token");
    let localUserObj = JSON.parse(user);
    const [userId, setUserId] = useState(localUserObj?.data?._id);
    const [validUrl, setValidUrl] = useState(true);
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

    // useEffect(() => {
    //     const verifyEmailUrl = async () => {
    //         try {
    //             const url = `http://backend.delkind.pl/verifyToken/${param.id}/verify/${param.token}`;
    //             const { data } = await axios.get(url);
    //             console.log(data);
    //             setValidUrl(true);
    //         } catch (error) {
    //             console.log(error);
    //             setValidUrl(false);
    //         }
    //     };
    //
    //     verifyEmailUrl();
    // }, [param.id, param.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            // const url = `http://backend.delkind.pl/update/${param.id}`;
            // const { data: res } = await axios.put(url, data);
            // localStorage.setItem("token",  JSON.stringify(res));
            const res = await updateProfile(UserPage, data);
            localStorage.setItem("token",  JSON.stringify(res));
            console.log(localStorage.getItem("token"))
            navigate("/");
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
        <div className={'SuccessfulScreen'}>
            {/*{validUrl ? (*/}
            {/*    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>*/}
            {/*        <img src={selfie} style={{width:'200px'}} alt={"Hello"}/>*/}
            {/*        <div style={{alignSelf:'center', flexWrap:'wrap', textAlign: 'center', width:'310px'}}>*/}
            {/*            <h2>Спасибо! Ваш аккаунт зарегистрирован!</h2>*/}
            {/*        </div>*/}
            {/*        <Link  to={`/AddServicesScreen/${param.id}`} style={{textDecoration:'none',backgroundColor:'#000',display:'flex', width:'310px', alignItems:'center', borderRadius:'8px', justifyContent:'center', marginBottom:'15px'}}>*/}
            {/*            <p style={{color:'#fff', fontSize:'14px', fontWeight:'600', alignSelf:'center', justifyContent:'center'}}>Добавить свои услуги</p>*/}
            {/*        </Link>*/}
            {/*        <div  onClick={handleSubmit} style={{backgroundColor:'rgba(0,0,0,0)',display:'flex', width:'306px',textDecoration:"none", alignItems:'center', borderRadius:'8px', justifyContent:'center', marginBottom:'15px', border: '2px solid #000'}}>*/}
            {/*            <p style={{color:'#000', fontSize:'14px', fontWeight:'600', alignSelf:'center', justifyContent:'center'}}>Перейти к поиску специалистов</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <h1>404 Not Found</h1>*/}
            {/*)}*/}
            <div className={'SuccessfulScreenBlock'}>
                <img src={selfie} alt={"Hello"}/>
                <div className={'SuccessfulScreenTitle'}>
                    <h2>Спасибо! Ваш аккаунт зарегистрирован!</h2>
                </div>
                <Link className={'SuccessfulAddServBtn'} to={`/AddContactInfo/${UserPage}`}>
                    <p>Добавить свои услуги</p>
                </Link>
                <div className={'SuccessfulHomeBtn'} onClick={handleSubmit} style={{}}>
                    <p>Перейти к поиску специалистов</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessfulLoginScreen;
