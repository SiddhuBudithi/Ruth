import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login/Login';

const LoginPage = () => {
  const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {

    navigate("/login");
    // if(isAuthenticated === true){
    //   navigate("/");
    // }
  }, [])
  
  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage;