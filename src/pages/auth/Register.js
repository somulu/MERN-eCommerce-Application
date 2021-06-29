import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Register URL', process.env.REACT_APP_REGISTER_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );

    // Save user email in local storage
    window.localStorage.setItem('emailForRegistration', email);

    // Clear local storage
    setEmail('');
  };

  // const registerForm = () => {
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type='email'
  //       className='form-control'
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       autoFocus
  //     />
  //     <button type='submit' className='btn btn-raised'>
  //       Register
  //     </button>
  //   </form>;
  // };

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <br />
            <button type='submit' className='btn btn-raised'>
              Register
            </button>
          </form>
          ;
        </div>
      </div>
    </div>
  );
};

export default Register;
