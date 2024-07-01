import React from 'react';
import { LinearProgress, CircularProgress } from '@mui/material';
// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")
/**
 * 條狀加載畫面
 */
const LinearLoading = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0
    }}>
      <LinearProgress className={"LinearLoading"} />
    </div>
  )
}

/**
 * 轉圈加載畫面
 */
const CircularLoading = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "100%",
      transform: "translateY(-55%)",
      display: "flex",
      justifyContent: "center"
    }}>
      <CircularProgress />
    </div>
  )
}

const CusLoading = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "100%",
      transform: "translateY(-55%)",
      display: "flex",
      justifyContent: "center"
    }}>
      <div className="loader">
        <span className="l">L</span>
        <span className="o">O</span>
        <span className="a">A</span>
        <span className="d">D</span>
        <span className="i">I</span>
        <span className="n">N</span>
        <span className="g">G</span>
        <span className="d1">.</span>
        <span className="d2">.</span>
      </div>
    </div>
  )
}

export {
  LinearLoading,
  CircularLoading,
  CusLoading
};