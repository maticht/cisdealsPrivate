import './headerNavBar.css';
import logo from '../../img/mainPageLogo.svg';
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import noneAccBtn from '../../img/Frame.svg';
import SearchExample from "../search/search";
import {userProfile} from "../../httpRequests/cisdealsApi";

function HeaderNavBar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const user1 = localStorage.getItem("token");

    let localUserObj = null;
    let userid = null;
    if (user1) {
        try {
            localUserObj = JSON.parse(user1);
            console.log(localUserObj);
            userid = localUserObj?.data?._id;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!localUserObj?.data?._id) {
            return;
        }
        const fetchUserProfile = async (userId) => {
            try {
                const response = await userProfile(userId);
                console.log(response)
                setUser(response.profile);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile(userid);
    }, []);

    return (
        <div className={'navBarBlock'}>
            <Link to={"/"}>
                <img src={logo} className={"App-logo"} alt={"logo"}/>
            </Link>
            <div className={'SearchExampleNavBar'}>
                <SearchExample/>
            </div>
            {!modalOpen && (
                <div className={'accountBtnBlock'}>
                    {user ? (
                        <div>
                            <Link to={`/PersonalUserPage/${userid}`} className={"logOutBlock"}>
                                <p className={"accountText"}>
                                    {`${user.nameOrCompany}`}
                                </p>
                                {user.image.length === 0 || !user.image[0] ?
                                    <img src={noneAccBtn} className={"noneAccBtn"} alt={"noneAccBtn"}/> :
                                    <img src={user.image[0]} className={"userLogo"} alt={"userLogo"}/>}
                            </Link>

                        </div>
                    ) : (
                        <Link className={"logInBlock"} to={"/login"}>
                            <p className={"accountText"}>Войти</p>
                            <button className={"accountBtn"}></button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default HeaderNavBar;
