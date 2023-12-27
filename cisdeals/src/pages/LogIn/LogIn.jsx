import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import eye from "../../img/showPas.svg";
import back from "../../img/Arrow_left.svg";
import openEye from "../../img/openEye.svg";
import {logIn} from "../../httpRequests/cisdealsApi";

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
            const res = await logIn(data);
            console.log(res.data)
            localStorage.setItem("token",  JSON.stringify(res.data));
            console.log(JSON.parse(localStorage.getItem('token')));
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
                <Link className={styles.form_link} to="/">
                    <img src={back} alt="back" />
                    <p>Главная</p>
                </Link>
                <h1 className={styles.form_header}>Авторизация</h1>
                <div className={styles.form_options}>
                    <p>Ещё нет аккаунта?</p>
                    <Link to="/signup">
                        <a>Зарегистрироваться</a>
                    </Link>
                </div>
                <div className={styles.main_container}>
                    <h5>Email</h5>
                    <div className={styles.input_container}>
                        <input
                            type="text" placeholder="example@site.com" name="email"
                            onChange={handleChange}
                            value={data.email}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div  className={styles.forgot_pas_container}>
                        <h5>Пароль</h5>
                        <p>Не помните пароль?</p>
                    </div>
                    <div className={styles.input_container}>
                        <input
                            type={showPassword ? "text" : "password"} placeholder="Пароль" name="password"
                            onChange={handleChange}
                            value={data.password}
                            className={styles.input}
                            required
                        />
                        <button
                            type="button"
                            onClick={handleToggleShowPassword}
                            className={styles.input_container}>
                            <img src={showPassword ? openEye : eye} alt="eye"/>
                        </button>
                    </div>
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.create_btn}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
