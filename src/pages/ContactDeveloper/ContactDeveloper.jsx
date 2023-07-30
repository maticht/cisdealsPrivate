import React, { useState } from "react";
import ModalUserPage from "../../components/modalUserPage/modalUserPage";
import {Link} from "react-router-dom";
import ScvNoneUserLogo from '../../img/ScvNoneUserLogo.svg';
import telegram from '../../img/telegram.svg';


const ContactDeveloper = () => {
    const daniilTelegramLink = 'https://t.me/daniil_elkind';
    const matveiTelegramLink = 'https://t.me/Maticht';

    const handleTelegramClick = (telegramLink) => {
        window.open(telegramLink, '_blank');
    }

    const handlePhoneClick = (phoneNum) => {
        window.location.href = `tel:${phoneNum}`;
    }
    const [modalOpen, setModalOpen] = useState(false);


    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={{marginTop:'-15px', padding:'10px', minHeight: "100vh", backgroundColor: "#F1F1F1"}}>
            <a style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} onClick={handleOpenModal}>
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                    {`< Назад`}
                </p>
            </a>
            <div>
                <ModalUserPage isOpen={modalOpen} onClose={handleCloseModal} />
            </div>
            <h1>Связаться с разработчиками</h1>

            <div style={{
                width:"92vw",
                height:"50px",
                backgroundColor:"#fff",
                marginBottom:10,
                display:"flex",
                alignSelf:"center",
                justifyContent:"space-between",
                alignItems:'center',
                borderRadius:8,
                paddingRight:'10px'
            }}>
                <img src={ScvNoneUserLogo} alt={'noneUserLogo'} style={{ height: '100%',borderTopLeftRadius:8, borderBottomLeftRadius:8, marginLeft: 0 }} />
                <h4>Daniil Elkind</h4>
                <div style={{display:'flex', flexDirection:'row', marginRight:'0px', alignItems:'center'}}>
                    <div style={{marginLeft:'10px'}} onClick={() => handleTelegramClick(daniilTelegramLink)}>
                        <img src={telegram} alt={'telegram'}/>
                    </div>
                </div>
            </div>
            <div style={{
                width:"92vw",
                height:"50px",
                backgroundColor:"#fff",
                marginBottom:10,
                display:"flex",
                alignSelf:"center",
                justifyContent:"space-between",
                alignItems:'center',
                borderRadius:8,
                paddingRight:'10px'
            }}>
                <img src={ScvNoneUserLogo} alt={'noneUserLogo'} style={{ height: '100%',borderTopLeftRadius:8, borderBottomLeftRadius:8, marginLeft: 0 }} />
                <h4>Matvey Treyvas</h4>
                <div style={{display:'flex', flexDirection:'row', marginRight:'0px', alignItems:'center'}}>
                    <div style={{marginLeft:'10px'}} onClick={() => handleTelegramClick(matveiTelegramLink)}>
                        <img src={telegram} alt={'telegram'}/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ContactDeveloper;
