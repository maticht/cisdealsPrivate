import React, {useEffect, useState} from 'react';
import PersonalUserPage from "../PersonalUserPage/PersonalUserPage";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import city from "../../img/Map maker.svg";

const FavoritesPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const userLS = localStorage.getItem("token");
    const favoriteUsers = JSON.parse(userLS);
    useEffect(() => {
        const fetchUsers = async () => {
            const queryParams = { ids: favoriteUsers.data.savedUsers.join(',') };
            const response = await axios.get('http://backend.delkind.pl/getFavoritesUsers', { params: queryParams });
            setUsers(response.data);
            console.log(favoriteUsers.data.savedUsers.join(','))
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
            <Link style={{textDecoration: "none", color: "#454545", fontSize: "14px"}} to="/">
                <p style={{textDecoration: "none", color: "#454545", fontSize: "14px"}}>
                    {`< Назад`}
                </p>
            </Link>
            <h1 style={{margin:'15px 0 0 0'}}>Избранные</h1>
            <h6 style={{margin:'20px 0 15px 0'}}>{`В избранных ${users.length} специалистов`}</h6>
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                {users.map((user) => (
                    <div style={{width:"100%", height:"100px", backgroundColor:"#fff", marginBottom:10, display:"flex", alignSelf:"center", justifyContent:"flex-start", alignItems:'center', borderRadius:8}} key={user.id}>
                        <Link style={{textDecoration: "none", color:"#000", flexDirection:'row'}} to={`/AllCategories/Categories2/Categories3/Все специалисты/${user._id}`}>
                            <div style={{display:'flex', flexDirection:'row'}}>
                                {(!user.image || user.image.length === 0 ?
                                    <img style={{width:'100px', height:'100px',borderRadius:8}} src={noneUserLogo} alt={'userImage'}/> :
                                    <div style={{width:'100px', height:'100px', alignSelf:'center', justifyContent:'center', position:'relative', borderRadius:8, overflow: 'hidden'}}>
                                        {user.image && <img style={{width:'100%', height:'100%', objectFit:'cover', filter:'blur(0.4px)', position:'absolute', top:0, left:0}} src={user.image[0]} alt='User Image' />}
                                    </div>)
                                }
                                <div style={{marginLeft:'10px',display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                                    <div>
                                        <p style={{fontWeight:'500', margin:'5px 0 0 0'}}>
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p style={{ color: '#666', fontSize: '13px', margin: '5px 0' }}>
                                            {user.areasActivity === 'areasActivity' ?
                                                'Услуги не добавлены' :
                                                user.areasActivity.length > 28 ? `${user.areasActivity.slice(0, 28)}...` : user.areasActivity
                                            }
                                        </p>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center', marginBottom:'8px'}}>
                                        <img src={city}/>
                                        <p style={{fontWeight:'400', margin:'0px 5px', fontSize:'13px'}}>
                                            {user.city === "city" ? 'Польша' : user.region === "region" ? `${user.city}` : `${user.city}, ${user?.region}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;
