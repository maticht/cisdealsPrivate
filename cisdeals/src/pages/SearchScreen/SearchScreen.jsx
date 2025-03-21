import React, {useEffect, useRef, useState} from 'react';
import searchBtn from "../../img/search.svg";
import './searchScreen.css';
import CategoriesJSON from '../../data/searchcategories.json';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
import {getAllUsers} from "../../httpRequests/cisdealsApi";
import back from "../../img/Arrow_left.svg";
let data = CategoriesJSON.categories;

const uniqueData = data.filter((category, index, self) =>
        index === self.findIndex((c) => (
            c.title === category.title
        ))
);

data = uniqueData;


const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(data);
    const [modalOpen, setModalOpen] = useState(false);
    const [res, setRes] = useState();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('category');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                console.log(response);
                let sortedUsers = response;

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
    const handleSearch = () => {
        const results = search(data, searchTerm);
        setResults(results);
        navigate(`/${searchTerm}`);
    };
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSearch();
        }
    };
    const handleSearchTermUserChange = e => {
        const searchTerm = e.target.value;
        const filteredUsers = users.filter(user => {
            const {firstName, lastName, nameOrCompany} = user;
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
        window.history.back();
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
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSearchTerm('');
    };
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);


    return (
        <div className={'searchContainer'} onClick={() => {
            setModalOpen(false);
        }}>
            <div className={'modalContent'} onClick={e => e.stopPropagation()}>
                <Link className="form-update-link" onClick={handleCloseModal}>
                    <img src={back} alt="back" />
                    <p>Назад</p>
                </Link>
                <div>
                    <div className={'searchFilterBlock'}>
                        <div className={'searchBlock pageSearchBlock'}>
                            <input type="text" value={searchTerm}
                                   onChange={activeTab === 'category' ? handleSearchTermChange : handleSearchTermUserChange}
                                   className={'searchFilterFld'} placeholder={'Введите запрос'} ref={inputRef}/>
                            <button className={'searchScreenBtn'} onClick={handleSearch} onKeyDown={handleKeyDown}>
                                <img src={searchBtn} className="App-logo" alt="logo"/>
                            </button>
                        </div>
                    </div>
                    <div className="tabContainer">
                        <p onClick={() => handleTabClick('category')}
                           className={`tab ${activeTab === 'category' ? 'active' : 'inactive'}`}>
                            Услуги
                        </p>
                        <p onClick={() => handleTabClick('user')}
                           className={`tab ${activeTab === 'user' ? 'active' : 'inactive'}`}>
                            Пользователи
                        </p>
                    </div>
                    {activeTab === 'category' ? (
                        <div className="resultSearchContainer">
                            {searchTerm && (
                                <div>
                                    {results.map((item, index) => (
                                        <div key={item.id} className="resultSearchItem"
                                             style={{borderBottom: results.length - 1 === index ? '0px solid #dddddd' : '1px solid #dddddd'}}
                                        >
                                            <Link
                                                className="OneCategoryItem"
                                                to={`/${item.title}`}
                                                onClick={() => setModalOpen(false)}
                                            >
                                                <h5>{item.title}</h5>
                                                <p>Из категории "{item.parent}"</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="userSearchContainer">
                            {searchTerm && (
                                <div className="userResultsContainer">
                                    {results.map((user, index) => (
                                        <div key={user._id} className="userSearchItem">
                                            <Link
                                                className="OneCategoryItem"
                                                to={`/UserPageScreen/${user._id}`}
                                                onClick={() => setModalOpen(false)}
                                            >
                                                <div className={"userContentContainer"}>
                                                    <div className="userImageContainer">
                                                        <img
                                                            className="userImage"
                                                            src={user.image.length === 0 || !user.image ? noneUserLogo : user.image[0]}
                                                            alt="userImage"
                                                        />
                                                    </div>
                                                    <div className="userInfoContainer">
                                                        <h5 className="userName">{user.nameOrCompany}</h5>
                                                        <p className="userActivity">
                                                            {user.areasActivity === 'areasActivity'
                                                                ? 'Услуги не добавлены'
                                                                : user.areasActivity.length > 62
                                                                    ? `${user.areasActivity.slice(0, 62)}...`
                                                                    : user.areasActivity}
                                                        </p>
                                                        <p className="userLocation">
                                                            {user.city === 'city'
                                                                ? 'Польша'
                                                                : user.region === 'region'
                                                                    ? `${user.city}`
                                                                    : `${user.city}, ${user?.region}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchScreen;
