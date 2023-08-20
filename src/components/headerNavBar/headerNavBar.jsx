import './headerNavBar.css';
import logo from '../../img/mainPageLogo.svg';
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ModalUserPage from "../../components/modalUserPage/modalUserPage";
import noneAccBtn from '../../img/Frame.svg';
import SearchExample from "../search/search";

function HeaderNavBar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState(false);
    const user1 = localStorage.getItem("token");
    let localUserObj = null;
    let userid = null;
    if (user1) {
        try {
            localUserObj = JSON.parse(user1);
            userid = localUserObj?.data?._id;
        } catch (error) {
            console.error(error);
        }
    }
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (!localUserObj?.data || !localUserObj?.data._id) {
            return;
        }
        const fetchUserProfile = async (userId) => {
            try {
                const response = await fetch(`http://backend.delkind.pl/user-profile/${userid}`);
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
        fetchUserProfile(userid);
    }, [localUserObj]);

    return (<div className={'navBarBlock'}>
        <Link to={"/"}>
            <img src={logo} className={"App-logo"} alt={"logo"}/>
        </Link>
        <div className={'SearchExampleNavBar'}>
            <SearchExample/>
        </div>
        {!modalOpen && (
            <div>
                {user ? (
                    <div>
                        <a onClick={handleOpenModal} className={"logOutBlock"}>
                            <p className={"accountText"}>
                                {`${user.nameOrCompany}`}
                            </p>
                            {user.image.length === 0 || !user.image[0] ?
                                <img src={noneAccBtn} className={"noneAccBtn"} alt={"noneAccBtn"}/> :
                                <img src={user.image[0]} className={"userLogo"} alt={"userLogo"}/>}
                        </a>

                    </div>
                ) : (
                    <Link className={"logInBlock"} to={"/login"}>
                        <p className={"accountText"}>Войти</p>
                        <button className={"accountBtn"}></button>
                    </Link>
                )}
            </div>
        )}
        <div style={{display: modalOpen ? 'block' : 'none'}}>
            <ModalUserPage isOpen={modalOpen} onClose={handleCloseModal}/>
        </div>
    </div>);
}

export default HeaderNavBar;
