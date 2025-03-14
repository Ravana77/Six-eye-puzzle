import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './login';
import Layout from './layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
        
      </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);


