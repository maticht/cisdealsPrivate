"use client";
import React, { useState } from 'react';
import { getDistance } from 'geolib';
import styles from './Transfers.module.css';
import citiesData from '../data/cities.json';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

interface City {
    name: string;
    coordinates: { lat: number; lng: number };
    destinations: { name: string; coordinates: { lat: number; lng: number } }[];
}

const Transfers = () => {
    const [fuelPrice, setFuelPrice] = useState<number>(2.0);
    const [fuelConsumption, setFuelConsumption] = useState<number>(0.08);
    const fixedCost = 20;

    const calculateDistance = (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
        return getDistance(start, end) / 1000;
    };

    const calculateCost = (distance: number) => {
        const fuelCost = distance * fuelConsumption * fuelPrice;
        return (fuelCost + fixedCost).toFixed(2);
    };

    return (
        <div className={styles.transfersContainer}>
            <Header />
            <h1 className={styles.title}>Популярные трансферы</h1>

            <section className={styles.routeCreation}>
                <div>
                    <div className={styles.routeCreationHead}>
                        <h2 className={styles.routeCreationTitle}>Свой маршрут</h2>
                        <a href="#" className={styles.createButton}>
                            Создать &gt;
                        </a>
                    </div>
                    <p className={styles.routeCreationDescription}>
                        Используйте гибкую настройку своего маршрута, позволяющую задать его вплоть до точных координат.
                        Это обеспечит максимальную точность и удобство при планировании вашего пути.
                    </p>
                </div>
            </section>

            <div className={styles.cityCardsContainer}>
                {citiesData.cities.map((city: City) => (
                    <div key={city.name} className={styles.cityCard}>
                        <h2 className={styles.cityName}>{city.name}-</h2>
                        <div className={styles.destinationList}>
                            {city.destinations.map((destination) => {
                                const distance = calculateDistance(city.coordinates, destination.coordinates);
                                const cost = calculateCost(distance);
                                return (
                                    <div key={destination.name} className={styles.destinationItem}>
                                        <span>{destination.name}</span>
                                        <span className={styles.destinationPrice}>от {cost}р.</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {citiesData.cities.map((city: City) => (
                    <div key={city.name} className={styles.cityCard}>
                        <h2 className={styles.cityName}>{city.name}-</h2>
                        <div className={styles.destinationList}>
                            {city.destinations.map((destination) => {
                                const distance = calculateDistance(city.coordinates, destination.coordinates);
                                const cost = calculateCost(distance);
                                return (
                                    <div key={destination.name} className={styles.destinationItem}>
                                        <span>{destination.name}</span>
                                        <span className={styles.destinationPrice}>от {cost}р.</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {citiesData.cities.map((city: City) => (
                    <div key={city.name} className={styles.cityCard}>
                        <h2 className={styles.cityName}>{city.name}-</h2>
                        <div className={styles.destinationList}>
                            {city.destinations.map((destination) => {
                                const distance = calculateDistance(city.coordinates, destination.coordinates);
                                const cost = calculateCost(distance);
                                return (
                                    <div key={destination.name} className={styles.destinationItem}>
                                        <span>{destination.name}</span>
                                        <span className={styles.destinationPrice}>от {cost}р.</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Transfers;
