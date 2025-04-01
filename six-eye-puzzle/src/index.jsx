import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SessionProvider } from "./sessionContext"; // Import the SessionProvider
import Login from './login';
import Layout from './layout';
import Aboutus from './aboutus';
import Easy from './easy';
import Hard from './hard';
import How from './how';
import Home from './home';
import SignUp from './signup';
import Profile from './profile';
import TimeAttack from './timeattack';
import Survival from './survival';
import Memory from './memory';
import Scramble from './scramble';
import Classic from './classic';
import Rank from './rank';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider> {/* Wrap your app with SessionProvider */}
    <Router>
      <Routes>
        {/*Route without Layout*/} 
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/easy" element={<Easy />} />
          <Route path="/hard" element={<Hard />} />
          <Route path="/how" element={<How />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/timeattack" element={<TimeAttack />} />
          <Route path="/survival" element={<Survival />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/scramble" element={<Scramble />} />
          <Route path="/classic" element={<Classic />} />
          <Route path="/rank" element={<Rank />} />
        </Route>
      </Routes>
    </Router>
    </SessionProvider>
  </React.StrictMode>
);