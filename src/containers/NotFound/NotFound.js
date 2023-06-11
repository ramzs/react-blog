import React from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import './NotFound.css';
import { Result, Button } from 'antd';


export const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
  }

  // if (!location?.state?.from) return <Navigate to="/" />

  return (
    <div className="notfound">
      <Result
        status='404'
        title='404'
        subTitle={`Страница ${location.state} не найдена`}
        extra={<Button onClick={backHome} type='primary'>Вернуться на главную</Button>}
      />
    </div>
  )
}
