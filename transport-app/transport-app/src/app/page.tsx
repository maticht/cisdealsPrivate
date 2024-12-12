"use client"
import Image from 'next/image';
import './Home.css';
import Head from 'next/head';
import { useRef, FormEvent } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

export default function Home() {

  const contactFormRef = useRef<HTMLFormElement>(null);
  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const phone = form.elements.namedItem('phone') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const note = form.elements.namedItem('note') as HTMLTextAreaElement;

    alert(`Данные отправлены:
      Имя: ${name.value},
      Телефон: ${phone.value},
      Почта: ${email.value},
      Примечание: ${note.value}`);
  };

  return (
      <div className="container">
        <Head>
          <title>Перевозки и Трансферы</title>
          <meta name="description" content="Быстро, Дешево, Качественно" />
        </Head>
        <Header />

        <main className="main">
          <section className="hero">
            <h1>Перевозки и трансферы</h1>
            <p>Быстро, Дешево, Качественно</p>
            <button onClick={scrollToContactForm}>Связаться</button>
          </section>

          <section className="services">
            <h2>Наши услуги</h2>
            <div className="servicesGrid">
              <div className="serviceCard">
                <div className="serviceCardHead">
                  <h3>Трансферы</h3>
                  <Image
                      src="/img/TransferIcon.png"
                      alt="Трансферы"
                      width={35}
                      height={50}
                  />
                </div>
                <p>Комфортные и надежные поездки в аэропорт, вокзалы и любое другое место.</p>
              </div>
              <div className="serviceCard">
                <div className="serviceCardHead">
                  <h3>Тарифы аренды</h3>
                  <Image
                      src="/img/TariffsIcon.png"
                      alt="Тарифы"
                      width={45}
                      height={40}
                  />
                </div>
                <p>Разнообразные тарифы на аренду автомобилей для трансферов любого бюджета и случая.</p>
              </div>
              <div className="serviceCard">
                <div className="serviceCardHead">
                  <h3>Экскурсии</h3>
                  <Image
                      src="/img/ExcursionsIcon.png"
                      alt="Экскурсии"
                      width={45}
                      height={45}
                  />
                </div>
                <p>Увлекательные автобусные экскурсии по интересным и красивым местам.</p>
              </div>
            </div>
          </section>

          <section className="additionalServices">
            <h2>Дополнительные услуги</h2>
            <div className="servicesGrid">
              <div className="additionalServiceCard">
                <Image
                    src="/img/AnimalsIcon.png"
                    alt="Животные"
                    width={42}
                    height={50}
                />
                Перевозка животных
              </div>
              <div className="additionalServiceCard">
                <Image
                    src="/img/LuggageIcon.png"
                    alt="Багажа"
                    width={50}
                    height={50}
                />
                Доставка багажа
              </div>
              <div className="additionalServiceCard">
                <Image
                    src="/img/LargeLuggageIcon.png"
                    alt="Крупногабаритный"
                    width={50}
                    height={50}
                />
                Крупногабаритный багаж
              </div>
              <div className="additionalServiceCard">
                <Image
                    src="/img/MeetingIcon.png"
                    alt="Встреча"
                    width={42}
                    height={50}
                />
                Встреча с табличкой
              </div>
            </div>
          </section>

          <section className="contact">
            <div className="contactText">
              <h2>Свяжитесь с нами</h2>
              <p>
                Наш сервис предоставляет возможность гибкой настройки маршрута до точных координат.
                Это позволит вам спланировать поездку максимально удобно и эффективно,
                учитывая все ваши пожелания. Независимо от того, требуется ли вам трансфер до аэропорта,
                межгородская поездка или индивидуальный маршрут, мы гарантируем удобство,
                комфорт и надежность в каждом заказе.
              </p>
            </div>
            <form ref={contactFormRef} className="contactForm" onSubmit={handleSubmit}>
              <b>Ваши данные</b>
              <input type="text" name="name" placeholder="Имя Фамилия*" required />
              <input type="tel" name="phone" placeholder="Телефон*" required />
              <input type="email" name="email" placeholder="Почта" />
              <textarea name="note" placeholder="Примечание"></textarea>
              <button type="submit">Отправить</button>
            </form>
          </section>
        </main>

        <Footer />
      </div>
  );
}
