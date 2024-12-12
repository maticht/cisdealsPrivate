"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>ПЕРЕВОЗКИ</div>
            <nav className={styles.nav}>
                <Link href="/" className={pathname === '/' ? styles.active : ''}>Главная</Link>
                <Link href="/transfers" className={pathname === '/transfers' ? styles.active : ''}>Трансферы</Link>
                <Link href="/tariffs" className={pathname === '/tariffs' ? styles.active : ''}>Тарифы</Link>
                <Link href="/contacts" className={pathname === '/contacts' ? styles.active : ''}>Контакты</Link>
            </nav>
        </header>
    );
}
