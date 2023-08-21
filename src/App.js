import React from "react";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import AllCategoriesScreen from "./pages/AllCategoriesScreen/AllCategorisScreen";
import CategoriesScreen2 from "./pages/CategoriesScreen2/CategoriesScreen2";
import CategoriesScreen3 from "./pages/CategoriesScreen3/CategoriesScreen3";
import SortedServicesScreen from "./pages/SortedServicesScreen/SortedServicesScreen";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import UserPageScreen from "./pages/UserPageScreen/UserPageScreen";
import Update from "./components/Update/Update";
import ContactDeveloper from "./pages/ContactDeveloper/ContactDeveloper";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import EditProfile from "./pages/EditProfile/EditProfile";
import UpdateLocation from "./components/UpdateLocation/UpdateLocation";
import UpdateImage from "./components/UpdateImage/UpdateImage";
import UpdateContactInfo from "./components/UpdateContactInfo/Update";
import AddContactInfo from "./pages/AddContactInfo/AddContactInfo";
import AddServicesScreen from "./pages/AddServicesScreen/AddServicesScreen";
import AddImage from "./pages/AddPhoto/AddImage";
import AddSocialInfo from "./pages/AddSocialInfo/AddSocialInfo";
import UpdateSocial from "./components/UpdateSocial/UpdateSocial";
import UpdateService from "./components/UpdateService/UpdateService";
import AddLocation from "./pages/AddLocation/AddLocation";
import UpdateDescription from "./components/UpdateDescription/UpdateDescription";
import AddDescription from "./pages/AddDescription/AddDescription";
import UpdateWorkingHours from "./components/UpdateWorkingHours/UpdateWorkingHours";
import AddWorkingHours from "./pages/AddWorkingHours/AddWorkingHours";
import AddServ from './components/addServ/addServ'
import UserServScreen from './pages/UserServScreen/UserServScreen'
import AddLoginServ from "./pages/AddLoginServ/AddLoginServ";
import UserServLoginScreen from './pages/UserServLoginScreen/UserServLoginScreen'
import SuccessfulLoginScreen from "./pages/SuccessfulLoginScreen/SuccessfulLoginScreen";
import CategoriesScreen4 from "./pages/CategoriesScreen4/CategoriesScreen4";
import SearchScreen from "./pages/SearchScreen/SearchScreen";
import ModalUserPage from "./pages/modalUserPage/modalUserPage";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/update/:UserPage" exact element={<Update />} />
                    <Route path="/updateContactInfo/:UserPage" exact element={<UpdateContactInfo />} />
                    <Route path="/UpdateSocial/:UserPage" exact element={<UpdateSocial />} />
                    <Route path="/updateService/:UserPage" exact element={<UpdateService />} />
                    <Route path="/updateImage/:UserPage" exact element={<UpdateImage />} />
                    <Route path="/UpdateLocation/:UserPage" exact element={<UpdateLocation/>} />
                    <Route path="/UpdateDescription/:UserPage" exact element={<UpdateDescription/>} />
                    <Route path="/addServ/:UserPage" exact element={<AddServ/>} />
                    <Route path="/addServ/:UserPage/UserServScreen/:ServPage" exact element={<UserServScreen/>} />
                    <Route path="/AddLoginServ/:UserPage" exact element={<AddLoginServ/>} />
                    <Route path="/AddLoginServ/:UserPage/UserServLoginScreen/:ServPage" exact element={<UserServLoginScreen/>} />
                    <Route path="/UpdateWorkingHours/:UserPage" exact element={<UpdateWorkingHours/>} />
                    <Route path="/ModalUserPage/:UserPage" exact element={<ModalUserPage />} />
                    <Route path="/FavoritesPage" exact element={<FavoritesPage />} />
                    <Route path="/EditProfile" exact element={<EditProfile />} />
                    <Route path="/SearchScreen" exact element={<SearchScreen />} />
                    <Route path="/AddContactInfo/:UserPage" exact element={<AddContactInfo />} />
                    <Route path="/AddSocialInfo/:UserPage" exact element={<AddSocialInfo />} />
                    <Route path="/AddLocation/:UserPage" exact element={<AddLocation/>} />
                    <Route path="/AddServicesScreen/:UserPage" exact element={<AddServicesScreen />} />
                    <Route path="/AddDescription/:UserPage" exact element={<AddDescription />} />
                    <Route path="/AddWorkingHours/:UserPage" exact element={<AddWorkingHours />} />
                    <Route path="/AddImage/:UserPage" exact element={<AddImage />} />
                    <Route path="/ContactDeveloper" exact element={<ContactDeveloper />} />
                    {/*<Route path="/SuccessfulLoginScreen/:id/verify/:token" exact element={<SuccessfulLoginScreen />} />*/}
                    <Route path="/SuccessfulLoginScreen" exact element={<SuccessfulLoginScreen />} />
                    <Route path='/' element={<HomeScreen />}/>
                    <Route path='/AllCategories' element={<AllCategoriesScreen />}/>
                    <Route path='/AllCategories/:Categories2' element={<CategoriesScreen2 />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3' element={<CategoriesScreen3 />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3/:Categories4' element={<CategoriesScreen4 />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3/:Categories4/:SortedCategories' element={<SortedServicesScreen />}/>
                    <Route path='/AllCategories/:Categories2/:Categories3/:Categories4/:SortedCategories/:UserPage' element={<UserPageScreen />}/>
                    <Route path='/UserPageScreen/:UserPage' element={<UserPageScreen />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
