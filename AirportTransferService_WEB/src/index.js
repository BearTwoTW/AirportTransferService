import React from 'react';
import ReactDOM from 'react-dom/client';
import VerifyRoute from './VerifyRoute';
import ReportWebVitals from './ReportWebVitals';
import { BrowserRouter } from 'react-router-dom'
/**
 * @description useEffect 重複調用兩次的坑阿阿阿
 * 解說: https://juejin.cn/post/7105652180501135367
 */
//css
import './scss/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <VerifyRoute />
  </BrowserRouter>
  // </React.StrictMode>
);

ReportWebVitals();
