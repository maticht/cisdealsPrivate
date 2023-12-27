import React from "react";
import {Link} from "react-router-dom";
import telegram from '../../img/telegram.svg';
import back from "../../img/Arrow_left.svg";


const ContactDeveloper = () => {
    const daniilTelegramLink = 'https://t.me/daniil_elkind';
    const matveiTelegramLink = 'https://t.me/Maticht';
    const userId = JSON.parse(localStorage.getItem("token"));
    console.log(userId.data._id);
    const handleTelegramClick = (telegramLink) => {
        window.open(telegramLink, '_blank');
    }
    return (
        <div className={'AllContainer'}>
            <div className={'AllCategoryScreenContainer'}>
                <Link className="form-update-link" to={`/PersonalUserPage/${userId.data._id}`}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <p className="form-prsnl-heading">Связаться с разработчиками</p>
                <div className={'AllCategoryScreenBlock'}>
                    <div onClick={() => handleTelegramClick(daniilTelegramLink)}
                         className={'contactDeveloperItem'}>
                        <p>Daniil Elkind</p>
                        <img src={telegram} alt={'telegram'}/>
                    </div>
                    <div onClick={() => handleTelegramClick(matveiTelegramLink)}
                         className={'contactDeveloperItem'}>
                        <p>Matvey Treyvas</p>
                        <img src={telegram} alt={'telegram'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactDeveloper;
