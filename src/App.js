// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import UserDetails from './components/DetailsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />  {/* Correctly set the element prop */}
                <Route path="/:firstName/:lastName/:mobile/:phone/:email/:company/:job/:street/:city/:state/:zip/:country/:website" element={<UserDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
