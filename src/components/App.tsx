import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../routes';
import Alerts from './Alerts';
import LoginForm from './LoginForm';
import Navigation from './Navigation';
import RegisterForm from './RegisterForm';
import UserPage from './UserPage';
import UsersPage from './UsersPage';

const App: React.FC = () => {
  return (
    <>
      <Alerts />
      <Navigation />
      <Routes>
        <Route path={routes.home.path} element={<UsersPage />} />
        <Route path={routes.login.path} element={<LoginForm />} />
        <Route path={routes.register.path} element={<RegisterForm />} />
        <Route path={routes.user.path} element={<UserPage />} />
      </Routes>
    </>
  );
};

export default App;
