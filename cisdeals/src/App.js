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
import UpdateImage from "./pages/UpdateImage/UpdateImage";
import UpdateContactInfo from "./pages/UpdateContactInfo/UpdateContactInfo";
import UpdateSocial from "./pages/UpdateSocial/UpdateSocial";
import UserServScreen from './pages/addServ/UserServScreen/UserServScreen';
import UpdateWorkingHours from "./pages/UpdateWorkingHours/UpdateWorkingHours";
import UpdateDescription from "./pages/UpdateDescription/UpdateDescription";
import AddServ from './pages/addServ/addServ'
import AddServCategories from './pages/addServ/addServCategories/addServCategories'
import AddingServicesList from './pages/addServ/addingServicesList/addingServicesList'
import EditingCategories from './pages/EditingCategories/EditingCategories'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/login" exact element={<Login />} />
                    {/*<Route path="/SuccessfulLoginScreen/:id/verify/:token" exact element={<SuccessfulLoginScreen />} />*/}
                    <Route path="/SuccessfulLoginScreen/:UserPage" exact element={<SuccessfulLoginScreen />} />
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
                    {/*<Route path='/AllCategories/:Categories2/:Categories3/:Categories4/:SortedCategories' element={<SortedServicesScreen />}/>*/}
                    <Route path='/AllSpecialists' element={<SortedServicesScreen />}/>
                    <Route path='/:SortedCategories' element={<SortedServicesScreen />}/>
                    <Route path='/UserPageScreen/:UserPage' element={<UserPageScreen />}/>

                    <Route path="/updatePersonal/:UserPage" exact element={<UpdatePersonal />} />
                    <Route path="/updateContactInfo/:UserPage" exact element={<UpdateContactInfo />} />
                    <Route path="/UpdateSocial/:UserPage" exact element={<UpdateSocial />} />
                    <Route path="/UpdateWorkingHours/:UserPage" exact element={<UpdateWorkingHours/>} />
                    <Route path="/UpdateLocation/:UserPage" exact element={<UpdateLocation/>} />
                    <Route path="/UpdateDescription/:UserPage" exact element={<UpdateDescription/>} />
                    <Route path="/updateImage/:UserPage" exact element={<UpdateImage />} />
                    <Route path="/addServ/:UserPage" exact element={<AddServ/>} />
                    <Route path="/addServ/addServCategories/:UserPage" exact element={<AddServCategories/>} />
                    <Route path="/addServ/addingServicesList/:UserPage" exact element={<AddingServicesList/>} />
                    <Route path="/addServ/:UserPage/UserServScreen/:ServPage" exact element={<UserServScreen/>} />

                    <Route path="/AddContactInfo/:UserPage" exact element={<UpdateContactInfo/>} />
                    <Route path="/AddSocialInfo/:UserPage" exact element={<UpdateSocial />} />
                    <Route path="/AddWorkingHours/:UserPage" exact element={<UpdateWorkingHours />} />
                    <Route path="/AddLocation/:UserPage" exact element={<UpdateLocation/>} />
                    <Route path="/AddDescription/:UserPage" exact element={<UpdateDescription />} />
                    <Route path="/AddImage/:UserPage" exact element={<UpdateImage />} />
                    <Route path="/AddLoginServ/:UserPage" exact element={<AddServ/>} />
                    <Route path="/AddLoginServ/addServCategories/:UserPage" exact element={<AddServCategories/>} />
                    <Route path="/AddLoginServ/addingServicesList/:UserPage" exact element={<AddingServicesList/>} />
                    <Route path="/EditingCategories" exact element={<EditingCategories/>} />
                    <Route path="/AddLoginServ/:UserPage/UserServScreen/:ServPage" exact element={<UserServScreen/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
