//
// import './headerNavBar.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {Link, Route} from 'react-router-dom';
// import UserPage from '../../pages/UserPageScreen/UserPageScreen';
//
// function UserList() {
//     const [users, setUsers] = useState([]);
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//             setUsers(response.data);
//         };
//
//         fetchUsers();
//     }, []);
//
//     return (
//         <ul>
//             {users.map((user) => (
//                 <li key={user.id}>
//                     <Link to={`/users/${user.id}`}>{user.name}</Link>
//                 </li>
//             ))}
//         </ul>
//     );
// }
//
// const UserPages = () => {
//     return (
//         <div>
//             <UserList />
//             <Route path="/AllCategories/:Categories2/:Categories3/:_id" component={UserPage} />
//         </div>
//     );
// };
//
// export default UserPages;
