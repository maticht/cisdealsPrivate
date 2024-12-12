"use client";
import { useEffect, useState } from 'react';
import tariffsData from '../../data/tariffs.json';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from '../TariffDetails.module.css';
import Link from "next/link";

interface Tariff {
    name: string;
    description: string;
    cars: string[];
    price_per_km: string;
}

type Props = {
    params: {
        name: string;
    }
};

const TariffDetails = ({ params: { name } }: Props) => {
    const [tariff, setTariff] = useState<Tariff | null>(null);

    useEffect(() => {
        if (name) {
            const decodedName = decodeURIComponent(name);
            const selectedTariff = tariffsData.tariffs.find(t => t.name === decodedName);
            setTariff(selectedTariff || null);
        }
    }, [name]);

    if (!tariff) return <div>Loading...</div>;

    return (
        <div className={styles.tariffDetailsContainer}>
            <Header />
            <div className={styles.tariffDetailsContent}>
                <h1 className={styles.title}>{tariff.name}</h1>
                <p className={styles.description}>{tariff.description}</p>
                <p className={styles.price}>
                    <strong>Стоимость за 1 км:</strong> {tariff.price_per_km}
                </p>
                <div className={styles.carsSlider}>
                    {tariff.cars.map((car, index) => (
                        <Link
                            key={index}
                            href={{
                                pathname: '/order-form',
                                query: { selectedTariff: tariff.name, selectedCar: car }
                            }}
                        >
                            <div key={index} className={styles.car}>
                                {car}
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TariffDetails;