import React, { useState, useEffect } from 'react';
import { NoResults } from '../src/components/CusError';
import { useLocation, useNavigate } from 'react-router-dom';

/** 查無頁面 */
const NotFoundPage = () => {
  // TODO: 查無頁面時5秒後重新導向，普通正常頁面跳轉時，會閃現一下查無頁面，要想一下怎麼處理
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [second, setSecond] = useState(5);

  // const redirectPath = location.pathname.indexOf("System") !== -1 ? "/System/Index/Home" : "/index";

  // 五秒後自動跳轉
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSecond(prev => prev - 1);
  //     if (second === 1) {
  //       navigate(redirectPath);
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [second]);

  return (
    <React.Fragment>
      <NoResults title={"查無頁面"} />
      {/* <div style={{ fontSize: "100px", color: "red" }}>{second}</div> */}
    </React.Fragment>
  );
}

export default NotFoundPage;
