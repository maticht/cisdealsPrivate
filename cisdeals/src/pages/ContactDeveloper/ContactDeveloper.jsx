import React, {useState} from "react";
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
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description } = formData;
        // Здесь можно добавить логику для отправки на почту
        console.log(`Заголовок: ${title}, Описание: ${description}`);
        // Очистка формы после отправки
        setFormData({
            title: '',
            description: ''
        });
    };
    return (
        <div className={'AllContainer'}>
            <div className={'AllCategoryScreenContainer'}>
                <Link className="form-update-link" to={`/PersonalUserPage/${userId.data._id}`}>
                    <img src={back} alt="back"/>
                    <p>Назад</p>
                </Link>
                <p className="form-prsnl-heading">Связаться с разработчиками</p>
                <div className={'MessageScreenContainer'}>
                    <form onSubmit={handleSubmit}>
                        <div className={'MessageScreenBlock'}>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder={'Заголовок'}
                                value={formData.title}
                                onChange={handleChange}
                                className="MessageScreenContainerInput"
                                required
                            />
                            <textarea
                                id="description"
                                name="description"
                                placeholder={'Текст сообщения'}
                                value={formData.description}
                                onChange={handleChange}
                                className="MessageScreenContainerTextarea"
                                rows="5"
                                required
                            />
                        </div>
                        <button type="submit" className="MessageScreenContainerBtn">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactDeveloper;
