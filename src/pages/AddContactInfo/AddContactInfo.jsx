import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "./styles.module.css";


const AddContactInfo = () => {
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
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const url = `http://backend.delkind.pl/update/${UserPage}`;
            const { data: res } = await axios.put(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            navigate(`/AddLocation/${UserPage}`);
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
        const progressBar = document.querySelector('#progressBar');
        progressBar.style.width = '25%';
    }, []);

    return (
        <div className={styles.signup_container} style={{height:'100vh'}}>
            <div style={{ width: "94%", height: "3px", background: "#fff", borderRadius:'5px', margin:'10px', alignSelf:'center' }}>
                <div id="progressBar" style={{ width: `12.5%`, height: "3px",transition: 'width 0.8s ease-in-out', background: "#5CA91A", borderRadius:'5px' }}></div>
            </div>
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to={`/AddServicesScreen/${UserPage}`}>
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px", marginLeft:'10px'}}>
                    {`< Назад`}
                </p>
            </Link>
            <form className={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
            }} onSubmit={handleSubmit} noValidate>
                <h2 style={{margin:"0 0 0 10px"}}>Добавление контактной информации</h2>
                <div style={{justifyContent:"flex-start", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>

                    <div>
                        <h5 style={{margin:"0 0 5px 0"}}>Номер телефона</h5>
                        <input
                            type="text"
                            placeholder="Телефон"
                            name="phone1"
                            onChange={handleChange}
                            value={data.phone1}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Телефон 2"
                            name="phone2"
                            onChange={handleChange}
                            value={data.phone2}
                            required
                            className={styles.input}
                        />
                    </div>
                </div>
                <div style={{alignSelf:'center', width:'100%', display:'flex', justifyContent:'center'}}>
                    {error && <div className={styles.error_msg}>{error}</div>}
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <button type="submit" style={{}} className={styles.green_btn}>
                        Изменить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContactInfo;
