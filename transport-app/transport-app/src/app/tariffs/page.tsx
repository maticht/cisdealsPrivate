"use client";
import { useEffect, useState } from 'react';
import styles from './Tariffs.module.css';
import tariffsData from '../data/tariffs.json';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface Tariff {
    name: string;
    description: string;
    cars: string[];
    price_per_km: string;
}

const Tariffs = () => {
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const router = useRouter();

    useEffect(() => {
        setTariffs(tariffsData.tariffs);
    }, []);

    return (
        <div className={styles.tariffsContainer}>
            <Header />
            <h1 className={styles.title}>Тарифы</h1>
            <div className={styles.tariffsList}>
                {tariffs.map((tariff) => (
                    <Link href={`/tariff-details/${tariff.name}`} key={tariff.name} className={styles.tariffCard}>
                        <h2 className={styles.tariffName}>{tariff.name} &gt;</h2>
                        <p className={styles.description}>{tariff.description}</p>
                        <p className={styles.cars}>
                            <strong>Автомобили:</strong> {tariff.cars.join(', ')}
                        </p>
                        <p className={styles.price}>
                            <strong>Стоимость за 1 км:</strong> {tariff.price_per_km}
                        </p>
                    </Link>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Tariffs;