import React, {useEffect, useState} from "react";
import HeaderNavBar from '../../components/headerNavBar/headerNavBar';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Categories from '../../components/categories/categories';
import { createUseStyles } from "react-jss";
import {Link, Route, useParams} from "react-router-dom";
import Modal from "../../components/madalCities/modalCities";
import SearchExample from "../../components/search/search";
import axios from "axios";
import noneUserLogo from '../../img/noneUserLogoSq.svg'
import city from '../../img/Map maker.svg'
import meditating from '../../img/meditating 1.svg'
import goldStar from '../../img/goldStar.svg'



const useStyles = createUseStyles({
    container: {
        minHeight: "100vh",
        backgroundColor: "#F1F1F1"
    },
    infoBlock: {
        margin: "0 2vw"
    },
    navMainPageBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
    }
});

function SortedServicesScreen() {
    const classes = useStyles();
    const {Categories2} = useParams();
    const {Categories3} = useParams();
    const {Categories4} = useParams();
    const {SortedCategories} = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalResult, setModalResult] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://backend.delkind.pl/getAllUsers`);
                let sortedUsers = response.data;

                if (modalResult && modalResult !== "Польше") {
                    sortedUsers = sortedUsers.filter((user) => user.city === modalResult);
                }

                if (SortedCategories && SortedCategories !== "Все специалисты") {
                    sortedUsers = sortedUsers.filter(
                        (user) => user.services.includes(SortedCategories)
                    );
                }

                setUsers(sortedUsers);
                localStorage.getItem("token");
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [SortedCategories, modalResult]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleModalResult = (result) => {
        setModalResult(result);
    };

    return (
        <>
            <div className={classes.container}>
                <HeaderNavBar />
                <SearchExample />
                <div className={'selectFilterBlock'}>
                    <Link className={'locationSelect'} onClick={handleOpenModal}>
                        <div>Изменить локацию</div>
                    </Link>
                    <Link className={'locationSelect'} to={`/AllCategories`}>
                        <div>Изменить категорию</div>
                    </Link>
                </div>
                <div>
                    <Modal isOpen={modalOpen} onClose={handleCloseModal} handleModalResult={handleModalResult} />
                </div>
                <div className={classes.infoBlock}>
                    <h2>{`${(!SortedCategories) ? 'Все специалисты' : SortedCategories} в ${(!modalResult) ? 'Польше' : modalResult}`}</h2>

                </div>
                {isLoading ? null : (
                        <>
                            {users.length !== 0 ? (
                                <div style={{display:"flex",flexDirection:"column", justifyContent:"center", margin:'0 10px'}}>
                                    <h6 style={{margin:'0 0 20px 0'}}>{`Найденно ${users.length} специалистов`}</h6>
                                    {users.map((user) => (
                                        <div style={{width:"100%", height:"100px", backgroundColor:"#fff", marginBottom:10, display:"flex", alignSelf:"center", justifyContent:"flex-start", alignItems:'center', borderRadius:8}} key={user.id}>
                                            <Link style={{textDecoration: "none", color:"#000", flexDirection:'row'}} to={`/AllCategories/${Categories2}/${Categories3}/${Categories4}/${SortedCategories}/${user._id}`}>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
                                                        {(!user.image || user.image.length === 0 ?
                                                            <img style={{ width: '100px', height: '100px', borderRadius: 8 }} src={noneUserLogo} alt={'userImage'} /> :
                                                            <div style={{ width: '100px', height: '100px', alignSelf: 'center', justifyContent: 'center', position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                                                                {user.image && <img style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(0.4px)', position: 'absolute', top: 0, left: 0 }} src={user.image[0]} alt='User Image' />}
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
                            ) : (
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                                    <img src={meditating} alt={'Здесь ещё нет специалистов'}/>
                                    <h3 style={{}}>Здесь ещё нет специалистов</h3>
                                </div>
                            )}
                        </>
                    )}
            </div>
        </>
    );
}

export default React.memo(SortedServicesScreen);
