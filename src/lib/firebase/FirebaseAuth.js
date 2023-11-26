// components/FirebaseAuth.js
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import auth from './firebase';
import {Button , Textfield} from '@mui/material';
import './firebase.css';

const FirebaseAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful!');
      handleLogin()
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className='reg'>
      <h2>Find your favourite GIFs!!</h2>
      <div className='hide'>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button className='btn' variant="contained" onClick={handleRegister}>Register</Button>
      <Button className='btn' variant="contained" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default FirebaseAuth;
