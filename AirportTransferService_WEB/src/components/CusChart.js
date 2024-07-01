import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, LineChart, PieChart, ResponsiveChartContainer, LinePlot, BarPlot, ChartsXAxis, ChartsYAxis, axisClasses, ChartsTooltip, ChartsGrid, MarkPlot } from '@mui/x-charts';

/**折線圖
 * @description
 * @param {string} width  圖表寬度
 * @param {string} height 圖表高度
 * @param {string} title  標題
 * @param {string} value  報表數字
 * @param {string} xAxis  X軸內容
 * @param {string} yAxis  Y軸內容
 * @param {string} series 報表內容
 */

const CusLineChart = (props) => {
  const { width, height, title, value, xAxis, yAxis, series } = props;
  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" fontWeight={"bold"} width={"100%"}>{title}</Typography>
        <Typography variant="h4" color={"secondary"} fontWeight={"bold"} width={"100%"}>{value ? value.toLocaleString('en-US') : null}</Typography>
        <LineChart
          width={width}
          height={height}
          grid={{ vertical: true, horizontal: true }}
          xAxis={xAxis}
          yAxis={yAxis}
          series={series}
        />
      </Box>
    </React.Fragment >
  )
}

/**垂直柱狀圖
 * @description
 * @param {string} width  圖表寬度
 * @param {string} height 圖表高度
 * @param {string} title  標題
 * @param {string} value  報表數字
 * @param {string} xAxis  X軸內容
 * @param {string} yAxis  Y軸內容
 * @param {string} series 報表內容
 */

const CusBarChart = (props) => {
  const { width, height, title, value, xAxis, yAxis, series } = props;
  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" fontWeight={"bold"} width={"100%"}>{title}</Typography>
        <Typography variant="h4" color={"secondary"} fontWeight={"bold"} width={"100%"}>{value ? value.toLocaleString('en-US') : null}</Typography>
        <BarChart
          width={width}
          height={height}
          grid={{ vertical: true, horizontal: true }}
          xAxis={xAxis}
          yAxis={yAxis}
          series={series}
        />
      </Box>
    </React.Fragment >
  )
}

/**圓餅圖
 * @description
 * @param {string} width  圖表寬度
 * @param {string} height 圖表高度
 * @param {string} title  標題
 * @param {string} value  報表數字
 * @param {string} series 報表內容
 */

const CusPieChart = (props) => {
  const { width, height, title, series } = props;
  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" fontWeight={"bold"} width={"100%"}>{title}</Typography>
        <PieChart
          width={width}
          height={height}
          series={series}
        />
      </Box>
    </React.Fragment >
  )
}

/**折線&垂直柱狀圖
 * @description
 * @param {string} width  圖表寬度
 * @param {string} height 圖表高度
 * @param {string} title  標題
 * @param {string} value  報表數字
 * @param {string} xAxis  X軸內容
 * @param {string} yAxis  Y軸內容
 * @param {string} series 報表內容
 */

const CusResponsiveChart = (props) => {
  const { height, title, value, xAxis, yAxis, series } = props;

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" fontWeight={"bold"} width={"100%"}>{title}</Typography>
        <Typography variant="h4" color={"secondary"} fontWeight={"bold"} width={"100%"}>{value ? value.toLocaleString('en-US') : null}</Typography>
        <ResponsiveChartContainer
          xAxis={xAxis}
          series={series}
          yAxis={yAxis.map((item) => ({ id: item.id }))}
          height={height}
          grid={{ horizontal: true }}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translate(-25px, 0)',
            },
            [`.${axisClasses.right} .${axisClasses.label}`]: {
              transform: 'translate(30px, 0)',
            },
          }}>
          <ChartsGrid vertical={true} horizontal={true} />
          <BarPlot />
          <LinePlot />
          {/* <MarkPlot /> */}
          <ChartsXAxis axisId={xAxis ? xAxis[0].id : ""} />
          {yAxis.map((item) => (
            <ChartsYAxis
              key={item.id}
              axisId={item.id}
              position={item.position}
              label={item.label} />
          ))}
          <ChartsTooltip />
        </ResponsiveChartContainer>
      </Box>
    </React.Fragment >
  )
}

export {
  CusLineChart,
  CusBarChart,
  CusPieChart,
  CusResponsiveChart
};