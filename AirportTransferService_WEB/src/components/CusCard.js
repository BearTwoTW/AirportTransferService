import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Add, OpenInNew, Check, ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { Button, Grid, Box, Card, CardHeader, CardContent, IconButton, Typography, Chip } from '@mui/material';
import { CusIconButton, CusTextButton } from '../components/CusButton';
import { CusChip } from '../components/CusChip';
import { CusJsBarcode } from '../components/CusBarcode';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

// IconButton 樣式
const buttonSX = {
  margin: "0.6rem 0.5rem 0.6rem 0.5rem",
  width: "29px",
  height: "29px",
  color: "white",
  position: "absolute",
  top: "0",
  right: "0",
}

/**
 * @description
 * @param {string} content  卡片內容
 */

const CusCard = (props) => {
  const { spacing, content } = props;
  return (
    <React.Fragment>
      <Card style={props.style} sx={{ padding: "20px", backgroundColor: "#FFFFFF", boxShadow: "none", animation: "fade .5s ease-in-out forwards" }}>
        <Grid container spacing={spacing}>
          {content}
        </Grid>
      </Card >
    </React.Fragment >
  )
}

CusCard.defaultProps = {
  content: "",
};
CusCard.prototype = {
  content: PropTypes.string,
};

/**
 * @description
 * @param {string} title  卡片標題
 * @param {string} content  卡片內容 
 * @param {string} button  標題右側按鈕
 */

const CusHeaderCard = (props) => {
  const { title, content, button, onClick } = props;
  return (
    <React.Fragment>
      <Card sx={{ margin: "20px 0" }}>
        <CardHeader
          sx={{ backgroundColor: Variables[status + "__Secondary"], color: "white", textAlign: 'center', padding: "0" }}
          titleTypographyProps={{ variant: "body1" }}
          title={
            <React.Fragment>
              <Box sx={{ position: "relative", height: "43px" }}>
                <Typography sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>{title}</Typography>
                {button ?
                  <IconButton sx={buttonSX} onClick={onClick}>
                    <Add />
                  </IconButton>
                  : null}
              </Box>
            </React.Fragment>
          }
        />
        <CardContent>
          {content}
        </CardContent >
      </Card >
    </React.Fragment >
  )
}

CusHeaderCard.defaultProps = {
  title: "",
  content: "",
  button: false,
};
CusHeaderCard.prototype = {
  title: PropTypes.string,
  content: PropTypes.string,
  disabled: PropTypes.bool,
};

/**
 * @description
 * @param {string} label1  第一欄標題
 * @param {string} content1  第一欄內容 
 * @param {string} label2  第二欄標題
 * @param {string} content2  第二欄內容
 * @param {string} color Chip 狀態顏色
 */

const CusSmallCard = (props) => {
  const { label1, content1, label2, content2, color, onClick } = props;
  const { enqueueSnackbar } = useSnackbar();
  /**
   * @description [事件]複製編號
   */
  const copy_Click = useCallback(({ e, id }) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      enqueueSnackbar("複製編號成功", {
        variant: "success",
        persist: false,
      });
    })
  }, [])

  return (
    <React.Fragment>
      <Box sx={{ margin: "0.6rem 0 0.6rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "10px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
          <Grid container>
            <Typography variant="subtitle1" fontWeight={"bold"}>{label1 + ": "}</Typography>
            <Button sx={{ padding: "0 5px", borderRadius: "10px" }} onClick={(e) => copy_Click({ e: e, id: content1 })}>
              <Typography variant="subtitle1" sx={{ color: Variables[status + "__BtnInfo"] }}>{content1}</Typography>
            </Button>
          </Grid>
          <Grid container alignItems={"center"}>
            <Typography variant="subtitle1" fontWeight={"bold"}> {label2 + ": "}</Typography>
            <CusChip label={content2} color={color} />
          </Grid>
        </Box>
        <CusIconButton
          color='secondary'
          icon={<OpenInNew />}
          onClick={onClick}
        />
      </Box>
    </React.Fragment >
  )
}

CusSmallCard.defaultProps = {
  label1: "",
  content1: "",
  label2: "",
  content2: "",
  color: "",
};
CusSmallCard.prototype = {
  label1: PropTypes.string,
  content1: PropTypes.string,
  label2: PropTypes.string,
  content2: PropTypes.string,
  color: PropTypes.string,
};

/**
 * @description
 * @param {string} label  第一欄標題
 * @param {bool}    array        ex: ["kkkkeeeddd", "jdjdjdjdd", "so3jejfjjs"]
 * @param {bool}    format       barcode類型
 * @param {string}  renderer     呈現形式 svg|canvas|img
 * @param {func}    width        寬度1-4
 * @param {object}  height       長度10-150
 * @param {object}  textAlign    文字置中left|center|right
 * @param {string}  textPosition 文字定位
 * @param {string}  textMargin   
 * @param {string}  fontSize     文字大小8-36
 * @param {string}  background   背景顏色
 * @param {string}  lineColor    條碼顏色
 * @param {string}  breakBr      是否斷行
 * @param {string}  targetBlank  是否另開頁面(另開頁面html標籤存在localStorage)
 * @param {string}  margin       
 * @param {string}  marginBottom 
 */

const CusBarCodeCard = (props) => {
  const { label, barCodeId, format, renderer, width, height, textAlign, textPosition, textMargin,
    fontSize, background, lineColor, breakBr, targetBlank, margin, marginBottom, onClick } = props;

  return (
    <React.Fragment>
      <Box
        sx={{
          margin: "0.6rem 0 0.6rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: "10px"
        }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
          <Typography variant="h6" fontWeight={"bold"}>{label}</Typography>
          <Box>
            <CusJsBarcode
              array={barCodeId}
              format={format}
              renderer={renderer}
              width={width}
              height={height}
              textAlign={textAlign}
              textPosition={textPosition}
              textMargin={textMargin}
              fontSize={fontSize}
              background={background}
              lineColor={lineColor}
              breakBr={breakBr}
              margin={margin}
              targetBlank={true}
              displayValue={false}
              marginBottom={marginBottom} />
          </Box>
        </Box>
        <Box>
          <CusIconButton
            color='secondary'
            icon={<Check />}
            onClick={onClick}
          />
        </Box>
      </Box>
    </React.Fragment >
  )
}

CusBarCodeCard.defaultProps = {
  label1: "",
  content1: "",
  label2: "",
  content2: "",
  color: "",
};
CusBarCodeCard.prototype = {
  label1: PropTypes.string,
  content1: PropTypes.string,
  label2: PropTypes.string,
  content2: PropTypes.string,
  color: PropTypes.string,
};

/**
 * @description
 * @param {string}  title  左上大標題
 * @param {string}  title2  右下小標題
 * @param {string}  icon  右上 icon
 * @param {string}  value  左下數字
 * @param {string}  value2  右下數字
 */

const CusDashboardCard = (props) => {
  const { title, title2, icon, value, value2 } = props;
  return (
    <React.Fragment>
      <Card style={props.style} sx={{ padding: "20px", backgroundColor: "#FFFFFF", boxShadow: "none", animation: "fade .5s ease-in-out forwards" }}>
        <Box display={"flex"}>
          <Typography variant="h6" fontWeight={"bold"} width={"100%"}>{title}</Typography>
          {icon}
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-end"} flexWrap={"wrap"}>
          <Typography variant="h4" color={"secondary"} fontWeight={"bold"}>{value}</Typography>
          {value2 ?
            <Box display={"flex"} alignItems={"flex-end"} gap={1}>
              <Box display={"flex"} alignItems={"center"}>
                {value2 >= 0 ? <ArrowDropUp color={"success"} /> : <ArrowDropDown color={"error"} />}
                <Typography variant="h6" color={value2 >= 0 ? Variables[status + "__BtnSuccess"] : "error"} fontWeight={"bold"}>{String(value2).replace(/[+-]/g, '')}%</Typography>
              </Box>
              <Typography variant="subtitle1">{title2}</Typography>
            </Box>
            : null}
        </Box>
      </Card >
    </React.Fragment >
  )
}

CusDashboardCard.defaultProps = {
  title: "",
  title2: "",
  icon: "",
  value: "",
  value2: "",
};
CusDashboardCard.prototype = {
  title: PropTypes.string,
  title2: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.number,
  value2: PropTypes.number,
};

const CusListCard = (props) => {
  const { title, title2, src, color, data } = props;
  const { enqueueSnackbar } = useSnackbar();

  /**[事件]複製編號*/
  const copy_Click = useCallback(({ e, id }) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      enqueueSnackbar("複製編號成功", {
        variant: "success",
        persist: false,
      });
    })
  }, [])

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          padding: '10px 20px',
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
          '&::before': { // 左側色塊
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: "10px",
            backgroundColor: color === "primary" ? Variables[status + "__Primary"] :
              color === "secondary" ? Variables[status + "__Secondary"] :
                color === "info" ? Variables[status + "__BtnInfo"] :
                  color === "success" ? Variables[status + "__BtnSuccess"] :
                    color === "warning" ? Variables[status + "__BtnWarning"] :
                      color === "error" ? Variables[status + "__BtnError"] : Variables[status + "__Default"],
          }
        }}>
        <Box display={"flex"} alignItems={"center"} gap={2} flexGrow={1}>
          {src ?
            <Box sx={{ width: "50px", height: "50px" }}>
              <img style={{ borderRadius: "10px", objectFit: "cover", width: "100%", height: "100%" }} src={src} alt={title} />
            </Box>
            : null}
          <Box flex={"1 1 0%"}>
            <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
              <Typography variant="h6" fontWeight={"bold"} sx={{ marginRight: "10px" }}>{title}</Typography>
              <Button sx={{ padding: "0", borderRadius: "10px" }} onClick={(e) => copy_Click({ e: e, id: title2 })}>
                <Typography variant="subtitle1" sx={{ color: Variables[status + "__BtnInfo"] }}>{title2}</Typography>
              </Button>
            </Box>
            {data ?
              <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                {data.map((item, index) => {
                  return (
                    <Typography variant="subtitle1">{item}</Typography>
                  )
                })}
              </Box>
              : null}
          </Box>
        </Box>
      </Box>
    </React.Fragment >
  )
}

export {
  CusCard,
  CusHeaderCard,
  CusSmallCard,
  CusBarCodeCard,
  CusDashboardCard,
  CusListCard
};