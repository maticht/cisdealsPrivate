"use client";
import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signUp} from "@/httpRequests/cisdealsApi";
import styles from "./styles.module.css";
import eye from "../../img/showPas.svg";
import openEye from '../../img/openEye.svg'
import back from '../../img/Arrow_left.svg'
import Image from "next/image";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "firstName",
        lastName: "lastName",
        password: "",
        nameOrCompany: "",
        areasActivity: "Красота и уход",
        phone1: "phone1",
        phone2: "phone2",
        image: [],
        workingHoursMon: {
            startHours1:'startHours',
            startMinutes1:'startMinutes',
            endHours1:'endHours',
            endMinutes1:'endMinutes',
        },
        workingHoursTue: {
            startHours2:'startHours',
            startMinutes2:'startMinutes',
            endHours2:'endHours',
            endMinutes2:'endMinutes',
        },
        workingHoursWed: {
            startHours3:'startHours',
            startMinutes3:'startMinutes',
            endHours3:'endHours',
            endMinutes3:'endMinutes',
        },
        workingHoursThu: {
            startHours4:'startHours4',
            startMinutes4:'startMinutes4',
            endHours4:'endHours4',
            endMinutes4:'endMinutes4',
        },
        workingHoursFri: {
            startHours5:'startHours5',
            startMinutes5:'startMinutes5',
            endHours5:'endHours5',
            endMinutes5:'endMinutes5',
        },
        workingHoursSat: {
            startHours6:'startHours6',
            startMinutes6:'startMinutes6',
            endHours6:'endHours6',
            endMinutes6:'endMinutes6',
        },
        workingHoursSun: {
            startHours7:'startHours7',
            startMinutes7:'startMinutes7',
            endHours7:'endHours7',
            endMinutes7:'endMinutes7',
        },
        Facebook: "Facebook",
        TikTok: "TikTok",
        YouTube: "YouTube",
        Instagram: "Instagram",
        WhatsApp: "WhatsApp",
        Telegram: "Telegram",
        Viber: "Viber",
        LinkedIn: "LinkedIn",
        city: "city",
        region: "region",
        street: "street",
        house: "house",
        apartment: "apartment",
        zip: "zip",
        workLocation: 'workLocation',
        description: "description",
        services: "services",
        price: "price",
        savedUsers: [],
        likes: "likes",
        rating: [],
    });
    const [error, setError] = useState("");
    const [msg,setMsg] = useState('');
    const [userId, setUserId] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { push, replace } = useRouter();
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try {
            const res = await signUp(data);
            console.log(res.data);
            localStorage.setItem("token",  JSON.stringify(res.data));
            const user = localStorage.getItem("token");
            let localUserObj = JSON.parse(user);
            let User = localUserObj.data ? localUserObj.data?._id : null;
            setUserId(User);
            setMsg(res.message)
            await push(`/SuccessfulLoginScreen/${res.data.data?._id}`);
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
        <div className={styles.signup_container}>
            <form className={styles.form_container} onSubmit={handleSubmit} noValidate>
                <Link className={styles.form_link} href="/">
                    <Image src={back} alt="back" />
                    <p>Главная</p>
                </Link>
                <h1 className={styles.form_header}>Регистрация</h1>
                <div className={styles.form_options}>
                    <p>Уже есть аккаунт?</p>
                    <Link href="/login" className={styles.form_options}>
                        <p>Войти</p>
                    </Link>
                </div>
                <div className={styles.main_container}>
                    <h5>Имя или название компании</h5>
                    <input
                        type="text" placeholder="Apple" name="nameOrCompany"
                        onChange={handleChange}
                        value={data.nameOrCompany}
                        className={styles.mainInput}
                        required
                    />
                    <h5>Email</h5>
                    <input
                        type="email" placeholder="example@site.com" name="email"
                        onChange={handleChange}
                        value={data.email}
                        className={styles.mainInput}
                        required
                    />
                    <h5>Пароль</h5>
                    <div className={styles.input_container}>
                        <input
                            type={showPassword ? "text" : "password"} placeholder="Введите пароль" name="password"
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
                {error && !msg && <div className={styles.error_msg}>{error}</div>}
                {msg && <div className={styles.success_msg}>{msg}</div>}
                <button type="submit" className={styles.create_btn}>
                    Создать аккаунт
                </button>
            </form>
        </div>
    );

};

export default Signup;
