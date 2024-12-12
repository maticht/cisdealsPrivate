"use client";
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>©2024 ООО "Перевозки"</p>
            <p>
                <Link href="/privacy" className={styles.link}>Политика конфиденциальности</Link> |{' '}
                <Link href="/terms" className={styles.link}>Пользовательское соглашение</Link>
            </p>
        </footer>
    );
}
