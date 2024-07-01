import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-material-ui-carousel'
import { WebCommodityCard3 } from '../../../components/WebSide/WebCard';
import { WebTextIconButton3 } from '../../../components/WebSide/WebButton';
import { useNavigate } from "react-router-dom";
import { imageURL } from '../../../js/Domain';
import { OfficeSiteContext } from '../../../store/OfficeSiteContext'
import { Box } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { CustomerAPI } from '../../../js/APITS';
import { Helmet } from "react-helmet";
import fakeimg from '../../../images/FakeImages/fakeimg.png';
import { tryCatchError } from '../../../js/FunctionTS';
import Pagination from '@mui/material/Pagination';
import { isTest } from '../../../js/DomainTS';

export default function Index() {
  const navigate = useNavigate();
  const [websiteSetting, setwebsiteSetting] = useState(null)
  const [ICO, setICO] = useState(null)

  /**
   * 預約及車資計算跳轉
   */
  const reserve_Click = ({ type }) => {
    navigate(`/Reserve?type=${type}`)
  };

  return (
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={ICO ? `${imageURL + ICO.path}` : ""} />
        <title>
          {websiteSetting ? `${websiteSetting.website_name} | 首頁` : ""}
        </title>

      </Helmet>
      <Box className="flex max-lg:flex-col">
        <Box className="lg:flex-1 max-lg:w-full">
          <Box className="">
            <img className="w-full h-[600px] object-cover" src="https://fakeimg.pl/1520x600/?text=img"></img>
          </Box>
        </Box>
        <Box className="p-5 w-[400px] max-lg:w-full flex lg:flex-col lg:space-y-5 max-lg:space-x-5">
          <Box className="bg-[#3F7C38] hover:opacity-80 flex flex-col justify-center items-center w-full h-full rounded-lg space-y-2.5 max-lg:h-[200px] p-2.5 cursor-pointer" onClick={() => reserve_Click({ type: "go" })}>
            <FlightTakeoffIcon className="text-[#FFF]" fontSize='large' />
            <h1 className="text-[#FFF] font-bold max-md:hidden">預約送機/前往機場</h1>
            <h3 className="text-[#FFF] font-bold md:hidden">預約送機/前往機場</h3>
          </Box>
          <Box className="bg-[#EE732A] hover:opacity-80 flex flex-col justify-center items-center w-full h-full rounded-lg space-y-2.5 max-lg:h-[200px] p-2.5 cursor-pointer" onClick={() => reserve_Click({ type: "leave" })}>
            <FlightLandIcon className="text-[#FFF]" fontSize='large' />
            <h1 className="text-[#FFF] font-bold max-md:hidden">預約接機/離開機場</h1>
            <h3 className="text-[#FFF] font-bold md:hidden">預約接機/離開機場</h3>
          </Box>
        </Box>
      </Box>
      <Box className="object-cover">
        <img className="w-full h-[420px] object-cover" src="https://fakeimg.pl/1920x420/?text=img"></img>
      </Box>
      <Box className="flex flex-col space-y-5">
        <Box className="object-cover">
          <img className="w-full h-[420px] object-cover" src="https://fakeimg.pl/1920x420/?text=img"></img>
        </Box>
        <Box className="container mx-auto p-5">
          <WebTextIconButton3
            className={"h-20"}
            fullWidth={true}
            size={"medium"}
            color={"primary"}
            text={"立即預約"}
            onClick={() => reserve_Click({ type: "go" })} />
        </Box>
      </Box>
      <Box className="relative mt-5">
        <Box className="object-cover">
          <img className="w-full h-[420px] object-cover" src="https://fakeimg.pl/1920x420/?text=img"></img>
        </Box>
        <Box className="absolute inset-0 flex items-center justify-center">
          <Box className="w-3/6 max-md:w-4/6">
            <h3>注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項</h3>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
};