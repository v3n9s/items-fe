import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../routes';
import Alerts from './Alerts';
import LoginPage from './auth/LoginPage';
import Navigation from './Navigation';
import RegisterPage from './auth/RegisterPage';
import UserPage from './user/UserPage';
import UsersPage from './user/UsersPage';
import CollectionModal from './collection/CollectionModal';

const App: React.FC = () => {
  return (
    <>
      <Alerts />
      <Navigation />
      <CollectionModal />
      <Routes>
        <Route path={routes.home.path} element={<UsersPage />} />
        <Route path={routes.login.path} element={<LoginPage />} />
        <Route path={routes.register.path} element={<RegisterPage />} />
        <Route path={routes.user.path} element={<UserPage />} />
      </Routes>
    </>
  );
};

export default App;
