import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserPrivateRoute = ({ children, ...reset }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? <Route {...reset} /> : <LoadingToRedirect />;
};

export default UserPrivateRoute;
