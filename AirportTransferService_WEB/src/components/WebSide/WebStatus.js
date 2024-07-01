import { Box } from '@mui/material';
import { DateTimeFormate } from '../../js/Function';

/** 官網進度條
 * @param {string} title 進度狀態
 * @param {string} thisStatusTime 當前狀態的時間
 * @param {string} nextStatusTime 下一個狀態的時間
 */
export const WebStatus = (props) => {
    const { statusData } = props;

    return (
        <>
            {/** 橫向 */}
            <Box className="max-md:hidden">
                <Box className="flex items-center py-5 w-[1000px]">
                    {statusData.map((item, index) => (
                        <Box key={index} className="h-10 flex flex-col">
                            <Box className="flex items-center">
                                <Box className={`w-4 h-4 ${item.thisStatusTime ? "bg-info" : "bg-light-gray"} rounded-full`}></Box>
                                {statusData.length === index + 1
                                    ? null
                                    : <Box className={`w-40 h-1 ${item.nextStatusTime ? "bg-info" : "bg-light-gray"} rounded-full mx-1`}></Box>}
                            </Box>
                            <Box className={`flex flex-col ${item.thisStatusTime ? "text-info" : "text-light-gray"} my-1 text-sm`}>
                                <span>{item.title}</span>
                                {item.thisStatusTime
                                    ? <span>{DateTimeFormate.DateTimeToString({ date: item.thisStatusTime, Mode: "MMddHHmm" })}</span>
                                    : null}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/** 直向 */}
            <Box className="md:hidden">
                <Box className="flex flex-col py-5">
                    {statusData.map((item, index) => (
                        <Box key={index} className="h-18 flex space-x-2.5">
                            <Box className="flex flex-col items-center mt-1 space-y-1">
                                <Box className={`w-4 h-4 ${item.thisStatusTime ? "bg-info" : "bg-light-gray"} rounded-full`}></Box>
                                {statusData.length === index + 1
                                    ? null
                                    : <Box className={`w-1 h-14 ${item.nextStatusTime ? "bg-info" : "bg-light-gray"} rounded-full`}></Box>}
                            </Box>
                            <Box className={`flex flex-col ${item.thisStatusTime ? "text-info" : "text-light-gray"} text-sm`}>
                                <span>{item.title}</span>
                                {item.thisStatusTime
                                    ? <span>{DateTimeFormate.DateTimeToString({ date: item.thisStatusTime, Mode: "MMddHHmm" })}</span>
                                    : null}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};