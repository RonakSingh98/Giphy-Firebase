"use client";
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import auth from '../../lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import './Registerlogin.css';
import { Button } from '@mui/material';

const RegisterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful!');
      alert("Registration Successful !!")
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      router.push('/giphy'); // Navigate to the '/giphy' path after successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div class="container">
    <input type="checkbox" id="check"/>
    <div class="login form">
      <header>Giphy !!!</header>
      <div action="#">
        <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="button" class="button" value="Login" onClick={handleLogin}/>
       </div>
      <div class="signup">
      <input type="button" class="button" value="Register" onClick={handleRegister}/>
        
      </div>
    </div>
    
    </div>
  
   
  );
};

export default RegisterLogin;
