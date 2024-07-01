import React, { useRef, useState, forwardRef, useCallback } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { Add, Error, FavoriteBorder, Favorite } from '@mui/icons-material';
import { WebTextIconButton3, WebTextButton3 } from './WebButton';
import { WebStatus } from './WebStatus'
import { WebDialog3 } from '../WebSide/WebDialog';
import { CusChatRoom } from '../CusChatRoom';
import { DateTimeFormat } from '../../js/FunctionTS';
import { usingPayment } from '../../js/Payment';
import { imageURL } from '../../js/Domain';
import { OrderAPI } from '../../js/APITS';
import fakeimg from '../../images/FakeImages/fakeimg.png';

/** 訂單明細 */
export const WebOrderDetail = (props) => {
  const {
    orderItem,
    cancelOrder_Click,
    addCart_Confirm,
    remit_Click,
    toggle_Favorite,
    favorite,
    websiteSetting
  } = props;

  // 訂單資訊
  const orderInfo = orderItem.dt_o;
  // 訂單商品
  const orderItems = orderItem.dt_oc_c;
  // 訂單贈品
  const orderGive = orderItem.dt_oc_g;
  // 訂單組合商品內容
  const orderComb = orderItem.dt_occd;
  // 訂單物流
  // TODO: 這邊暫時先寫死一筆，之後會有多筆狀況，再來改
  const orderLogistics = orderItem.dt_ol[0];

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});

  /** 貨況查詢 */
  const searchShip = ({ ec_oc_id, shipTime }) => {
    if (shipTime !== "" && shipTime !== null) {
      OrderAPI.OrderShipmentHCTSearch({
        ec_order_ids: [ec_oc_id],
      }, true).then(res => {
        let msg = "";
        if (res.success) {
          if (res.data.length > 0) {
            window.open(res.data[0].hct_url, "_blank");
          } else {
            msg = "查無貨況查詢網址"
          }
        } else {
          msg = res.message;
        }

        useDialog.current.handleOpen();
        setDialogData(({
          autoClose: true,
          DialogContent: <DialogsInner ref={useDialogInner} message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Error className={"text-info"} />
              <span style={{ marginLeft: "0.5rem" }}>{msg}</span>
            </span>} />,
        }));
      });
    } else {
      useDialog.current.handleOpen();
      setDialogData(({
        autoClose: true,
        DialogContent: <DialogsInner ref={useDialogInner} message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <Error className={"text-info"} />
            <span style={{ marginLeft: "0.5rem" }}>{"尚未出貨"}</span>
          </span>} />,
      }));
    }
  };

  /** 虛擬帳戶匯款資訊 */
  const transferAccountInfo = () => {
    useDialog.current.handleOpen();

    setDialogData(({
      autoClose: false,
      maxWidth: "sm",
      DialogTitle: "匯款資訊",
      DialogContent: (
        <DialogsInner
          ref={useDialogInner}
          type={"accountInfo"}
          orderInfo={orderInfo}
        />
      ),
      DialogActions: (
        <Grid container display={"flex"} justifyContent={"end"}>
          <WebTextButton3
            fullWidth={false}
            size={"medium"}
            color={"primary"}
            text={"確認"}
            onClick={dialogClose}
          />
        </Grid>
      )
    }));
  };

  /** 判斷重新付款的click事件
   * @description 轉帳且是有串接的話，就顯示虛擬帳戶，轉帳但沒有串接，就顯示一般轉帳帳戶
   * @param {*} series_connection_type 串接類別
   */
  const repay_click = (ec_order_id, series_connection_type) => {
    if (series_connection_type === "無") {
      remit_Click({ ec_order_id });
    } else {
      transferAccountInfo();
    }
  };

  /** 問與答查詢 */
  const handleClickQA = () => {
    useDialog.current.handleOpen();

    setDialogData(({
      autoClose: false,
      maxWidth: "sm",
      DialogTitle: "線上客服",
      DialogContent: <DialogsInner
        ref={useDialogInner}
        message={
          <CusChatRoom
            ec_order_id={orderInfo.ec_order_id}
            is_front={true}
            searchEvent={null}
          />
        }
      />,
    }));
  };

  /** 關閉]Dialog */
  const dialogClose = useCallback(() => {
    useDialog.current.handleClose()
  }, []);

  if (websiteSetting) {
    return (
      <React.Fragment>
        <Box key={orderInfo.key} className="w-full flex flex-col justify-between border border-light-gray bg-light-gray-100 rounded-md p-2.5 mt-5">
          <Box className="flex w-full">
            <Box className="flex-1 max-lg:w-full">
              <table className="table-fixed w-11/12 max-lg:w-full text-dark-brown max-md:flex max-md:justify-start md:mb-3">
                <thead className="table-header-group">
                  <tr className="font-bold text-info text-left max-md:flex max-md:flex-col max-md:pr-6 max-md:whitespace-nowrap">
                    <td className="table-cell">訂單編號</td>
                    <td className="table-cell">日期</td>
                    <td className="table-cell">訂單狀態</td>
                    <td className="table-cell">總價</td>
                    <td className="table-cell">付款</td>
                    {/* {data.officesite_pay_status === "未付款"
                                    ? <td className="table-cell">付款期限</td>
                                    : null} */}

                    {/* <td className="table-cell">發票</td> */}
                  </tr>
                </thead>
                <tbody className="table-row-group">
                  <tr className="table-row text-info max-md:flex max-md:flex-col whitespace-nowrap">
                    <td className="table-cell">{orderInfo.ec_order_code}</td>
                    <td className="table-cell">{DateTimeFormat.DateTimeToString({ date: orderInfo.cre_time, Mode: DateTimeFormat.DateTimeMode.yyyyMMdd })}</td>
                    <td className="table-cell">{orderLogistics.officesite_order_status}</td>
                    <td className="table-cell dollarSign">{orderInfo.total_price - orderInfo.shopping_voucher - orderInfo.bonus_use}</td>
                    <td className="table-cell">
                      {orderLogistics.officesite_pay_status} <span className="text-xs">{orderLogistics.officesite_pay_status === "未付款" ? `(期限：${DateTimeFormat.DateTimeToString({ date: orderInfo.expired_time, Mode: DateTimeFormat.DateTimeMode.yyyyMMdd })})` : null}</span>
                    </td>
                    {/* {data.officesite_pay_status === "未付款"
                                    ? <td className="table-cell">{DateTimeFormate.DateTimeToString({
                                        date: data.expired_time, Mode: "yyyyMMdd"
                                    })}</td>
                                    : null} */}

                    {/* <td className="table-cell underline">發票內容</td> */}
                  </tr>
                </tbody>
              </table >

              {orderLogistics.officesite_order_status === "訂單取消"
                ? orderLogistics.pay_status === "未付款"
                  ? null
                  : <WebStatus
                    statusData={
                      (() => {
                        // TODO: 以下判斷可能可以在想一下有沒有更簡潔的寫法，判斷有點太多，難以維護
                        let status = [
                          {
                            title: orderLogistics.ship_time ? "退貨訂單申請" : "取消訂單申請", // 會員申請的時間
                            thisStatusTime: orderLogistics.ship_time ? orderLogistics.return_apply_time : orderLogistics.cancel_apply_time,
                            nextStatusTime: orderLogistics.ship_time ? orderLogistics.return_check_time : orderLogistics.cancel_check_time
                          },
                          {
                            title: "確認申請", // 後台審核確認的時間
                            thisStatusTime: orderLogistics.ship_time ? orderLogistics.return_check_time : orderLogistics.cancel_check_time,
                            nextStatusTime: orderLogistics.ship_time ? orderLogistics.return_confirm_time : orderLogistics.refund_over_time
                          },
                          {
                            title: "退貨中", // 後台確認退貨的時間
                            thisStatusTime: orderLogistics.return_confirm_time,
                            nextStatusTime: orderLogistics.return_accept_time
                          },
                          {
                            title: "退貨確認", // 後台驗貨完成的時間
                            thisStatusTime: orderLogistics.return_accept_time,
                            nextStatusTime: orderLogistics.refund_over_time
                          },
                          {
                            title: "退款完成", // 後台退款完成的時間
                            thisStatusTime: orderLogistics.refund_over_time,
                            nextStatusTime: null
                          }
                        ]

                        /**
                         * 申請要判斷是因為有些訂單沒有申請時間，例如後台直接退貨貨是取消訂單，視同直接核准，因此只有check_time
                         * 退貨中、退貨確認要判斷是因為有些訂單沒有出貨時間，例如已付款但未出貨的取消，因此退貨中、退貨確認不顯示
                         */
                        let finalStatus = status.slice();
                        if (!orderLogistics.return_apply_time && !orderLogistics.cancel_apply_time) {
                          finalStatus = finalStatus.filter(item => item.title !== "退貨訂單申請" && item.title !== "取消訂單申請");
                        }
                        if (!orderLogistics.ship_time) {
                          finalStatus = finalStatus.filter(item => item.title !== "退貨中" && item.title !== "退貨確認");
                        }
                        return finalStatus;
                      })()
                    }
                  />
                : <WebStatus
                  statusData={
                    [
                      {
                        title: "收到訂單", // 會員下單的時間
                        thisStatusTime: orderLogistics.cre_time,
                        nextStatusTime: orderLogistics.pay_time
                      },
                      {
                        title: "付款完成", // 會員付款or後台確認付款的時間
                        thisStatusTime: orderLogistics.pay_time,
                        nextStatusTime: orderLogistics.pick_time
                      },
                      {
                        title: "揀貨", // 後台揀貨的時間
                        thisStatusTime: orderLogistics.pick_time,
                        nextStatusTime: orderLogistics.ship_time
                      },
                      {
                        title: orderLogistics.logistics_name === "自取" ? "待取貨" : "出貨", // 後台出貨的時間
                        thisStatusTime: orderLogistics.ship_time,
                        nextStatusTime: orderLogistics.ship_arrive_time
                      },
                      {
                        title: "訂單完成", // 會員確認收貨的時間
                        thisStatusTime: orderLogistics.ship_arrive_time,
                        nextStatusTime: null
                      }
                    ]
                  }
                />}
            </Box>
            <Box className="flex flex-col max-lg:hidden">
              <WebTextButton3
                className="my-2.5"
                color="primary"
                text="問問題"
                onClick={() => handleClickQA()}
              />
              {orderLogistics.officesite_order_status === "訂單取消"
                ? null
                : <React.Fragment>
                  {orderLogistics.officesite_pay_status === "未付款"
                    ? orderInfo.ec_payment_code === "002"
                      ? <WebTextButton3
                        className="my-2.5"
                        color="primary"
                        text="匯款資訊"
                        onClick={() => repay_click(orderInfo.ec_order_id, orderInfo.ec_payment_series_connection_type)}
                      // onClick={() => transferAccountInfo()}
                      // onClick={(e) => remit_Click({ e: e, ec_order_id: orderInfo.ec_order_id, transfer_account: orderInfo.transfer_account })}
                      />
                      : <WebTextButton3
                        className="my-2.5"
                        color="primary"
                        text="重新付款"
                        onClick={(e) => usingPayment("CTBCCreditCardPay", { ec_order_code: orderInfo.ec_order_code, amount: orderInfo.total_price - orderInfo.shopping_voucher - orderInfo.bonus_use })}
                      />
                    : null}
                  {websiteSetting.can_website_cancel_order === "Y" && orderLogistics.officesite_order_status === "訂單完成" && orderLogistics.ship_arrive_time && DateTimeFormat.getDiffDay(orderLogistics.ship_arrive_time) <= 7
                    ? <WebTextButton3
                      className="my-2.5"
                      variant="outlined"
                      color="secondary"
                      text="訂單退貨"
                      disabled={orderLogistics.return_apply_time ? true : false}
                      onClick={(e) => cancelOrder_Click({ e, ec_order_id: orderInfo.ec_order_id, officesite_pay_status: orderLogistics.officesite_pay_status, btn_type: "訂單退貨", ec_payment: orderInfo.ec_payment })}
                    />
                    : null}
                  {orderLogistics.pick_time
                    ? null
                    : <WebTextButton3
                      className="my-2.5"
                      variant="outlined"
                      color="secondary"
                      text="取消訂單"
                      disabled={orderLogistics.cancel_apply_time ? true : false}
                      onClick={(e) => cancelOrder_Click({ e, ec_order_id: orderInfo.ec_order_id, officesite_pay_status: orderLogistics.officesite_pay_status, btn_type: "取消訂單", ec_payment: orderInfo.ec_payment })}
                    />}
                  {orderLogistics.logistics_name === "自取"
                    ? null
                    : <WebTextButton3
                      className="my-2.5"
                      variant="outlined"
                      color="secondary"
                      text="貨況查詢"
                      onClick={() => searchShip({ ec_oc_id: orderInfo.ec_order_id, shipTime: orderLogistics.ship_time })}
                    />}
                </React.Fragment>}
            </Box>
          </Box>
          <Box className="w-full my-5 lg:hidden">
            <WebTextButton3
              className="mb-3.5"
              fullWidth={true}
              color="primary"
              text="問問題"
              onClick={() => handleClickQA()}
            />
            {orderLogistics.officesite_order_status === "訂單取消"
              ? null
              : <>
                {orderLogistics.officesite_pay_status === "未付款"
                  ? orderInfo.ec_payment_code === "002"
                    ? <WebTextButton3
                      className="mb-3.5"
                      fullWidth={true}
                      color="primary"
                      text="匯款資訊"
                      onClick={() => repay_click(orderInfo.ec_order_id, orderInfo.ec_payment_series_connection_type)}
                    // onClick={() => transferAccountInfo()}
                    // onClick={(e) => remit_Click({ e: e, ec_order_id: orderInfo.ec_order_id, transfer_account: orderInfo.transfer_account })}
                    />
                    : <WebTextButton3
                      className="mb-3.5"
                      fullWidth={true}
                      color="primary"
                      text="重新付款"
                      onClick={(e) => usingPayment("CTBCCreditCardPay", { ec_order_code: orderInfo.ec_order_code, amount: orderInfo.total_price - orderInfo.shopping_voucher - orderInfo.bonus_use })}
                    />
                  : null}
                {websiteSetting.can_website_cancel_order === "Y" && orderLogistics.officesite_order_status === "訂單完成" && orderLogistics.ship_arrive_time && DateTimeFormat.getDiffDay(orderLogistics.ship_arrive_time) <= 7
                  ? <WebTextButton3
                    className="my-2.5 mb-3.5"
                    fullWidth={true}
                    variant="outlined"
                    color="secondary"
                    text="訂單退貨"
                    disabled={orderLogistics.return_apply_time ? true : false}
                    onClick={(e) => cancelOrder_Click({ e, ec_order_id: orderInfo.ec_order_id, officesite_pay_status: orderLogistics.officesite_pay_status, btn_type: "訂單退貨", ec_payment: orderInfo.ec_payment })}
                  />
                  : null}
                {orderLogistics.pick_time
                  ? null
                  : <WebTextButton3
                    className="mb-3.5"
                    fullWidth={true}
                    variant="outlined"
                    color="secondary"
                    text="取消訂單"
                    disabled={orderLogistics.cancel_apply_time ? true : false}
                    onClick={(e) => cancelOrder_Click({ e, ec_order_id: orderInfo.ec_order_id, officesite_pay_status: orderLogistics.officesite_pay_status, btn_type: "取消訂單", ec_payment: orderInfo.ec_payment })}
                  />}
                {orderLogistics.logistics_name === "自取"
                  ? null
                  : <WebTextButton3
                    fullWidth={true}
                    variant="outlined"
                    color="secondary"
                    text="貨況查詢"
                    onClick={() => searchShip({ ec_oc_id: orderInfo.ec_order_id, shipTime: orderInfo.ship_time })}
                  />}
              </>}
          </Box>
          <OrderDetailItems
            orderInfo={orderInfo}
            orderItems={orderItems}
            orderLogistics={orderLogistics}
            orderGive={orderGive}
            orderComb={orderComb}
            addCart_Confirm={addCart_Confirm}
            toggle_Favorite={toggle_Favorite}
            favorite={favorite}
            websiteSetting={websiteSetting}
          />
        </Box>
        <WebDialog3 ref={useDialog} info={dialogData} />
      </React.Fragment>
    );
  }
};

/** 訂單明細商品
 * @param {*} props 
 */
export const OrderDetailItems = (props) => {
  const { orderInfo, orderItems, orderLogistics, orderComb, orderGive, addCart_Confirm, toggle_Favorite, favorite, websiteSetting } = props;

  // 已使用之促銷
  const promotions = JSON.parse(orderInfo.promotion_ids);
  // 購買商品小計
  const orderItemsTotal = orderItems.reduce((total, c) => total + (c.suggested_price * c.count), 0);
  // 加購商品小計
  const orderGiveTotal = orderGive.length > 0
    ? orderGive.reduce((total, g) => total + (g.suggested_price * g.count), 0)
    : 0;

  return (
    <React.Fragment>
      <Box className="w-full mt-5">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer list-none select-none space-x-2 text-info">
            <span className="transition group-open:rotate-180">
              <svg className="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25l7.5 7.5 7.5-7.5" />
              </svg>
            </span>
            <span className="text-sm">查看明細</span>
            <hr className="flex-1 border-light-gray my-2.5" />
          </summary>
          {/* 已使用之促銷 */}
          <Box className="my-2.5">
            <Box className="title">
              <Box className="titleBlock"></Box>
              <p>已使用促銷</p>
            </Box>
            <Box className="pt-2.5 mb-5">
              <Box className="w-full flex flex-col space-y-2.5">
                {(() => {
                  if (promotions.length > 0) {
                    return promotions.map((item, index) => {
                      return (
                        <Box key={index} className="flex justify-between">
                          <Box className="flex items-center space-x-2.5">
                            <span className="text-xs bg-primary text-info p-1 whitespace-nowrap">
                              {item.source_type}
                            </span>
                            <span className="text-xs text-info">{item.name}</span>
                          </Box>
                          <Box>
                            <span className="text-xs text-info dollarSignDiscount">{item.discount_calculate}</span>
                          </Box>
                        </Box>
                      )
                    });
                  } else {
                    return <Box className="flex w-8/12">無使用促銷</Box>
                  }
                })()}
              </Box>
            </Box>
            {/* 主要購買商品 */}
            {orderItems.length > 0
              ? <React.Fragment>
                <Box className="title">
                  <Box className="titleBlock"></Box>
                  <p>購買商品</p>
                </Box>
                {orderItems.map(c => (
                  <Box key={c.ec_oc_id} className="border-b mb-2.5">
                    <Box className="w-full flex flex-col pt-2.5 pb-2.5">
                      <Box className="flex">
                        <Box className="flex-none w-[100px] h-[100px] mr-2.5">
                          {/* 圖片 */}
                          <img src={c.filepath_headshot ? (imageURL + c.filepath_headshot) : fakeimg} alt="" className="object-cover w-[100px] h-[100px]" />
                        </Box>
                        <Box className="grow flex flex-col justify-between space-y-1">
                          <Box className="w-full flex">
                            <Box className="flex-1 space-y-2">
                              {/* 標題 */}
                              <h3>{c.is_preorder === "Y" ? "[預購] " : ""}{c.commodity_name}</h3>
                              <Box className="flex">
                                {/* 規格 */}
                                <span className="text-xs text-info">規格：{c.ccad_name_1}-{c.ccad_name_2}</span>
                              </Box>
                              <Box className="flex justify-end">
                                {/* 數量 */}
                                <span className="text-xs text-info">數量：{`${c.count}(${c.convert_unit_name})`}</span>
                              </Box>
                              <Box className="flex justify-end">
                                {/* 數量 */}
                                <span className="text-xs text-info dollarSign">{c.sale_price * c.count}</span>
                              </Box>
                            </Box>
                            {/* <Box className="w-2/12 flex justify-around max-md:hidden">
                                                        <WebTextButton3
                                                            size={"large"}
                                                            color="secondary"
                                                            text={favorite.some(f => f.customer_id === localStorage.customer_id && f.commodity_id === c.commodity_id)
                                                                ? <Favorite />
                                                                : <FavoriteBorder />}
                                                            onClick={() => toggle_Favorite(c.commodity_id)}
                                                        />
                                                        <WebTextButton3
                                                            size={"large"}
                                                            color="primary"
                                                            text={<Add />}
                                                            onClick={() => addCart_Confirm({
                                                                commodity_id: c.commodity_id,
                                                                uc_id: c.uc_id,
                                                                count: c.count,
                                                                ccad_id_1: c.ccad_id_1,
                                                                ccad_id_2: c.ccad_id_2,
                                                            })}
                                                        />
                                                    </Box> */}
                          </Box>
                        </Box>
                      </Box>
                      {/* <Box className="w-full flex mt-5 md:hidden">
                                            {orderLogistics.officesite_order_status === "訂單取消"
                                                ? <WebTextButton3
                                                    size={"large"}
                                                    color="secondary"
                                                    text={favorite.some(f => f.customer_id === localStorage.customer_id && f.commodity_id === c.commodity_id)
                                                        ? <Favorite />
                                                        : <FavoriteBorder />}
                                                    onClick={() => toggle_Favorite(c.commodity_id)}
                                                />
                                                : <WebTextIconButton3
                                                    fullWidth={true}
                                                    color="primary"
                                                    startIcon={<Add />}
                                                    text="加入購物車"
                                                    onClick={() => addCart_Confirm({
                                                        commodity_id: c.commodity_id,
                                                        uc_id: c.uc_id,
                                                        count: c.count,
                                                        ccad_id_1: c.ccad_id_1,
                                                        ccad_id_2: c.ccad_id_2,
                                                    })}
                                                />}
                                        </Box> */}
                    </Box>
                    {/* 組合商品內容 */}
                    {orderComb.length > 0 && orderComb.find(cb => cb.commoditycombination_id === c.commodity_id)
                      ? <Box className="flex flex-col">
                        <h3>組合商品內容</h3>
                        {orderComb.map(cd => (
                          <Box key={cd.ec_occd_id} className="w-full pt-2.5 pb-2.5">
                            <Box className="flex">
                              <Box className="flex-none w-[50px] h-[50px] mr-2.5">
                                {/* 圖片 */}
                                <img src={cd.filepath_headshot ? (imageURL + cd.filepath_headshot) : fakeimg} alt="" className="object-cover w-[50px] h-[50px]" />
                              </Box>
                              <Box className="grow flex flex-col justify-between space-y-1">
                                <Box className="w-full flex">
                                  <Box className="w-10/12 max-md:w-full">
                                    {/* 標題 */}
                                    <h3>{cd.commodity_name}</h3>
                                  </Box>
                                </Box>
                                <Box>
                                  <Box className="flex">
                                    {/* 規格 */}
                                    <span className="text-xs text-info">規格：{cd.ccad_name_1}-{cd.ccad_name_2}</span>
                                  </Box>
                                  <Box className="flex justify-between">
                                    {/* 數量 */}
                                    <span className="text-xs text-info">數量：{`${cd.count}(${cd.convert_unit_name})`}</span>
                                    <span className="text-xs text-info dollarSign">{cd.sale_price * cd.count}</span>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      : null}
                  </Box>
                ))}
                {/* 贈品 */}
                {orderGive.length > 0
                  ? <React.Fragment>
                    <h2>加購品 / 贈品</h2>
                    {orderGive.map(g => (
                      <Box key={g.ec_oc_id} className="w-full flex flex-col border-b pt-2.5 pb-2.5 mb-2.5">
                        <Box className="flex">
                          <Box className="flex-none w-[100px] h-[100px] mr-2.5">
                            {/* 圖片 */}
                            <img src={g.filepath_headshot ? (imageURL + g.filepath_headshot) : fakeimg} alt="" className="object-cover w-[100px] h-[100px]" />
                          </Box>
                          <Box className="grow flex flex-col justify-between space-y-1">
                            <Box className="w-full flex">
                              <Box className="w-10/12 max-md:w-full">
                                {/* 標題 */}
                                <h3>{g.commodity_name}</h3>
                              </Box>
                            </Box>
                            <Box>
                              <Box className="flex">
                                {/* 規格 */}
                                <span className="text-xs text-info">規格：{g.ccad_name_1}-{g.ccad_name_2}</span>
                              </Box>
                              <Box className="flex justify-between">
                                {/* 數量 */}
                                <span className="text-xs text-info">數量：{`${g.count}(${g.convert_unit_name})`}</span>
                                <span className="text-xs text-info dollarSign">{g.sale_price * g.count}</span>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </React.Fragment>
                  : null}
              </React.Fragment>
              : null}
            {/** 總價 */}
            <Box className="w-full space-y-2 text-sm text-info mb-5">
              <Box className="flex justify-end">
                <Box className="w-6/12 max-lg:w-full flex justify-between">
                  <Box>小計：</Box>
                  <Box className={"dollarSign"}>{orderItemsTotal + orderGiveTotal}</Box>
                </Box>
              </Box>
              {promotions.length > 0 ?
                promotions.map(ele => (
                  <Box className="flex justify-end" key={ele.promotion_id}>
                    <Box className="w-6/12 max-lg:w-full flex justify-between">
                      <Box>{ele.name}{ele.bonus_get ? ` (+ ${ele.bonus_get}紅利回饋)` : ""}</Box>
                      <Box className={"dollarSignDiscount"}>{ele.discount_calculate}</Box>
                    </Box>
                  </Box>
                ))
                : null}

              {/* <Box className="flex justify-end">
                <Box className="w-6/12 max-lg:w-full flex justify-between">
                  <Box>促銷折抵：</Box>
                  <Box>
                    - NT$ {promotions.length > 0
                      ? promotions.reduce((total, p) => {
                        if (p.discount_calculate) {
                          return total + p.discount_calculate;
                        } else {
                          return 0;
                        }
                      }, 0)
                      : 0}
                  </Box>
                </Box>
              </Box> */}
              {websiteSetting.shopping_voucher_isopen === "Y"
                ? <Box className="flex justify-end">
                  <Box className="w-6/12 max-lg:w-full flex justify-between">
                    <Box>購物金折抵：</Box>
                    <Box className={"dollarSignDiscount"}>{orderInfo.shopping_voucher}</Box>
                  </Box>
                </Box>
                : null}
              {websiteSetting.bonus_isopen === "Y"
                ? <Box className="flex justify-end">
                  <Box className="w-6/12 max-lg:w-full flex justify-between">
                    <Box>紅利折抵：</Box>
                    <Box className={"discountSign"}>{orderInfo.bonus_use} 點</Box>
                  </Box>
                </Box>
                : null}
              <Box className="flex justify-end">
                <Box className="w-6/12 max-lg:w-full flex justify-between">
                  <Box>運費：</Box>
                  <Box className={"dollarSignDiscount"}>{orderLogistics.logistics_freight}</Box>
                </Box>
              </Box>
              <Box className="flex justify-end font-bold">
                <Box className="w-6/12 max-lg:w-full flex justify-between">
                  <Box>合計：</Box>
                  <Box className={"dollarSign"}>{orderInfo.total_price - orderInfo.shopping_voucher - orderInfo.bonus_use}</Box>
                </Box>
              </Box>
              {websiteSetting.bonus_isopen === "Y"
                ? <Box className="flex justify-end font-bold">
                  <Box className="w-6/12 max-lg:w-full flex justify-between">
                    <Box>紅利回饋合計：</Box>
                    <Box>+ {orderInfo.bonus_get} 點</Box>
                  </Box>
                </Box>
                : null}
            </Box>
            <Box>
              {/** 配送資訊 */}
              <Box className="title">
                <Box className="titleBlock"></Box>
                <p>配送資訊</p>
              </Box>
              <Box className="w-full text-sm text-info space-y-2.5 mb-5">
                <Box className="flex">
                  <Box className="w-6/12">
                    <Box>收件人姓名：</Box>
                  </Box>
                  <Box className="w-6/12">
                    <Box>{orderLogistics.contact_name}</Box>
                  </Box>
                </Box>
                <Box className="flex">
                  <Box className="w-6/12">
                    <Box>收件人連絡電話：</Box>
                  </Box>
                  <Box className="w-6/12">
                    <Box>{orderLogistics.contact_mobile_phone}</Box>
                  </Box>
                </Box>
                <Box className="flex">
                  <Box className="w-6/12">
                    <Box>取貨方式：</Box>
                  </Box>
                  <Box className="w-6/12">
                    <Box>{orderLogistics.logistics_name}</Box>
                  </Box>
                </Box>
                {orderLogistics.logistics_name === "自取"
                  ? <>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>門市名稱：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderLogistics.position_store_name}</Box>
                      </Box>
                    </Box>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>門市地址：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderLogistics.position_city}{orderLogistics.position_area}{orderLogistics.position_address}</Box>
                      </Box>
                    </Box>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>營業時間：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderLogistics.position_bussiness_hour}</Box>
                      </Box>
                    </Box>
                  </>
                  : null}
                {orderLogistics.logistics_name === "宅配"
                  ? <Box className="flex">
                    <Box className="w-6/12">
                      <Box>配送地址：</Box>
                    </Box>
                    <Box className="w-6/12">
                      <Box>{orderLogistics.contact_zip_code} {orderLogistics.contact_city} {orderLogistics.contact_area} {orderLogistics.contact_address}</Box>
                    </Box>
                  </Box>
                  : null}
              </Box>
              {/** 付款資訊 */}
              <Box className="title">
                <Box className="titleBlock"></Box>
                <p>付款資訊</p>
              </Box>
              <Box className="w-full text-sm text-info space-y-2.5 mb-5">
                <Box className="flex">
                  <Box className="w-6/12">
                    <Box>付款方式：</Box>
                  </Box>
                  <Box className="w-6/12">
                    <Box>{orderInfo.ec_payment_name}</Box>
                  </Box>
                </Box>
                {orderInfo.ec_payment_code === "002" && orderLogistics.officesite_pay_status === "未付款"
                  ? <>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>收款銀行代碼：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderInfo.transfer_bank_code_seller} {orderInfo.transfer_bank_name_seller}</Box>
                      </Box>
                    </Box>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>收款虛擬帳號：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderInfo.transfer_account_seller}</Box>
                      </Box>
                    </Box>
                  </>
                  : null}
                <Box className="flex">
                  <Box className="w-6/12">
                    <Box>付款狀態：</Box>
                  </Box>
                  <Box className="w-6/12">
                    <Box>{orderLogistics.officesite_pay_status}</Box>
                  </Box>
                </Box>
                {websiteSetting.invoice_isopen === "Y"
                  ? <>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>發票種類：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderInfo.unifiedRegistrationNumber ? "公司戶發票" : orderInfo.npoban ? "愛心碼" : orderInfo.carrierID1 ? "雲端發票" : "個人發票"}</Box>
                      </Box>
                    </Box>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>手機載具：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderInfo.carrierID1}</Box>
                      </Box>
                    </Box>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>統一編號：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderInfo.unifiedRegistrationNumber}</Box>
                      </Box>
                    </Box>
                    <Box className="flex">
                      <Box className="w-6/12">
                        <Box>發票狀態：</Box>
                      </Box>
                      <Box className="w-6/12">
                        <Box>{orderInfo.invoiceStatus === "cancel" ? "已作廢" : orderInfo.invoiceNo ? "已開立" : "處理中"}</Box>
                      </Box>
                    </Box>
                  </>
                  : null}
              </Box>
              {/** 備註 */}
              <Box className="title">
                <Box className="titleBlock"></Box>
                <p>備註</p>
                <span className="text-xs ml-2.5">(如有疑問，請聯繫客服)</span>
              </Box>
              <Box className="w-full text-sm text-info space-y-2.5 mb-5">
                {orderLogistics.cancel_apply_note === ""
                  && orderLogistics.return_apply_note === ""
                  && orderLogistics.cancel_check_note === ""
                  && orderLogistics.return_check_note === ""
                  ? <Box className="flex">
                    <Box className="w-6/12">
                      <Box>查無備註</Box>
                    </Box>
                  </Box>
                  : null}
                {orderLogistics.cancel_apply_note !== ""
                  ? <Box className="flex">
                    <Box className="w-6/12">
                      <Box>取消原因：</Box>
                    </Box>
                    <Box className="w-6/12">
                      <Box>
                        {orderLogistics.cancel_apply_note}
                        <span className="text-xs ml-2.5">
                          {`(${DateTimeFormat.DateTimeToString({ date: orderLogistics.cancel_apply_time, Mode: DateTimeFormat.DateTimeMode.MMddHHmm })})`}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                  : null}
                {orderLogistics.cancel_check_note !== ""
                  ? <Box className="flex">
                    <Box className="w-6/12">
                      <Box>取消審核：</Box>
                    </Box>
                    <Box className="w-6/12">
                      <Box>
                        {orderLogistics.cancel_check_note}
                        <span className="text-xs ml-2.5">
                          {`(${DateTimeFormat.DateTimeToString({ date: orderLogistics.cancel_check_time, Mode: DateTimeFormat.DateTimeMode.MMddHHmm })})`}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                  : null}
                {orderLogistics.return_apply_note !== ""
                  ? <Box className="flex">
                    <Box className="w-6/12">
                      <Box>退貨原因：</Box>
                    </Box>
                    <Box className="w-6/12">
                      <Box>
                        {orderLogistics.return_apply_note}
                        <span className="text-xs ml-2.5">
                          {`(${DateTimeFormat.DateTimeToString({ date: orderLogistics.return_apply_time, Mode: DateTimeFormat.DateTimeMode.MMddHHmm })})`}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                  : null}
                {orderLogistics.return_check_note !== ""
                  ? <Box className="flex">
                    <Box className="w-6/12">
                      <Box>退貨審核：</Box>
                    </Box>
                    <Box className="w-6/12">
                      <Box>
                        {orderLogistics.return_check_note}
                        <span className="text-xs ml-2.5">
                          {`(${DateTimeFormat.DateTimeToString({ date: orderLogistics.return_check_time, Mode: DateTimeFormat.DateTimeMode.MMddHHmm })})`}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                  : null}
                {orderLogistics.refund_note !== ""
                  ? <Box className="flex">
                    <Box className="w-6/12">
                      <Box>退款備註：</Box>
                    </Box>
                    <Box className="w-6/12">
                      <Box>
                        {orderLogistics.refund_note}
                      </Box>
                    </Box>
                  </Box>
                  : null}
              </Box>
            </Box>
          </Box>
        </details>
      </Box>
    </React.Fragment>
  );
};

/** Modal */
const DialogsInner = forwardRef((props, ref) => {
  const { type, message, orderInfo } = props;

  if (type === "accountInfo") {
    return (
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Box>
            <p>收款銀行：{orderInfo.transfer_bank_code_seller} {orderInfo.transfer_bank_name_seller}</p>
          </Box>
          <Box>
            <p>收款帳號：{orderInfo.transfer_account_seller}</p>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (<h1 style={{ margin: "1.5rem" }}>{message}</h1>);
  }
});