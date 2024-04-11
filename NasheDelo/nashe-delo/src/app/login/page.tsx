"use client";
import React, { useState } from "react";
import Link from "next/link";
import {useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import eye from "../../img/showPas.svg";
import back from "../../img/Arrow_left.svg";
import openEye from "../../img/openEye.svg";
import {logIn} from "@/httpRequests/cisdealsApi";
import {useRouter} from "next/navigation";
import Image from "next/image";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const { push, replace } = useRouter();

    // @ts-ignore
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await logIn(data);
            console.log(res.data)
            localStorage.setItem("token",  JSON.stringify(res.data));
            // @ts-ignore
            console.log(JSON.parse(localStorage.getItem('token')));
            await push("/");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                // @ts-ignore
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <Link className={styles.form_link} href="/">
                    <Image src={back} alt="back" />
                    <p>Главная</p>
                </Link>
                <h1 className={styles.form_header}>Авторизация</h1>
                <div className={styles.form_options}>
                    <p>Ещё нет аккаунта?</p>
                    <Link href="/signup">
                        <p>Зарегистрироваться</p>
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
                            <Image src={showPassword ? openEye : eye} alt="eye"/>
                        </button>
                    </div>
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.login_btn}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
