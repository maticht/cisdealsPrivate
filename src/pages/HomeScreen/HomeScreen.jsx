import React, {useEffect, useState} from "react";
import HeaderNavBar from '../../components/headerNavBar/headerNavBar';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Categories from '../../components/categories/categories';
import { createUseStyles } from "react-jss";
import {Link} from "react-router-dom";
import SearchExample from "../../components/search/search";
import axios from "axios";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import goldStar from "../../img/goldStar.svg";
import city from "../../img/Map maker.svg";
import './HomeScreen.css';

const useStyles = createUseStyles({
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
});
function HomeScreen() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://backend.delkind.pl/getAllUsers`);
                // const filteredUsers = response.data.filter(user => user.rating && user.rating.length > 0 && user.rating[0] !== '');
                // const sortedUsers = filteredUsers.sort((a, b) => {
                //     const averageRatingA = a.rating.reduce((acc, rating) => acc + rating.value, 0) / a.rating.length;
                //     const averageRatingB = b.rating.reduce((acc, rating) => acc + rating.value, 0) / b.rating.length;
                //     return averageRatingB - averageRatingA;
                // });
                setUsers(response.data);
                localStorage.getItem("token");
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <div className={classes.container}>
                <HeaderNavBar />
                <SearchExample />
                <Categories />

                <div className={'bestSpecialists'}>
                    <h2 style={{margin:'10px 0 10px 0'}}>{`Лучшие специалисты`}</h2>
                    {users.map((user) => (
                        <div className={'oneBestSpecialistsBlock'} key={user.id}>
                            <Link style={{textDecoration: "none", color:"#000", flexDirection:'row'}} to={`/AllCategories/Categories2/Categories3/Все специалисты/${user._id}`}>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
                                        {(!user.image || user.image.length === 0 ?
                                            <img style={{ width: '100px', height: '100px', borderRadius: 8 }} src={noneUserLogo} alt={'userImage'} /> :
                                            <div style={{ width: '100px', height: '100px', alignSelf: 'center', justifyContent: 'center', position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                                {user.image && <img style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(0.3px)', position: 'absolute', top: 0, left: 0 }} src={user.image[0]} alt='User Image' />}
                                            </div>)
                                        }
                                        {user.rating && user.rating.length > 0 && user.rating[0] !== '' && (
                                            <div style={{ position: 'absolute', top: 5, right: 5, width: '30px', backgroundColor: '#ffffff', padding: '0px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '4px' }}>
                                                <img style={{ width: '12px' }} src={goldStar} alt="star" />
                                                <p style={{ margin: '0 0 2px 0', fontSize: '13px' }}>
                                                    {(user.rating.reduce((acc, rating) => acc + rating.value, 0) / user.rating.length).toFixed(1)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{marginLeft:'10px',display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                                        <div>
                                            <p style={{fontWeight:'500', margin:'5px 0 0 0'}}>
                                                {user.nameOrCompany}
                                            </p>
                                            <p style={{ color: '#666', fontSize: '13px', margin: '5px 0' }}>
                                                {user.areasActivity === 'areasActivity' ?
                                                    'Услуги не добавлены' :
                                                    user.areasActivity.length > 28 ?
                                                        `${user.areasActivity.slice(0, 28)}...` :
                                                        user.areasActivity
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
        </>
    );
}

export default HomeScreen;
