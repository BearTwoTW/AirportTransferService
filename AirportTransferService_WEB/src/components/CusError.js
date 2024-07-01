import React from 'react';
import { ErrorOutlineRounded } from '@mui/icons-material';

/**
 * @description 查無結果
 * @param {string} title 描述文字
 */
const NoResults = (props) => {
  return (
    <div className={"cusError__NoResults"} >
      <ErrorOutlineRounded />
      <span>{props.title === undefined ? "查無結果" : props.title}</span>
    </div>
  );
}

export {
  NoResults
};