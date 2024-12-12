import React from 'react';
import './HomePage.css';

const auroraLogo = 'https://res.cloudinary.com/dfl7i5tm2/image/upload/v1720709006/auroraLogo_kgmwpa.png';

const HomePage = () => {
    return (
        <div className="background">
            <div className="background-block">
                <p className="logo-title">Eggo Quest Bot</p>
                <h2>Beta Test has started!</h2>
                <p>Hello Eggo Quest Adventurer!</p>
                <p>
                    The alpha test has ended, so as a sign of our gratitude for participating in it, we have prepared a
                    special reward for you. To earn rewards, join our new bot by clicking the link below. Not only will
                    you receive a reward, but you will also maintain the style and rarity of your egg. Your feedback has
                    been invaluable and we can't wait to continue this journey with you.
                </p>
                <p>Thank you for your support and happy questing!</p>
                <div className="link-button-block">
                    <a className="link-button" href="https://t.me/eggo_quest_bot">Go to Beta Test</a>
                </div>


            </div>
            <img className="logo" src={auroraLogo} alt="Aurora Logo"/>
            <p className="logo-text">@EGGO_QUEST_BOT</p>
        </div>
    );
};

export default HomePage;