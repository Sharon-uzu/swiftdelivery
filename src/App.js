import React from 'react';
import LogIn from './Screens/LogIn';
import SignUp from './Screens/SignUp';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './Screens/DashBoard';
import AdminDashboard from './Screens/Admin/AdminDashboard';
import Home from './Screens/Home';
import ContactUs from './Screens/ContactUs';
import Products from './Screens/Products';
import Settings from './Screens/Settings';
import AdminProperty from './Screens/Admin/AdminProperty';
import Clients from './Screens/Admin/Client';
import Vendor from './Screens/Admin/Vendor';
import User from './Screens/Admin/User';

function App() {
  return (
    <div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/dashboard' element={<DashBoard/>} />
          <Route path='/admindashboard' element={<AdminDashboard/>} />
          <Route path='/contact' element={<ContactUs/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/settings' element={<Settings/>} />
          
          {/* ADMIN */}
          <Route path='/adminproperties' element={<AdminProperty/>} />
          <Route path='/clients' element={<Clients/>} />
          <Route path='/vendor' element={<Vendor/>} />
          <Route path='/user' element={<User/>} />
        </Routes>

    </div>
  );
}

export default App;
