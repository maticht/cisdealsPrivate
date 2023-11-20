import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";

import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/LogIn/LogIn";
import SuccessfulLoginScreen from "./pages/SuccessfulLoginScreen/SuccessfulLoginScreen";

import AllCategoriesScreen from "./pages/AllCategoriesScreen/AllCategorisScreen";
import CategoriesScreen2 from "./pages/CategoriesScreen2/CategoriesScreen2";
import CategoriesScreen3 from "./pages/CategoriesScreen3/CategoriesScreen3";
import CategoriesScreen4 from "./pages/CategoriesScreen4/CategoriesScreen4";
import SortedServicesScreen from "./pages/SortedServicesScreen/SortedServicesScreen";
import SearchScreen from "./pages/SearchScreen/SearchScreen";

import UserPageScreen from "./pages/UserPageScreen/UserPageScreen";
import ContactDeveloper from "./pages/ContactDeveloper/ContactDeveloper";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import EditProfile from "./pages/EditProfile/EditProfile";
import PersonalUserPage from "./pages/PersonalUserPage/PersonalUserPage";

import UpdatePersonal from "./pages/UpdatePersonal/UpdatePersonal";
import UpdateLocation from "./pages/UpdateLocation/UpdateLocation";
import UpdateImage from "./components/UpdateImage/UpdateImage";
import UpdateContactInfo from "./pages/UpdateContactInfo/UpdateContactInfo";
import UpdateSocial from "./pages/UpdateSocial/UpdateSocial";
import UpdateService from "./components/UpdateService/UpdateService";
import UserServScreen from './components/addServ/UserServScreen/UserServScreen';
import UserServLoginScreen from './pages/UserServLoginScreen/UserServLoginScreen';
import UpdateWorkingHours from "./pages/UpdateWorkingHours/UpdateWorkingHours";
import UpdateDescription from "./pages/UpdateDescription/UpdateDescription";
import AddServ from './components/addServ/addServ'
import AddServCategories from './components/addServ/addServCategories/addServCategories'
import AddingServicesList from './components/addServ/addingServicesList/addingServicesList'

import AddContactInfo from "./pages/AddContactInfo/AddContactInfo";
import AddServicesScreen from "./pages/AddServicesScreen/AddServicesScreen";
import AddImage from "./pages/AddPhoto/AddImage";
import AddSocialInfo from "./pages/AddSocialInfo/AddSocialInfo";
import AddLocation from "./pages/AddLocation/AddLocation";
import AddDescription from "./pages/AddDescription/AddDescription";
import AddWorkingHours from "./pages/AddWorkingHours/AddWorkingHours";

import AddLoginServ from "./pages/AddLoginServ/AddLoginServ";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/login" exact element={<Login />} />
                    {/*<Route path="/SuccessfulLoginScreen/:id/verify/:token" exact element={<SuccessfulLoginScreen />} />*/}
                    <Route path="/SuccessfulLoginScreen" exact element={<SuccessfulLoginScreen />} />
                    <Route path='/' element={<HomeScreen />}/>

                    <Route path="/PersonalUserPage/:UserPage" exact element={<PersonalUserPage />} />
                    <Route path="/ContactDeveloper" exact element={<ContactDeveloper />} />
                    <Route path="/FavoritesPage" exact element={<FavoritesPage />} />
                    <Route path="/EditProfile" exact element={<EditProfile />} />
                    <Route path="/SearchScreen" exact element={<SearchScreen />} />
                    <Route path='/AllCategories' element={<AllCategoriesScreen />}/>
                    <Route path='/AllCategories/:Categories2' element={<CategoriesScreen2 />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3' element={<CategoriesScreen3 />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3/:Categories4' element={<CategoriesScreen4 />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3/:Categories4/:SortedCategories' element={<SortedServicesScreen />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3/:Categories4/:SortedCategories/:UserPage' element={<UserPageScreen />}/>
                    <Route path='/UserPageScreen/:UserPage' element={<UserPageScreen />}/>

                    <Route path="/updatePersonal/:UserPage" exact element={<UpdatePersonal />} />
                    <Route path="/updateContactInfo/:UserPage" exact element={<UpdateContactInfo />} />
                    <Route path="/UpdateSocial/:UserPage" exact element={<UpdateSocial />} />
                    <Route path="/updateService/:UserPage" exact element={<UpdateService />} />
                    <Route path="/updateImage/:UserPage" exact element={<UpdateImage />} />
                    <Route path="/UpdateLocation/:UserPage" exact element={<UpdateLocation/>} />
                    <Route path="/UpdateDescription/:UserPage" exact element={<UpdateDescription/>} />
                    <Route path="/UpdateWorkingHours/:UserPage" exact element={<UpdateWorkingHours/>} />
                    <Route path="/addServ/:UserPage" exact element={<AddServ/>} />
                    <Route path="/addServ/addServCategories/:UserPage" exact element={<AddServCategories/>} />
                    <Route path="/addServ/addingServicesList/:UserPage" exact element={<AddingServicesList/>} />
                    <Route path="/addServ/:UserPage/UserServScreen/:ServPage" exact element={<UserServScreen/>} />

                    <Route path="/AddLoginServ/:UserPage" exact element={<AddLoginServ/>} />
                    <Route path="/AddLoginServ/:UserPage/UserServLoginScreen/:ServPage" exact element={<UserServLoginScreen/>} />
                    <Route path="/AddContactInfo/:UserPage" exact element={<AddContactInfo />} />
                    <Route path="/AddSocialInfo/:UserPage" exact element={<AddSocialInfo />} />
                    <Route path="/AddLocation/:UserPage" exact element={<AddLocation/>} />
                    <Route path="/AddServicesScreen/:UserPage" exact element={<AddServicesScreen />} />
                    <Route path="/AddDescription/:UserPage" exact element={<AddDescription />} />
                    <Route path="/AddWorkingHours/:UserPage" exact element={<AddWorkingHours />} />
                    <Route path="/AddImage/:UserPage" exact element={<AddImage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
