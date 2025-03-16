import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './login';
import Layout from './layout';
import Aboutus from './aboutus';
import Easy from './easy';
import Hard from './hard';
import How from './how';
import Home from './home';
import SignUp from './signup';
import Profile from './profile';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/easy" element={<Easy />} />
        <Route path="/hard" element={<Hard />} />
        <Route path="/how" element={<How />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);


