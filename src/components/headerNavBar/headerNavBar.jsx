import './headerNavBar.css';
import logo from '../../img/mainPageLogo.svg';
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ModalUserPage from "../../components/modalUserPage/modalUserPage";
import noneAccBtn from '../../img/Frame.svg';

function HeaderNavBar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState(false);
    const {data: localUserObj} = JSON.parse(localStorage.getItem("token")) || {};
    const userId = localUserObj?.data?._id;

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const fetchUserProfile = async (userId) => {
        try {
            const response = await fetch(`http://backend.delkind.pl/user-profile/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setUser(data.profile);
            } else {
                throw new Error('Failed to fetch user profile');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (localUserObj?.data) {
            fetchUserProfile(localUserObj.data._id);
        }
    }, [localUserObj]);


    return (
        <div className={'navBarBlock'}>
            <Link to={"/"}>
                <img src={logo} className={"App-logo"} alt={"logo"}/>
            </Link>
            <div>
                <ModalUserPage isOpen={modalOpen} onClose={handleCloseModal}/>
            </div>
            {!modalOpen ? (
                <div>
                    {user ? (
                        <div>
                            <a onClick={handleOpenModal} className={"logOutBlock"}>
                                <p className={"accountText"}>
                                    {`${user.nameOrCompany}`}
                                </p>
                                {user.image.length === 0 || !user.image[0] ?
                                    <img src={noneAccBtn} className={"noneAccBtn"} alt={"noneAccBtn"}/> :
                                    <img src={user.image[0]} className={"userLogo"} alt={"userLogo"}/>
                                }
                            </a>
                        </div>
                    ) : (
                        <Link className={"logInBlock"} to={"/login"}>
                            <p className={"accountText"}>Войти</p>
                            <button className={"accountBtn"}></button>
                        </Link>
                    )}
                </div>
            ) : null}
        </div>
    );

}

export default HeaderNavBar;
