import React, {useEffect, useState} from 'react';
import {createUseStyles} from "react-jss";
import searchBtn from "../../img/search.svg";
import './searchFilter.css';
import CategoriesJSON from '../../data/searchcategories.json';
import {Link} from "react-router-dom";
import axios from "axios";
import noneUserLogo from "../../img/noneUserLogoSq.svg";


const data = CategoriesJSON.categories


const useStyles = createUseStyles({
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        zIndex:55,
    },
    modalContent:{
        width:'100%',
        backgroundColor:"#F1F1F1",
        paddingTop:'8px'
    },
    allCategoriesBtn: {
        textDecoration: "none",
        color: "#454545",
        fontSize: "14px",
        margin:"10px",

    },
    OneCategoryItem: {
        textDecoration:"none"
    }
});



const SearchExample = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(data);
    const [modalOpen, setModalOpen] = useState(false);
    const [res, setRes] = useState();
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState('category');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://backend.delkind.pl/getAllUsers`);
                let sortedUsers = response.data;


                setUsers(sortedUsers);
                localStorage.getItem("token");
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const search = (data, searchTerm) => {
        return data.filter(item => {
            let found = false;
            const searchString = searchTerm.toLowerCase();
            const sort = (value, path) => {
                if (typeof value === 'object') {
                    Object.entries(value).forEach(([key, v]) => {
                        sort(v, `${path}.${key}`);

                    });
                } else if (typeof value === 'string' && value.toLowerCase().includes(searchString)) {
                    const paths = path.split('.');
                    let fullPath = '';

                    paths.forEach((p, i) => {
                        fullPath += `["${p}"],`;
                        setRes(value);
                    });
                    found = true;
                }
            };

            Object.entries(item).forEach(([key, value]) => sort(value, key));
            return found;
        });
    };

    const handleSearchTermChange = e => {
        setSearchTerm(e.target.value);
        setResults(search(data, e.target.value));
    };
    const handleSearchTermUserChange = e => {
        const searchTerm = e.target.value;
        const filteredUsers = users.filter(user => {
            const { firstName, lastName, nameOrCompany } = user;
            const lowerCaseSearchTerm = searchTerm.toLowerCase();

            return (
                firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
                lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
                nameOrCompany.toLowerCase().includes(lowerCaseSearchTerm)
            );
        });

        setSearchTerm(searchTerm);
        setResults(filteredUsers);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    function findPath(obj, target, path = []) {
        for (const key in obj) {
            if (obj[key] === target) {
                return path.concat(key);
            }
            if (typeof obj[key] === "object") {
                const result = findPath(obj[key], target, path.concat(key));
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }
    const path = findPath(data, searchTerm);



    return (
        <div style={{overflow:'hidden', pointerEvents: 'auto', margin: '0 10px'}} onClick={() => setModalOpen(true)}>
            <div className={'searchFheight: 48px;ilterBlock'}>
                <div className={'searchBlock'}>
                    <input className={'searchFld'} placeholder={'Введите запрос'}/>
                    <img className={'searchBtn'} src={searchBtn} alt="logo" />
                </div>
            </div>
            {modalOpen && (
                <div className={classes.container} onClick={() => {setModalOpen(false);}}>
                    <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                        <a className={classes.allCategoriesBtn} onClick={handleCloseModal}>˂ Главная</a>
                            <>
                                <div className={'searchFilterBlock'} style={{margin:'10px 0 0 0'}}>
                                    <div className={'searchBlock'}>
                                        <input  type="text" value={searchTerm}
                                                onChange={activeTab === 'category' ? handleSearchTermChange : handleSearchTermUserChange}
                                                className={'searchFld'} placeholder={'Введите запрос'} />
                                        <button className={'searchBtn'}><img src={searchBtn} className="App-logo" alt="logo" /></button>
                                    </div>
                                </div>
                                <div style={{display:'flex', textDecoration:'row', justifyContent:'flex-start', alignItems:'center', margin:"0 0 0 10px"}}>
                                    <p
                                        onClick={() => {
                                            setActiveTab('category');
                                            setSearchTerm('');
                                        }}
                                        style={{
                                            backgroundColor: activeTab === 'category' ? '#000' : '#fff',
                                            color: activeTab === 'category' ? '#fff' : '#000',
                                            padding:'8px 10px',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            fontSize: '12px',
                                            cursor:'pointer',
                                            margin:' 0 0 0 0'
                                        }}>
                                        Услуги
                                    </p>
                                    <p
                                        onClick={() => {
                                            setActiveTab('user');
                                            setSearchTerm('');
                                        }}
                                        style={{
                                            backgroundColor: activeTab === 'user' ? '#000' : '#fff',
                                            color: activeTab === 'user' ? '#fff' : '#000',
                                            padding:'8px 10px',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            fontSize: '12px',
                                            cursor:'pointer',
                                            margin:' 0 0 0 10px'
                                        }}>
                                        Пользователи
                                    </p>
                                </div>
                                {activeTab === 'category' ? (
                                    <div style={{overflow:'auto', maxHeight: '80vh'}}>
                                        {searchTerm && (
                                            <div>
                                                {results.map(item => (
                                                    <div key={item.id} style={{margin:"0 10px",padding: "10px 0",
                                                        borderBottom: "#DDDDDD solid 1px",
                                                        textDecoration: "none",
                                                        color: "#000000",}}>
                                                        <Link  className={classes.OneCategoryItem} to={`/AllCategories/:Categories2/:Categories3/:Categories3/:Categories4/${item.title}`}  onClick={() => setModalOpen(false)}>
                                                            <h5 style={{color:'#000',fontSize:"14px", margin:"3px 0"}}>{item.title}</h5>
                                                            <p  style={{color:'#5B5B5B',fontSize:"10px", margin:"3px 0"}}>Из категории "{item.parent}"</p>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{overflow:'auto', maxHeight: '77vh', marginTop:'5px'}}>
                                        {searchTerm && (
                                            <div style={{backgroundColor:'#fff', margin:'5px 10px 10px 10px', borderRadius:'8px'}}>
                                                {results.map((user, index) => (
                                                    <div
                                                        key={user._id}
                                                        style={{
                                                            margin: "0 10px",
                                                            padding: "9px 0",
                                                            borderBottom: index === results.length - 1 ? "none" : "#DDDDDD solid 1px",
                                                            textDecoration: "none",
                                                            color: "#000000",
                                                        }}
                                                    >
                                                        <Link  className={classes.OneCategoryItem} to={`/AllCategories/:Categories2/:Categories3/:Categories4/Все специалисты/${user._id}`}  onClick={() => setModalOpen(false)}>
                                                            <div style={{display:'flex', flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start'}}>
                                                                <div>
                                                                    {(user.image.length === 0 || !user.image ?
                                                                        <img style={{width:'40px', height:'40px',borderRadius:5}} src={noneUserLogo} alt={'userImage'}/> :
                                                                        <div style={{width:'40px', height:'40px', alignSelf:'center', justifyContent:'center', position:'relative', borderRadius:5, overflow: 'hidden'}}>
                                                                            {user.image && <img style={{width:'100%', height:'100%', objectFit:'cover', filter:'blur(0.5px)'}} src={user.image[0]} alt='User Image' />}
                                                                        </div>)
                                                                    }
                                                                </div>
                                                                <div style={{marginLeft:'8px', display:'flex',justifyContent:'space-between', flexDirection:'column'}}>
                                                                    <h5 style={{color:'#000',fontSize:"14px", margin:"0"}}>{`${user.firstName} ${user.lastName}`}</h5>
                                                                    {user.nameOrCompany !== 'nameOrCompany' && (
                                                                        <p  style={{color:'#000',fontSize:"10px", margin:"0 0 10px 0"}}>
                                                                            {user.nameOrCompany}
                                                                        </p>
                                                                    )}

                                                                </div>

                                                            </div>
                                                            <p  style={{color:'#5B5B5B',fontSize:"10px", margin:"4px 0 0 0"}}>
                                                                {user.areasActivity === 'areasActivity' ?
                                                                    'Услуги не добавлены' :
                                                                    user.areasActivity.length > 62 ?
                                                                    `${user.areasActivity.slice(0, 62)}...` :
                                                                    user.areasActivity
                                                                }
                                                            </p>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchExample;










