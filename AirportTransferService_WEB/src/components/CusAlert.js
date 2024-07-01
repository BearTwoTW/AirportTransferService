import React from 'react';
import { Alert, AlertTitle, Box, Stack, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Backspace } from '@mui/icons-material';
import { CusIconButton } from '../components/CusButton';
import { Adjust } from '@mui/icons-material';

/**
 * @description
 * @param {string} severity 類型 ex : info || error || warning || success
 * @param {string} text 文字內容
 * @param {string} variant ex : outlined || standard || filled 邊框類型、淺色滿版、深色滿版
 * @param {boolean} icon 最前面是否要有 icon
 * @param {function} onClose 關閉事件 有給的話就會有叉叉按鈕
 * @param {string} action 自定義按鈕
 * @param {string} color 覆盖不同程度提醒的默認顏色
 * @param {object} style 自訂style
 */
const CusAlert = (props) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Alert
        icon={props.icon === undefined ? props.severity === "default" ? <Adjust fontSize="inherit" /> : null : props.icon}
        className='alignMiddle'
        sx={{ justifyContent: "left" }}
        variant={props.variant === undefined ? "standard" : props.variant}
        color={props.severity}
        severity={props.severity}
        style={{ margin: "10px 0", ...props.style }}
        onClose={props.closeEvent !== undefined ? (e) => {
          props.closeEvent({
            "target": {
              "id": props.id,
              "name": props.name,
              "key": (props.optionKey === undefined ? "" : props.optionKey),
            }
          });
        } : null}
        action={props.actionBtn !== undefined ? props.actionBtn : null}>
        {props.title !== undefined ? <AlertTitle>{props.title}</AlertTitle> : null}
        {props.text}
      </Alert>
    </Box>
  )
}

const CusTimeLineAlert = (props) => {
  return (
    <Timeline sx={{
      padding: 0,
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
    }}>
      {props.data.map((ele, inx) => (
        <TimelineItem key={inx}>
          <TimelineSeparator>
            {inx !== 0 ? <TimelineConnector /> : <TimelineConnector sx={{ opacity: "0" }} />}
            <TimelineDot
              sx={{
                margin: "6px 0",
                padding: "6px",
                backgroundColor: inx === 0 ? "#9EE493" : inx === props.data.length - 1 ? "rgba(0,0,0,0.12)" : "#FFC857",
                boxShadow: "none",
              }}
            />
            {inx !== props.data.length - 1 ? <TimelineConnector /> : <TimelineConnector sx={{ opacity: "0" }} />}
          </TimelineSeparator>
          <TimelineContent sx={{ py: '6px', pr: "0px" }}>
            <Alert
              sx={{
                py: "0",
                flex: "1 1 auto",
                bgcolor: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "10px",
              }}
              icon={false}
            >
              {ele.title !== undefined ? <AlertTitle sx={{ fontWeight: "bolder" }}>{ele.title}</AlertTitle> : null}
              {ele.text}
            </Alert>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export {
  CusAlert,
  CusTimeLineAlert
};