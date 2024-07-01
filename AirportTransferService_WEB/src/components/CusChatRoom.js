import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Alert, Divider, Chip, Typography } from '@mui/material';
import { WebTextButton3 } from './WebSide/WebButton'
import { WebInputStandard3 } from './WebSide/WebInput'
import { CusTextButton } from '../components/CusButton';
import { CusInput } from '../components/CusInput';
import { DateTimeFormat } from '../js/FunctionTS';
import { OrderAPI } from '../js/APITS';

/** 聊天室組件 */
export const CusChatRoom = (props) => {
  const { ec_order_id, is_front, searchEvent } = props;

  // #region useState
  const scrollRef = useRef(null);
  const [apiSuccess, setApiSuccess] = useState(true);
  const [apiMessage, setApiMessage] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // #endregion

  // #region useEffect
  /** 畫面保持在最下方的effect */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageData]);

  /** 查詢問與答的effect */
  useEffect(() => {
    handleSearchMessage();
  }, []);
  // #endregion

  // #region functions
  /** 寄送訊息input */
  const edit_HandleInput = (e) => {
    const { value } = e.target;
    const val = value === "" ? null : value;

    setNewMessage(val);
  };

  /** 問與答查詢 */
  const handleSearchMessage = async () => {
    const { success, message, data } = await OrderAPI.OrderMessageSearch({
      ec_order_id: ec_order_id,
      page: 0,
      num_per_page: 0
    }, is_front);

    setApiSuccess(success);
    setApiMessage(message);

    if (success) {
      // 整理成類似LINE的訊息格式
      let messages = [];

      data.forEach(m => {
        const date = DateTimeFormat.DateTimeToString({ date: m.cre_time, Mode: DateTimeFormat.DateTimeMode.yyyyMMdd });
        const time = DateTimeFormat.DateTimeToString({ date: m.cre_time, Mode: DateTimeFormat.DateTimeMode.HHmm });

        const index = messages.findIndex(d => d.date === date);

        if (index === -1) {
          messages.push({
            date: date,
            message: [
              {
                id: m.id,
                time: time,
                message: m.message,
                user_id: m.user_id,
                user_name: m.user_name,
                customer_id: m.customer_id,
                customer_name: m.customer_name
              }
            ]
          });
        } else {
          messages[index].message.push({
            id: m.id,
            time: time,
            message: m.message,
            user_id: m.user_id,
            user_name: m.user_name,
            customer_id: m.customer_id,
            customer_name: m.customer_name
          });
        }
      });

      setMessageData(messages);
    }
  };

  /** 寄送訊息 */
  const handleSendMessage = async () => {
    if (newMessage === "" || newMessage === null) {
      alert('請輸入訊息');
      return;
    }

    const { success, message } = await OrderAPI.OrderMessageCreate({
      ec_order_id: ec_order_id,
      message: newMessage,
      send_email: "N"
    }, is_front);

    if (success) {
      handleSearchMessage();
      setNewMessage("");
      if (searchEvent) {
        searchEvent();
      }
    } else {
      alert(message);
    }
  };

  /** 寄信提醒 */
  const messageEmailAlert = async () => {
    const { success, message } = await OrderAPI.OrderMessageCreate({
      ec_order_id: ec_order_id,
      send_email: "Y"
    }, is_front);

    if (success) {
      alert("提醒成功");
    } else {
      alert(message);
    }
  };

  /** 檢查當前使用者跟訊息的使用者有沒有一樣
   * true，訊息長右邊 表示自己的訊息
   * false，訊息長左邊 表示別人的訊息
   * 
   * is_front === false 且 user_id !== ""，表示是自己的訊息
   * is_front === true 且 customer_id !== ""，表示是自己的訊息
   * 其餘都是別人的訊息
   */
  const checkSelf = (user_id, customer_id) => {
    if (is_front === false && user_id !== "") {
      return true
    } else if (is_front && customer_id !== "") {
      return true
    } else {
      return false
    }
  };
  // #endregion

  return (
    <>
      {apiSuccess
        ? <>
          <Grid container rowSpacing={3} ref={scrollRef} sx={{ overflowY: 'auto', height: '400px' }}>
            {messageData.length > 0
              ? messageData.map(chatItem => ((
                <Grid item xs={12} key={chatItem.date} sx={{ padding: "10px" }}>
                  <Box textAlign={'center'} marginBottom={2}>
                    <Chip label={chatItem.date} size='small' />
                  </Box>
                  {chatItem.message.map(chatContent => ((
                    <Grid key={chatContent.id} container display={'flex'} justifyContent={checkSelf(chatContent.user_id, chatContent.customer_id) ? 'flex-end' : 'flex-start'} marginBottom={2}>
                      <Grid item maxWidth='70%'>
                        <Alert sx={{ overflowWrap: "break-word" }} icon={false} severity={checkSelf(chatContent.user_id, chatContent.customer_id) ? 'success' : 'info'}>
                          {chatContent.message}
                        </Alert>
                        <Box width='100%' textAlign={checkSelf(chatContent.user_id, chatContent.customer_id) ? 'left' : 'right'}>
                          <Typography variant="caption" display="block" gutterBottom>{chatContent.time}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  )))}
                </Grid>
              )))
              : <Grid item xs={12}>
                <Alert severity='info'>對話框輸入文字按下送出即可進行對話</Alert>
              </Grid>}
          </Grid>
          <Grid container marginTop={3}>
            <Grid item xs={12}><Divider sx={{ margin: '1rem 0' }} /></Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                {is_front ?
                  <React.Fragment>
                    <WebInputStandard3
                      type={'text'}
                      name={'newMessage'}
                      multiline={true}
                      value={newMessage || ""}
                      placeholder={'請輸入訊息'}
                      onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                    <WebTextButton3
                      size={'medium'}
                      color={'primary'}
                      text={'送出'}
                      onClick={handleSendMessage}
                    />
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <CusInput
                      type={'text'}
                      name={'newMessage'}
                      multiline={true}
                      value={newMessage || ""}
                      placeholder={'請輸入訊息'}
                      onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                    <CusTextButton
                      size={'medium'}
                      color={'primary'}
                      text={'送出'}
                      onClick={handleSendMessage}
                    />
                    <CusTextButton
                      size={'medium'}
                      color={'error'}
                      text={'提醒'}
                      onClick={messageEmailAlert}
                    />
                  </React.Fragment>
                }
              </Box>
            </Grid>
          </Grid>
        </>
        : <Grid container>
          <Grid item xs={12}>
            <Alert icon={false} severity='error'>{apiMessage}</Alert>
          </Grid>
        </Grid>}
    </>
  );
};