import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for forgot password reset link');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? (
        <h4 className='text-danger'>Loading</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
          placeholder='Type your email'
        />
        <br />
        <button type='submit' className='btn btn-raised' disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
