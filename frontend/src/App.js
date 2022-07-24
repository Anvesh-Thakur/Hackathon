import {useEffect, useState} from 'react';
import './App.css';
import Auth from './Components/Authentication/Auth';
import Donation from './Components/Donation/Donation'
import Content from './Components/ContentCreators/Content';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />}/>
      <Route path='/donation' element={<Donation />} />
      <Route path='/content' element={<Content />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
