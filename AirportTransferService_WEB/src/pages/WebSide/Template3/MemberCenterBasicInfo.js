import React, { useRef, useState, useEffect, forwardRef, useContext } from 'react';
import { Box } from '@mui/material';
import { CheckCircle, Error, Google } from '@mui/icons-material';
import { LineIcon, FacebookIcon } from '../../../components/CusSvgLibrary';
import { useNavigate, useLocation } from "react-router-dom";
import { WebTextButton3 } from '../../../components/WebSide/WebButton';
import { WebInputStandard3 } from '../../../components/WebSide/WebInput';
import { WebDatePicker } from '../../../components/WebSide/WebDatePicker';
import { WebOutlinedSelect3 } from '../../../components/WebSide/WebSelect';
import { WebDialog3 } from '../../../components/WebSide/WebDialog';
import { CircularLoading } from '../../../components/CusProgress';
import { NoResults } from '../../../components/CusError';
import { tryCatchError } from '../../../js/Function';
import { imageURL } from '../../../js/Domain';
import { OauthAPI } from '../../../js/APITS';
import { CustomerAPI, DDMenu } from '../../../js/APITS'
import { Helmet } from "react-helmet";
import { OfficeSiteContext } from '../../../store/OfficeSiteContext'
import { QRCode } from 'react-qr-code';

export default function MemberCenterBasicInfo() {
  // 導頁、傳值
  const navigate = useNavigate();
  const location = useLocation();
  const getParams = location.state;

  // 會員資料查詢 
  const [customerSearch, setCustomerSearch] = useState({ customer_id: localStorage.customer_id });
  const [customerData, setCustomerData] = useState({
    dtlCustomer: {
      customer_id: localStorage.customer_id
    },
    updCustomer: {
      customer_id: localStorage.customer_id
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // 修改會員資料的欄位判斷
  const initUpdCheck = {
    email: false,
    mobile_phone: false,
    name: false,
    identity_card: false,
    address: false,
  };
  const [updCheck, setUpdCheck] = useState(initUpdCheck);

  // 下拉選單
  const [options, setOptions] = useState({
    genderOptions: [{ name: "男", value: "001" }, { name: "女", value: "002" }],
    cityOptions: [],
    areaOptions: [],
  });

  // Dialog
  const useDialog = useRef();
  const useDialogInner = useRef();
  const [dialogData, setDialogData] = useState({});
  const [websiteSetting, setwebsiteSetting] = useState(null)
  const [ICO, setICO] = useState(null)
  const OfficeSiteCtx = useContext(OfficeSiteContext)

  /**
   * [查詢]網站設定自訂頁面
   */
  useEffect(() => {
    if (OfficeSiteCtx.officeSite) {
      try {
        setwebsiteSetting(OfficeSiteCtx.officeSite.website_setting)
        setICO(OfficeSiteCtx.officeSite.files.find(ele => ele.type === "ICO"))
      } catch (e) {
        tryCatchError(e)
        console.error("Checkout 查網站設定 錯誤")
      }
    }
  }, [OfficeSiteCtx.officeSite]);

  /**
   * @description 會員資料查詢
   */
  const getCustomerData = () => {
    CustomerAPI.CustomerDetail(customerSearch, true).then(res => {
      if (res.success) {
        setCustomerData(prev => ({
          ...prev,
          dtlCustomer: {
            ...prev.dtlCustomer,
            // 查回來的參數名跟修改的參數名不一樣，所以要重新塞一次
            cl_name: res.data.cl_name,
            email: res.data.customer_email,
            mobile_phone: res.data.customer_mobile_phone,
            name: res.data.customer_name,
            identity_card: res.data.identity_card,
            birthday: res.data.birthday,
            gender: res.data.gender,
            zip_code: res.data.zip_code,
            city: res.data.city,
            area: res.data.area,
            address: res.data.customer_address,
            google_id: res.data.google_id,
            line_id: res.data.line_id,
            accumulation_cunsumption: res.data.accumulation_cunsumption,
            facebook_id: res.data.facebook_id
          }
        }));

        // TODO：為了處理縣市區域的預設值，下方的useEffect可能會造成call兩次api，要在想一下解法
        if (res.data.city && options.cityOptions.length > 0) {
          getAreaOptions(res.data.city, options.cityOptions, "areaOptions");
        }
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getCustomerData();
  }, [customerSearch, options.cityOptions]);

  useEffect(() => {
    /**
     * 初始化下拉選單
     */
    const getOptions = async () => {
      const city = await DDMenu.nestCode("cityareazip");

      setOptions(prev => ({
        ...prev,
        cityOptions: city,
      }));
    };

    getOptions();
  }, []);

  /**
   * 處理區域代碼
   * @param {*} city 選擇的縣市
   * @param {*} options 縣市區域整包下拉選單
   * @param {*} paramOptions options裡面的區域參數
   */
  const getAreaOptions = (city, options, paramOptions) => {
    // 填入所選縣市的區域代碼
    if (city) {
      setOptions(prev => ({
        ...prev,
        [paramOptions]: options.find(o => o.name === city).children
      }));
    }
  };

  /**
   * @description 修改會員資料input
   * @param {*} e 
   */
  const edit_HandleInput = (e) => {
    const { name, value } = e.target;
    const val = value === "" ? null : value;

    setCustomerData(prev => ({
      ...prev,
      updCustomer: {
        ...prev.updCustomer,
        [name]: val
      }
    }));
  };

  /**
   * @description 修改會員資料select
   * @param {*} e 
   */
  const edit_HandleSelect = (e) => {
    const { name, value } = e.target;
    let val = "";

    // 組件回傳的key跟value好像怪怪，先這樣處理
    switch (value) {
      case "男":
        val = "001";
        break;
      case "女":
        val = "002";
        break;
      default:
        val = value;
        break;
    }

    if (name === "city") {
      getAreaOptions(value, options.cityOptions, "areaOptions");
      setCustomerData(prev => ({
        ...prev,
        updCustomer: {
          ...prev.updCustomer,
          city: val,
          area: ""
        }
      }));
    } else if (name === "area") {
      setCustomerData(prev => ({
        ...prev,
        updCustomer: {
          ...prev.updCustomer,
          [name]: val,
          zip_code: options.areaOptions.find(item => item.name === val).code
        }
      }));
    } else {
      setCustomerData(prev => ({
        ...prev,
        updCustomer: {
          ...prev.updCustomer,
          [name]: val
        }
      }));
    }
  };

  /**
   * @description 修改會員資料儲存
   */
  const editCustomer_Confirm = () => {
    const updCheck = {};

    Object.entries(customerData.updCustomer).forEach(([key, value]) => {
      if (value === null || value.includes("*")) {
        updCheck[key] = true;
      } else {
        updCheck[key] = false;
      }
    });

    if (Object.values(updCheck).some(item => item === true)) {
      setUpdCheck(prev => ({
        ...prev,
        ...updCheck
      }));
    } else {
      setUpdCheck(initUpdCheck);

      CustomerAPI.CustomerUpdate(customerData.updCustomer, true).then(res => {
        if (res.success) {
          setCustomerSearch(prev => ({ ...prev }));
        }

        useDialog.current.handleOpen();

        setDialogData(({
          autoClose: true,
          DialogContent: <DialogsInner ref={useDialogInner} message={res.message} />
        }));
      });
    }
  };

  /**
   * @description 執行解綁
   * @param {*} plateform 平台代號
   */
  const UnbindAuth = (plateform) => {
    OauthAPI.Unbind({
      unbindPlateform: plateform,
      customer_id: localStorage.customer_id
    }).then(res => {
      if (res.success) {
        useDialog.current.handleOpen();

        setDialogData(({
          autoClose: true,
          DialogContent: <DialogsInner ref={useDialogInner} message={res.message} />
        }));

        setTimeout(() => {
          setCustomerSearch(prev => ({ ...prev }));
        }, 2000);
      }
    });
  };

  /**
   * @description 綁定第三方帳號
   */
  const bindingAuth_Click = async ({ bind_id, type }) => {
    if (bind_id) {
      if (type === "Google") {
        // alert('Google解除功能尚未完成')
        UnbindAuth("G");
      } else if (type === "LineMessage") {
        // alert('LINE解除功能尚未完成')
        UnbindAuth("L");
      }
    } else {
      if (type === "Google") {
        const res = await OauthAPI.GoogleOAuth();

        if (res.success) {
          window.location.replace(res.data);
        } else {
          setDialogData(({
            autoClose: true,
            DialogContent: <DialogsInner ref={useDialogInner} message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Error className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>{res.message}</span>
              </span>} />,
          }));
        }
      } else if (type === "LineMessage") {
        const res = await OauthAPI.LineOauth();

        if (res.success) {
          window.location.replace(res.data);
        } else {
          setDialogData(({
            autoClose: true,
            DialogContent: <DialogsInner ref={useDialogInner} message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Error className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>{res.message}</span>
              </span>} />,
          }));
        }
      }
    }
  };

  // 判斷第三方導頁回來時，傳遞的參數
  if (getParams) {
    if (getParams.oauth === "G") {
      OauthAPI.GoogleGetAccessToken({
        authCode: getParams.authCode,
        loginType: getParams.loginType
      }).then(res => {
        if (res.success) {
          setDialogData(({
            autoClose: true,
            DialogContent: <DialogsInner ref={useDialogInner} message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <CheckCircle className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>綁定成功</span>
              </span>} />,
          }));

          setCustomerSearch(prev => ({ ...prev }));

          // OauthAPI.combineAccounts({
          //   username: res.customer_name,
          //   oauthemail: res.customer_email,
          //   device_type: res.oauth_type,
          //   device_code: res.device_code
          // }).then(combinRes => {
          //   if (combinRes.success) {
          //     setDialogData(({
          //       autoClose: true,
          //       DialogContent: <DialogsInner ref={useDialogInner} message={
          //         <span style={{ display: "flex", alignItems: "center" }}>
          //           <CheckCircle className={"text-info"} />
          //           <span style={{ marginLeft: "0.5rem" }}>綁定成功</span>
          //         </span>} />,
          //     }));

          //     setCustomerSearch(prev => ({ ...prev }));
          //   } else {
          //     setDialogData(({
          //       autoClose: true,
          //       DialogContent: <DialogsInner ref={useDialogInner} message={
          //         <span style={{ display: "flex", alignItems: "center" }}>
          //           <Error className={"text-info"} />
          //           <span style={{ marginLeft: "0.5rem" }}>綁定失敗</span>
          //         </span>} />,
          //     }));
          //   }
          // });
        } else {
          setDialogData(({
            autoClose: true,
            DialogContent: <DialogsInner ref={useDialogInner} message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Error className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>{res.message}</span>
              </span>} />,
          }));
        }
      });
    } else if (getParams.oauth === "L") {
      OauthAPI.LineGetAccessToken({
        authCode: getParams.authCode,
        loginType: getParams.loginType
      }).then(res => {
        if (res.success) {
          setDialogData(({
            autoClose: true,
            DialogContent: <DialogsInner ref={useDialogInner} message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <CheckCircle className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>綁定成功</span>
              </span>} />,
          }));

          setCustomerSearch(prev => ({ ...prev }));

          // OauthAPI.combineAccounts({
          //   username: res.customer_name,
          //   oauthemail: res.customer_email,
          //   device_type: res.oauth_type,
          //   device_code: res.device_code
          // }).then(combinRes => {
          //   if (combinRes.success) {
          //     setDialogData(({
          //       autoClose: true,
          //       DialogContent: <DialogsInner ref={useDialogInner} message={
          //         <span style={{ display: "flex", alignItems: "center" }}>
          //           <CheckCircle className={"text-info"} />
          //           <span style={{ marginLeft: "0.5rem" }}>綁定成功</span>
          //         </span>} />,
          //     }));

          //     setCustomerSearch(prev => ({ ...prev }));
          //   } else {
          //     setDialogData(({
          //       autoClose: true,
          //       DialogContent: <DialogsInner ref={useDialogInner} message={
          //         <span style={{ display: "flex", alignItems: "center" }}>
          //           <Error className={"text-info"} />
          //           <span style={{ marginLeft: "0.5rem" }}>綁定失敗</span>
          //         </span>} />,
          //     }));
          //   }
          // });
        } else {
          setDialogData(({
            autoClose: true,
            DialogContent: <DialogsInner ref={useDialogInner} message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Error className={"text-info"} />
                <span style={{ marginLeft: "0.5rem" }}>{res.message}</span>
              </span>} />,
          }));
        }
      });
    }
  }

  let data = {
    ...customerData.dtlCustomer,
    ...customerData.updCustomer
  };

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={ICO ? `${imageURL + ICO.path}` : ""} />
        <title>
          {websiteSetting ? `${websiteSetting.website_name} | 會員中心` : ""}
        </title>
      </Helmet>
      <Box className="title">
        <Box className="titleBlock"></Box>
        <p>基本資料</p>
      </Box>
      {!isLoading
        ? customerData !== null
          ? <React.Fragment>
            <Box className="p-2.5">
              <h3>會員QR Code</h3>
              <Box className="flex max-sm:justify-center max-md:flex-wrap mt-5">
                <Box className="flex flex-col max-md:w-1/2 p-2.5">
                  <QRCode
                    size={128}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={data.customer_id}
                    viewBox={`0 0 256 256`}
                  />
                  <label htmlFor="customer_id" className="input_label text-center">{data.customer_id}</label>
                </Box>
              </Box>
            </Box>
            <Box className="p-2.5">
              <h3>會員等級</h3>
              <Box className="flex max-md:flex-wrap">
                <Box className="flex flex-col w-3/6 max-md:w-full p-2.5">
                  <label htmlFor="cl_name" className="input_label">{data.cl_name === "" ? "查無會員等級" : data.cl_name}</label>
                </Box>
              </Box>
            </Box>
            <Box className="p-2.5">
              <h3>累積消費</h3>
              <Box className="flex max-md:flex-wrap">
                <Box className="flex flex-col w-3/6 max-md:w-full p-2.5">
                  <label htmlFor="accumulation_cunsumption" className="input_label dollarSign">
                    {data.accumulation_cunsumption > 0 ? data.accumulation_cunsumption.toLocaleString("en-US") : 0}
                  </label>
                </Box>
              </Box>
            </Box>
            <Box className="p-2.5">
              <h3>我的帳號</h3>
              <Box className="flex max-md:flex-wrap">
                <Box className="flex flex-col w-3/6 max-md:w-full p-2.5">
                  <label htmlFor="e-mail" className="input_label">電子信箱</label>
                  <WebInputStandard3
                    type={"text"}
                    name={"email"}
                    value={data.email}
                    error={updCheck.email}
                    helperText={updCheck.email ? "請重新輸入正確的電子信箱" : ""}
                    placeholder={"請輸入電子信箱"}
                    onChangeEvent={(e) => edit_HandleInput(e)}
                  />
                </Box>
                <Box className="flex flex-col w-3/6 max-md:w-full p-2.5">
                  <label htmlFor="phone" className="input_label">手機號碼</label>
                  <WebInputStandard3
                    type={"text"}
                    name={"mobile_phone"}
                    value={data.mobile_phone}
                    error={updCheck.mobile_phone}
                    helperText={updCheck.mobile_phone ? "請重新輸入正確的手機號碼" : ""}
                    placeholder={"請輸入手機號碼"}
                    onChangeEvent={(e) => edit_HandleInput(e)}
                  />
                </Box>
              </Box>
            </Box>
            <Box className="p-2.5">
              <h3>個人資訊</h3>
              <Box className="flex max-md:flex-wrap">
                <Box className="flex flex-col w-3/6 max-md:w-full p-2.5">
                  <label htmlFor="name" className="input_label">姓名</label>
                  <WebInputStandard3
                    type={"text"}
                    name={"name"}
                    value={data.name}
                    error={updCheck.name}
                    helperText={updCheck.name ? "請重新輸入正確的姓名" : ""}
                    placeholder={"請輸入姓名"}
                    onChangeEvent={(e) => edit_HandleInput(e)}
                  />
                </Box>
                {/* <Box className="flex flex-col w-3/6 max-md:w-full p-2.5">
                  <label htmlFor="id" className="input_label">身分證字號</label>
                  <WebInputStandard3
                    type={"text"}
                    name={"identity_card"}
                    value={data.identity_card}
                    error={updCheck.identity_card}
                    helperText={updCheck.identity_card ? "請重新輸入正確的身分證字號" : ""}
                    placeholder={"請輸入身分證字號"}
                    onChangeEvent={(e) => edit_HandleInput(e)}
                  />
                </Box> */}
              </Box>
              <Box className="flex max-md:flex-wrap">
                <Box className="flex w-3/6 max-md:w-full p-2.5 space-x-2.5">
                  <Box className="w-6/12 flex flex-col">
                    <label className="input_label">生日</label>
                    <WebDatePicker
                      name={"birthday"}
                      value={data.birthday}
                      placeholder={"生日"}
                      onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                  </Box>
                  <Box className="w-6/12 flex flex-col">
                    <label className="input_label">性別</label>
                    <WebOutlinedSelect3
                      name={"gender"}
                      label={"性別"}
                      options={options.genderOptions}
                      optionKey={"value"}
                      value={options.genderOptions.some(item => item.value === data.gender)
                        ? options.genderOptions.find(item => item.value === data.gender).name : ""}
                      onChangeEvent={(e) => edit_HandleSelect(e)}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="flex">
                <Box className="flex flex-col w-3/6 max-md:w-full p-2.5">
                  <label htmlFor="contact-address" className="input_label">聯絡地址</label>
                  <Box className="flex justify-between space-x-2.5">
                    <Box className="w-4/12">
                      <WebInputStandard3
                        disabled
                        type={"text"}
                        name={"zip_code"}
                        value={data.zip_code !== "" ? data.zip_code : customerData.updCustomer.zip_code}
                        placeholder={"郵遞區號"}
                      // onChangeEvent={(e) => edit_HandleInput(e)}
                      />
                    </Box>
                    <Box className="w-4/12 flex flex-col">
                      <WebOutlinedSelect3
                        name={"city"}
                        label={"請選擇城市"}
                        options={options.cityOptions}
                        optionKey={"name"}
                        value={options.cityOptions.length > 0 ? data.city : ""}
                        onChangeEvent={(e) => edit_HandleSelect(e)}
                      />
                    </Box>
                    <Box className="w-4/12 flex flex-col">
                      <WebOutlinedSelect3
                        name={"area"}
                        label={"請選擇區域"}
                        options={options.areaOptions}
                        optionKey={"name"}
                        value={options.areaOptions.length > 0 ? data.area : ""}
                        onChangeEvent={(e) => edit_HandleSelect(e)}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <WebInputStandard3
                      type={"text"}
                      name={"address"}
                      value={data.address}
                      error={updCheck.address}
                      helperText={updCheck.address ? "請重新輸入正確的地址" : ""}
                      placeholder={"請輸入地址"}
                      onChangeEvent={(e) => edit_HandleInput(e)}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="w-full flex justify-end">
                <WebTextButton3
                  fullWidth={false}
                  size={"medium"}
                  color={"primary"}
                  text={"儲存"}
                  onClick={editCustomer_Confirm}
                />
              </Box>
            </Box>
          </React.Fragment>
          : <NoResults />
        : <CircularLoading />}
      {/** 瑞達用不到，第三方綁定先註解 */}
      {/* <Box className="p-2.5">
        <h3>第三方綁定</h3>
        <Box className="w-full flex justify-start max-md:flex-col p-2.5 md:space-x-20">
          <button
            onClick={() => bindingAuth_Click({ bind_id: customerData.dtlCustomer.google_id, type: "Google" })}
            className="w-3/12 max-md:w-full flex justify-between items-center border border-light-gray bg-light-gray-100 rounded-md p-2.5 max-md:mb-2.5"
          >
            <Box className="flex items-center space-x-2.5">
              <Google className={"fill-info"} />
              <h4>Google</h4>
            </Box>
            <h3>{customerData.dtlCustomer.google_id ? "解除" : "綁定"}</h3>
          </button>
          <button
            onClick={() => bindingAuth_Click({ bind_id: customerData.dtlCustomer.line_id, type: "LineMessage" })}
            className="w-3/12 max-md:w-full flex justify-between items-center border border-light-gray bg-light-gray-100 rounded-md p-2.5 max-md:mb-2.5"
          >
            <Box className="flex items-center space-x-2.5">
              <LineIcon className={"w-6 fill-info"} />
              <h4>LINE</h4>
            </Box>
            <h3>{customerData.dtlCustomer.line_id ? "解除" : "綁定"}</h3>
          </button>
        </Box>
      </Box> */}
      <WebDialog3 ref={useDialog} info={dialogData} />
    </React.Fragment>
  );
};

const DialogsInner = forwardRef((props, ref) => {
  const { message } = props;

  return (<h3 style={{ margin: "1.5rem" }}>{message}</h3>);
});