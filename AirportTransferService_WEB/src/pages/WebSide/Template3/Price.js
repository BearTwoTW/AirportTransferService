import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { Google, CheckCircleOutline, CheckCircle, Error } from '@mui/icons-material';
import { LineIcon } from '../../../components/CusSvgLibrary';
import { WebInputStandard3 } from '../../../components/WebSide/WebInput';
import { WebTextButton3, WebTextIconButton3 } from '../../../components/WebSide/WebButton';
import { WebCheckboxLabel3, WebCheckboxBasic3 } from '../../../components/WebSide/WebCheckBox';
import { WebDialog3 } from '../../../components/WebSide/WebDialog';
import { CusBackdropLoading } from '../../../components/CusProgressTS';
import { OauthAPI } from '../../../js/APITS';
import { CustomerAPI, OrderAPI } from '../../../js/APITS';
import { imageURL } from '../../../js/Domain';
import { Helmet } from "react-helmet";

export default function Login() {
  const [websiteSetting, setwebsiteSetting] = useState(null);
  const [ICO, setICO] = useState(null)

  return (
    <Box className="container mx-auto">
      <Helmet>
        <link rel="icon" href={ICO ? `${imageURL + ICO.path}` : ""} />
        <title>
          {websiteSetting ? `${websiteSetting.website_name} | 登入` : ""}
        </title>
      </Helmet>
      <Box className="flex justify-center pt-10 pb-2.5 border-b">
        <h1 className="text-[#192F64]">加價服務項目及收費標準</h1>
      </Box>
      <Box className="container mx-auto my-5 space-y-5">
        <Box className="border rounded-lg">

          <Box className="flex max-md:flex-col">
            <Box className="w-3/6 max-md:w-full border-r pb-5 space-y-5">
              <Box className="bg-[#192F64] h-[60px] rounded-tl-lg max-md:rounded-t-lg flex justify-center items-center">
                <h2 className="text-[#FFF] self-center">舒適型</h2>
              </Box>
              <Box className="flex justify-center">
                <h2 className="text-info">台北市</h2>
              </Box>
              <Box className="flex flex-wrap justify-center gap-2.5">
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
              </Box>
              <Box className="flex justify-center">
                <h2 className="text-info">新北市</h2>
              </Box>
              <Box className="flex flex-wrap justify-center gap-2.5">
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
              </Box>
            </Box>
            <Box className="w-3/6 max-md:w-full pb-5 space-y-5">
              <Box className="bg-[#192F64] h-[60px] rounded-tr-lg max-md:rounded-t-lg flex justify-center items-center">
                <h2 className="text-[#FFF] self-center">舒適型</h2>
              </Box>
              <Box className="flex justify-center">
                <h2 className="text-info">台北市</h2>
              </Box>
              <Box className="flex flex-wrap justify-center gap-2.5">
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
              </Box>
              <Box className="flex justify-center">
                <h2 className="text-info">新北市</h2>
              </Box>
              <Box className="flex flex-wrap justify-center gap-2.5">
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="border rounded-lg">
          <Box className="flex max-md:flex-col">
            <Box className="w-3/6 max-md:w-full border-r pb-5 space-y-5">
              <Box className="bg-[#192F64] h-[60px] rounded-tl-lg max-md:rounded-t-lg flex justify-center items-center">
                <h2 className="text-[#FFF] self-center">夜間加成(23:00~05:59)</h2>
              </Box>
              <Box className="flex flex-col justify-center items-center p-10">
                <h1>200 元</h1>
                <h1>夜間計算方式</h1>
                <h1>送機：指定用車時間</h1>
                <h1>接機：航班抵達時間</h1>
              </Box>
            </Box>
            <Box className="w-3/6 max-md:w-full pb-5 space-y-5">
              <Box className="bg-[#192F64] h-[60px] rounded-tr-lg max-md:rounded-t-lg flex justify-center items-center">
                <h2 className="text-[#FFF] self-center">加價服務</h2>
              </Box>
              <Box className="flex flex-wrap justify-center items-center gap-2.5 p-20">
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
                <Box className="bg-[#EEEEEE] text-info p-2 rounded-lg">中正區 $1200</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}





