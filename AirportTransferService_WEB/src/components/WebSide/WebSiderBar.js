import React, { useRef, useState, useEffect, forwardRef, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom"
//mui
import { Box, Drawer, Divider, Grid, Collapse, Typography } from '@mui/material';
import { PersonOutlineOutlined, HowToRegRounded, Language, PaidOutlined, CheckCircle } from '@mui/icons-material';
import { ArrowForwardIosSlenderOutlined, ArrowForwardIosSlenderTopOutlined, InstagramIcon, LineIcon, FacebookIcon, DelOutlined, ShoppingCartOutlined, ArrowForwardIosSlenderDownOutlined } from '../CusSvgLibrary';
import { createTheme } from "@mui/material/styles";
import { CusThemeTS } from '../../CustomThemeTS';
import { WebDialog3 } from '../../components/WebSide/WebDialog';
import { WebFooter3 } from "../WebSide/WebFooter";
import { WebNavigation3 } from '../WebSide/WebNavigation';
import { WebIconButton3, WebTextIconButton3, WebTextButton3 } from '../WebSide/WebButton';
import { CustomerAPI, OrderAPI } from '../../js/APITS';
import { imageURL } from '../../js/Domain';
import { ShoppingCarContextProvider } from '../../store/ShoppingCarContext'
import { OfficeSiteContext } from '../../store/OfficeSiteContext'
import { localStorageClear } from '../../js/Function';
import { get_ECC_indexedDB_factory, tryCatchError } from '../../js/FunctionTS';
import { useMediaQuery, useTheme } from '@mui/material';
import fakeimg from '../../images/FakeImages/fakeimg.png';

const theme = createTheme(CusThemeTS.defaultTheme);
const drawerWidthLeft = parseInt(theme.components.MuiDrawer.styleOverrides.root[`&.WebDrawer3`][`&.left`].width);
const drawerWidthTop = parseInt(theme.components.MuiDrawer.styleOverrides.root[`&.WebDrawer3`][`&.top`].width);
/**
 * Web 用 Sidebar
 * @param 版面-3
 * @desc 至最上層，可選左右顯示
 */
export const WebSwipeableSideBar3 = () => {
    const OfficeSiteCtx = useContext(OfficeSiteContext)
    let anchorArr = ['left', 'top']
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const targetRef = useRef(null);
    const [indexDB, setIndexDB] = useState(null);
    const useDialog = useRef();
    const useDialogInner = useRef();
    const [dialogData, setDialogData] = useState({});
    const [delCartConfirm, setDelCartConfirm] = useState(false);
    const [shoppingCar, setShoppingCar] = useState([]);
    const [commodityLabel, setCommodityLabel] = useState([]);
    const [state, setState] = useState({
        left: false,
        top: false,
    });
    const [initDB, setInitDB] = useState(false);
    const initDBRef = useRef(initDB);
    initDBRef.current = initDB;

    const isLg = useMediaQuery(theme.breakpoints.down('lg')); // 斷點判斷用
    const drawerPosition = isLg ? "0" : "-245px"; // 購物車滑出時的left距離

    const [officeSiteSetting, setOfficeSiteSetting] = useState(null)


    /**[事件] 打開SideBar*/
    const onSideBarOpen = (anchor) => {
        setState(prevAnchor => ({ ...prevAnchor, [anchor]: true }))
    }

    /**[事件] 關閉SideBar */
    const onSideBarClose = async (anchor) => {
        setState(prevAnchor => ({ ...prevAnchor, [anchor]: false }))
    }

    /**
     * 預約及車資計算跳轉
     */
    const reserve_Click = ({ type }) => {
        navigate(`/Reserve?type=${type}`)
    };

    // sideBar 目錄分類
    const LabelList = () => (
        <Box
            sx={{ width: drawerWidthLeft, overflow: 'auto' }}
            role="presentation">
            <Box className={"flex flex-col w-[350px] h-full bg-white shadow-lg space-y-10 overflow-y-auto pb-[130px]"}>
                <Grid className="w-full p-5 flex justify-end">
                    <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
                        onClick={() => onSideBarClose("left")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={"w-6 h-6"}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </Grid>
                <Box className={"flex-1 p-10"}>
                    <Box className="flex flex-col space-y-10 text-info font-bold">
                        <a className="cursor-pointer hover:opacity-80" onClick={() => navigate("/Index")}>首頁</a>
                        <a href="/index#target" className="cursor-pointer hover:opacity-80">預約流程</a>
                        <a className="cursor-pointer hover:opacity-80" onClick={() => navigate("/Price")}>加價服務</a>
                        <a className="cursor-pointer hover:opacity-80" onClick={() => reserve_Click({ type: "go" })}>預約及車資計算</a>
                    </Box>
                </Box>
            </Box>
        </Box >
    );

    return (
        <React.Fragment>
            <WebNavigation3
                onSideBarOpen={onSideBarOpen}
                shoppingCar={shoppingCar.length}
                officeSiteSetting={officeSiteSetting}
            />
            {anchorArr.map((ele, inx) => (
                <Drawer
                    className={`WebDrawer3 ${ele}`}
                    PaperProps={{
                        style: {
                            position: "absolute",
                            left: ele === "left" ? "0" : drawerPosition
                        },
                    }}
                    key={inx}
                    anchor={ele}
                    open={state[ele]}
                    onClose={() => onSideBarClose(ele)}>
                    {ele === "left" ? LabelList(ele) : null}
                </Drawer>
            ))}
            <ShoppingCarContextProvider
                shoppingCar={shoppingCar}
                setDelCartConfirm={setDelCartConfirm}
                localStorageClear={localStorageClear}>
                <Box sx={{ mt: "96px", animation: "fade 1s ease", backgroundColor: "#f1f2f6" }}>
                    <Outlet />
                </Box>
            </ShoppingCarContextProvider>
            <WebFooter3 officeSiteSetting={officeSiteSetting} />
            <WebDialog3 ref={useDialog} info={dialogData} />
        </React.Fragment >
    )
}

/**
 * @description [內容]Dialog
 */
const DialogsInner = forwardRef((props, ref) => {
    let { type, message } = props
    return (<h3 style={{ margin: "1.5rem" }}>{message}</h3>)
});

/**
 * Web 分類用
 * @param 版面-3
 */
export const WebCommdityLabelSideBar3 = (props) => {
    const { resData, searchClick } = props
    const [bigCollapseStates, setBigCollapseStates] = useState({});
    const [midCollapseStates, setMidCollapseStates] = useState({});

    /**
     * @description [事件] 大分類 Collapse開關
     */
    const handleBigCollapseOpen = (pageId) => {
        setBigCollapseStates((prevOpenStates) => ({
            ...prevOpenStates,
            [pageId]: !prevOpenStates[pageId],
        }));
    }

    /**
     * @description [事件] 中分類 Collapse開關
     */
    const handleMidCollapseOpen = (pageId) => {
        setMidCollapseStates((prevOpenStates) => ({
            ...prevOpenStates,
            [pageId]: !prevOpenStates[pageId],
        }));
    }

    // collapse 預設全部打開
    return (
        <React.Fragment>
            <ul className="text-info">
                {/* 大分類 */}
                {resData.map(big_item => {
                    let big_isOpen = !bigCollapseStates[big_item.cl_id];
                    return (
                        <li className="py-2.5" key={big_item.cl_id}>
                            <Box className="group">
                                <Box className="flex justify-between items-center cursor-pointer list-none">
                                    <a className="w-full font-medium hover:opacity-60" onClick={() => searchClick({ b_id: big_item.cl_id })}>{big_item.content}</a>
                                    {big_item.child.length > 0 ?
                                        <span onClick={() => handleBigCollapseOpen(big_item.cl_id)}>
                                            <ArrowForwardIosSlenderDownOutlined className={`w-4 transition ${big_isOpen ? "rotate-0" : ""}`} />
                                        </span> : null}
                                </Box>
                                {/* 中分類 */}
                                {big_item.child.length > 0 ?
                                    <Collapse in={big_isOpen} timeout="auto" unmountOnExit>
                                        <Box className="pt-2.5 pb-5 pl-2.5 space-y-2.5">
                                            {big_item.child.slice(0, 5).map(mid_item => (
                                                <Box key={mid_item.cl_id} className="flex flex-col">
                                                    <Box className="flex justify-between items-center cursor-pointer list-none">
                                                        <a key={mid_item.cl_id} className="w-full text-sm font-medium hover:opacity-60" onClick={() => searchClick({ b_id: big_item.cl_id, m_id: mid_item.cl_id })}>{mid_item.content}</a>
                                                        {mid_item.child.length > 0 ?
                                                            <span onClick={() => handleMidCollapseOpen(mid_item.cl_id)}>
                                                                <ArrowForwardIosSlenderDownOutlined className={`w-4 transition ${!midCollapseStates[mid_item.cl_id] ? "rotate-0" : ""}`} />
                                                            </span> : null}
                                                    </Box>
                                                    {mid_item.child.length > 0 ?
                                                        <Collapse in={!midCollapseStates[mid_item.cl_id]} timeout="auto" unmountOnExit>
                                                            <Box className="pt-2.5 pb-5 pl-2.5 space-y-2.5">
                                                                {mid_item.child.map(small_item => (
                                                                    <a key={small_item.cl_id} onClick={() => searchClick({ b_id: big_item.cl_id, m_id: mid_item.cl_id, s_id: small_item.cl_id })} className="block text-sm cursor-pointer hover:opacity-60">
                                                                        {small_item.content}
                                                                    </a>
                                                                ))}
                                                            </Box>
                                                        </Collapse>
                                                        : null}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Collapse> : null}
                            </Box>
                        </li>
                    )
                })}
            </ul>
        </React.Fragment >
    )
}