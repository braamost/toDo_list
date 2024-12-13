import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { LoginIllustration } from './LoginIllustration';
import { Datacontext } from '../main';

const LoginPage = () => {
  const navigate = useNavigate();
  const {user,setUser} =useContext(Datacontext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const[ErrorMessage,setErrorMEssage]=useState(null); 
 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMEssage(e => null);
  };



  return (
    <div className="font-sans">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <LoginForm 
            formData={formData}
            onInputChange={handleInputChange}
            
            error={ErrorMessage}
            
          />
          <LoginIllustration />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;