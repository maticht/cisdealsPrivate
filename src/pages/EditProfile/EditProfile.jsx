import React, {useEffect, useState} from 'react';
import { createUseStyles } from "react-jss";
import ModalUserPage from "../../components/modalUserPage/modalUserPage";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import edit from "../../img/Edit.svg";
import arrowRight from "../../img/arrowright.svg";

const useStyles = createUseStyles({
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
    allCategoriesBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
    },
    AllCategoryContainer: {
        margin: "0 2vw",
        padding: "15px 0 40px 0",
    },
    OneCategoryInfo: {
        display: "flex",
        flexDirection: "row",
    },
    OneCategoryImg: {
        width: "60px",
        marginRight: "10px",
    },
    OneFavoriteInfo: {
        width:"95vw",
        height:"50px",
        backgroundColor:"#fff",
        marginBottom:10,
        display:"flex",
        paddingLeft:'15px',
        justifyContent:"center",
        alignItems:'center',
        borderRadius:8
    }
});

const EditProfile = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    const {SortedCategories} = useParams();
    const user = localStorage.getItem("token");
    let localUserObj = JSON.parse(user);
    let UserId = localUserObj.data ? localUserObj.data._id : null;

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://backend.delkind.pl/getAllUsers');
            setUsers(response.data);
            localStorage.getItem("token");
        };

        fetchUsers();
    }, []);


    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <div style={{marginTop:'-15px', padding:'10px', minHeight: "100vh",
            backgroundColor: "#F1F1F1"}}>
            <a style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} onClick={handleOpenModal}>
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                    {`< Назад`}
                </p>
            </a>
            <div>
                <ModalUserPage isOpen={modalOpen} onClose={handleCloseModal} />
            </div>
            <h1>Редактировать профиль</h1>
            <Link to={`/update/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Личная информация</p>
                </div>
                <img src={arrowRight}/>
            </Link>
            {/*<Link to={`/updateService/${UserId}`} style={{*/}
            {/*    textDecoration:"none",*/}
            {/*    display:'flex',*/}
            {/*    flexDirection:'row',*/}
            {/*    alignItems:'center',*/}
            {/*    justifyContent:'space-between',*/}
            {/*    borderBottom: '1px solid #ddd',*/}
            {/*    paddingBottom: '15px',*/}
            {/*    marginBottom:'15px'*/}
            {/*}}>*/}
            {/*    <div style={{textDecoration:"none", display:'flex', flexDirection:'row', alignItems:'center'}}>*/}
            {/*        <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>О себе</p>*/}
            {/*    </div>*/}
            {/*    <img src={arrowRight}/>*/}
            {/*</Link>*/}
            <Link to={`/updateContactInfo/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Контактная информация</p>
                </div>
                <img src={arrowRight}/>
            </Link>
            <Link to={`/UpdateSocial/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Социальные сети</p>
                </div>
                <img src={arrowRight}/>
            </Link>
            <Link to={`/UpdateWorkingHours/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Время работы</p>
                </div>
                <img src={arrowRight}/>
            </Link>
            <Link to={`/UpdateLocation/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Локация</p>
                </div>
                <img src={arrowRight}/>
            </Link>
            <Link to={`/UpdateDescription/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Описание</p>
                </div>
                <img src={arrowRight}/>
            </Link>
            <Link to={`/updateImage/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Изображения</p>
                </div>
                <img src={arrowRight}/>
            </Link>
            <Link to={`/addServ/${UserId}`} style={{
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
                    <p style={{textDecoration:"none",color:"#000", marginBottom:'5px', marginTop:0}}>Услуги</p>
                </div>
                <img src={arrowRight}/>
            </Link>

        </div>
    );
}

export default EditProfile;
