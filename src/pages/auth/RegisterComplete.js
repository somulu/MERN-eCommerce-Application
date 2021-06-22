import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validations
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // Remove the user from local storage
        window.localStorage.removeItem('emailForRegistration');
        // Get the id token of the user
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // Dispatch the user details to Redux Store

        // Redirect the user
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Complete Registration</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              value={email}
              disabled={true}
              autoFocus
            />
            <input
              type='password'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <br />
            <button type='submit' className='btn btn-raised'>
              Complete Registration
            </button>
          </form>
          ;
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
