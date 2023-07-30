import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import exit from "../../img/exit.svg";
import share from "../../img/share.svg";
import arrowRight from "../../img/arrowright.svg";
import edit from "../../img/Edit.svg";
import support from "../../img/support.svg";
import save from "../../img/save.svg";
import {Link} from "react-router-dom";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import userPage from "../../img/userPage.svg"

const useStyles = createUseStyles({
    container: {
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:100
    },
    infoBlock: {
        width:"100%",
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        background: 'white',
        padding: "0 20px 20px 20px",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    navMainPageBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
    },
    OneCategoryInfo: {
        display: "flex",
        flexDirection: "row",
    },
    OneCategoryImg: {
        width: "18px",
        marginRight: "10px",
    },
    OneCategoryItem: {
        margin:"10px 0",
        height:"20px",
        paddingBottom:"5px",
        borderBottom: "#DDDDDD solid 1px",
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    }
});

const Modal = ({ isOpen, onClose }) => {
    const classes = useStyles();
    const [user, setUser] = useState(false);
    const user1 = localStorage.getItem("token");
    let localUserObj = null;
    let firstName = null;
    let lastName = null;
    let UserId = null;

    if (user1) {
        try {
            localUserObj = JSON.parse(user1);
            firstName = localUserObj?.data?.firstName || null;
            lastName = localUserObj?.data?.lastName || null;
            UserId = localUserObj?.data?._id || null;
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }

    useEffect(() => {
        const fetchUserProfile = async (userId) => {
            try {
                const response = await fetch(`http://backend.delkind.pl/user-profile/${UserId}`);
                const data = await response.json();
                setUser(data.profile);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile(UserId);
    }, []);

    if (!isOpen) return null;


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.history.pushState(null, null, "/");
        window.location.reload();
    };

    return (
        <div onClick={onClose}  className={classes.container}>
            <div onClick={(e) => e.stopPropagation()} className={classes.infoBlock}>
                <div style={{padding:'0 10px', paddingTop:20}}>
                    <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} onClick={onClose}  to="/">˂ Главная</Link>
                    <div style={{display:"flex", flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:15}}>
                        <div style={{display:"flex", flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                            {(user.image === 0 || !user.image[0] ?
                                <img style={{width:'80px', height:'80px',borderRadius:50}} src={noneUserLogo} alt={'userImage'}/> :
                                <img style={{width:'80px', height:'80px', borderRadius:50, objectFit:'cover', filter: 'blur(0.4px)'}} src={user.image[0]} alt={'userImage'}/>)}
                            <div style={{display:"flex",flexDirection:"column", justifyContent:'flex-start', marginLeft:'20px'}}>
                                <p style={{margin:0, color:'#666'}}>Здравствуйте, </p>
                                <p style={{margin:0, fontWeight:'700'}}>{`${user.nameOrCompany}`}</p>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <img src={share}/>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <Link to={`/EditProfile`} style={{
                            textDecoration:"none",
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            borderBottom: '1px solid #ddd',
                            paddingBottom: '15px',
                            marginBottom:'15px'
                        }}>
                            <div style={{textDecoration:"none", display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <img style={{}} src={edit}/>
                                <p style={{textDecoration:"none",color:"#000", marginLeft:'10px', marginBottom:'5px', marginTop:0}}>Редактировать профиль</p>
                            </div>
                            <img src={arrowRight}/>
                        </Link>
                        <Link to={`/UserPageScreen/${UserId}`} style={{
                            textDecoration:"none",
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            borderBottom: '1px solid #ddd',
                            paddingBottom: '15px',
                            marginBottom:'15px'
                        }}>
                            <div style={{textDecoration:"none", display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <img style={{}} src={userPage}/>
                                <p style={{textDecoration:"none",color:"#000", marginLeft:'10px', marginBottom:'5px', marginTop:0}}>Перейти на свою страницу</p>
                            </div>
                            <img src={arrowRight}/>
                        </Link>
                        <Link to="/FavoritesPage" style={{
                            textDecoration:"none",
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            borderBottom: '1px solid #ddd',
                            paddingBottom: '15px',
                            marginBottom:'15px'
                        }}>
                            <div style={{textDecoration:"none", display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <img style={{}} src={save}/>
                                <p style={{textDecoration:"none",color:"#000", marginLeft:'10px', marginBottom:'5px', marginTop:0}}>Избранные</p>
                            </div>
                            <img src={arrowRight}/>
                        </Link>
                        <Link to={`/ContactDeveloper`} style={{
                            textDecoration:"none",
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            borderBottom: '1px solid #ddd',
                            paddingBottom: '15px',
                            marginBottom:'15px'
                        }}>
                            <div style={{textDecoration:"none", display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <img style={{}} src={support}/>
                                <p style={{textDecoration:"none",color:"#000", marginLeft:'10px', marginBottom:'5px', marginTop:0}}>Поддержка</p>
                            </div>
                            <img src={arrowRight}/>
                        </Link>
                    </div>

                </div>


                <Link to={'/'} onClick={handleLogout} style={{display:"flex",textDecoration: 'none', flexDirection:"row",alignItems:"center", justifyContent:'flex-start', marginLeft:'10px'}} >
                    <img src={exit} alt={'logo'}/>
                    <p style={{color:"#D80000", marginLeft:'7px'}}>Выйти</p>
                </Link>
            </div>
        </div>
    );
};

export default Modal;


