import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import eye from "../../img/showPas.svg";
const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://backend.delkind.pl/auth`;
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token",  JSON.stringify(res));
            navigate("/");
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
        <div className={styles.login_container}>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <Link style={{textDecoration: "none",display:'flex', alignSelf:'flex-start', color: "#454545", fontSize: "14px",margin:"20px 0 10px 10px"}} to="/">˂ Главная</Link>
                <h1 style={{margin:"0 0 0 10px",display:'flex', alignSelf:'flex-start',}}>Вход</h1>
                <div style={{display:'flex', flexDirection:'row',alignItems:'center', marginLeft:10, justifyContent:"flex-start"}}>
                    <p style={{fontSize:14,}}>Ещё нет аккаунта? </p>
                    <Link to="/signup" style={{textDecoration:"none", marginLeft:'5px'}}>
                        <p style={{textDecoration:"none",color:"#5CA91A", fontWeight:"bold"}}>Зарегистрироваться</p>
                    </Link>
                </div>
                <div style={{justifyContent:"center", backgroundColor:"#fff",borderRadius:8, margin:"10px 10px", padding:"20px 10px"}}>
                    <h5 style={{margin:"0 0 5px 0"}}>Email</h5>
                    <div style={{position: 'relative', display:'flex', alignItems:'center'}}>
                        <input
                            type="text"
                            placeholder="example@site.com"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                        <h5 style={{margin:"10px 0 5px 0"}}>Пароль</h5>
                        <p style={{margin:0, fontSize:"10px"}}>Не помните пароль?</p>
                    </div>
                    <div style={{position: 'relative', display:'flex', alignItems:'center'}}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Пароль"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
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
                            <img src={eye} alt="eye" width="23px"  height="23px" style={{marginTop:'4px', opacity: showPassword ? "100%" : "50%"}}/>
                        </button>
                    </div>
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
