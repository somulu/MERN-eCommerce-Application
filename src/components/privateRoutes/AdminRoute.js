import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/authFunction';

const AdminRoute = ({ children, ...reset }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log('Current Admin Response', res);
          setOk(true);
        })
        .catch((err) => {
          console.log('Admin Route Error', err);
        });
    }
  }, [user]);

  return ok ? <Route {...reset} /> : <LoadingToRedirect />;
};

export default AdminRoute;
