import React, {useEffect, useState} from 'react';
import searchBtn from "../../img/search.svg";
import './searchScreen.css';
import CategoriesJSON from '../../data/searchcategories.json';
import {Link} from "react-router-dom";
import axios from "axios";
import noneUserLogo from "../../img/noneUserLogoSq.svg";
const data = CategoriesJSON.categories

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(data);
    const [modalOpen, setModalOpen] = useState(false);
    const [res, setRes] = useState();
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


    return (
        <div className={'container'} onClick={() => {
            setModalOpen(false);
        }}>
            <div className={'modalContent'} onClick={e => e.stopPropagation()}>
                <a className={'allCategoriesBtn'} onClick={handleCloseModal}>˂ Главная</a>
                <>
                    <div className={'searchFilterBlock'}>
                        <div className={'searchBlock pageSearchBlock'}>
                            <input type="text" value={searchTerm}
                                   onChange={activeTab === 'category' ? handleSearchTermChange : handleSearchTermUserChange}
                                   className={'searchFld'} placeholder={'Введите запрос'}/>
                            <button className={'searchBtn'}>
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
                        <div className="resultContainer">
                            {searchTerm && (
                                <div>
                                    {results.map((item) => (
                                        <div key={item.id} className="resultItem">
                                            <Link
                                                className="OneCategoryItem"
                                                to={`/AllCategories/:Categories2/:Categories3/:Categories4/${item.title}`}
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
                        <div className="userContainer">
                            {searchTerm && (
                                <div className="userResultsContainer">
                                    {results.map((user, index) => (
                                        <div key={user._id} className="userItem">
                                            <Link
                                                className="OneCategoryItem"
                                                to={`/AllCategories/:Categories2/:Categories3/:Categories4/Все специалисты/${user._id}`}
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
                                                        <p className="userLocation">
                                                            {user.city === 'city'
                                                                ? 'Польша'
                                                                : user.region === 'region'
                                                                    ? `${user.city}`
                                                                    : `${user.city}, ${user?.region}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="userActivity">
                                                    {user.areasActivity === 'areasActivity'
                                                        ? 'Услуги не добавлены'
                                                        : user.areasActivity.length > 62
                                                            ? `${user.areasActivity.slice(0, 62)}...`
                                                            : user.areasActivity}
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
    );
};

export default SearchScreen;
