import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import JsBarcode from "jsbarcode";
import PropTypes from 'prop-types';
import { ArrayNotRepeat } from '../js/Function';

/**
 * barcode 條碼 
 * @description [更多參數] https://github.com/lindell/JsBarcode
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
const CusJsBarcode = (props) => {
  const { breakBr, targetBlank, array, format, renderer, width, height, displayValue, textAlign, textPosition, textMargin, fontSize, background, lineColor, margin, marginBottom } = props
  const useBarcodeRef = useRef([]);
  const result = [];
  const arr = [];
  for (let i = 0; i < array.length; i++) { result.push(i); }
  useBarcodeRef.current = result.map(() => React.createRef());

  useEffect(() => { CreateJsBarcode() }, [array]);

  const CreateJsBarcode = () => {
    if (array && array.length > 0 && array[0]) {
      for (let i = 0; i < array.length; i++) {
        let Res = JsBarcode(useBarcodeRef.current[i].current, array[i], {
          format, renderer, width, height, displayValue, textAlign, textPosition, textMargin, fontSize, background, lineColor, margin, marginBottom
        })
        arr.push({ [array[i]]: Res._renderProperties.element.outerHTML })
      }
      if (targetBlank) {
        let BarcodeArr = []
        if (localStorage.JsBarcodeArr && localStorage.JsBarcodeArr.length > 0) {
          BarcodeArr = JSON.parse(localStorage.JsBarcodeArr)
        }
        let arrAll = [...arr, ...BarcodeArr]
        localStorage.JsBarcodeArr = JSON.stringify(ArrayNotRepeat(arrAll))
      }
    }
  }

  if (renderer === "svg") {
    return (
      <>
        {array.map((ele, seq) => (
          <React.Fragment key={seq}>
            {breakBr ? <div key={seq}>
              <svg ref={useBarcodeRef.current[seq]} />
            </div> : <svg key={seq} ref={useBarcodeRef.current[seq]} />}
          </React.Fragment>
        ))}
      </>
    )
  } else if (renderer === "canvas") {
    return (
      <>
        {array.map((ele, seq) => (
          <React.Fragment key={seq}>
            {breakBr ? <div key={seq}>
              <canvas ref={useBarcodeRef.current[seq]} />
            </div> : <canvas key={seq} ref={useBarcodeRef.current[seq]} />}
          </React.Fragment>
        ))}
      </>
    )
  } else if (renderer === "img") {
    return (
      <>
        {array.map((ele, seq) => (
          <React.Fragment key={seq}>
            {breakBr ? <div>
              <img ref={useBarcodeRef.current[seq]} alt="" />
            </div> : <img key={seq} ref={useBarcodeRef.current[seq]} alt="" />}
          </React.Fragment>
        ))}
      </>
    )
  }
}

CusJsBarcode.defaultProps = {
  breakBr: false,
  targetBlank: true,
  format: "CODE128",
  renderer: "svg",
  width: 1,
  height: 35,
  displayValue: true,
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 0,
  fontSize: 14,
  background: "#FFFFFF",
  lineColor: "#000000",
  margin: 0,
  marginBottom: 0
};

CusJsBarcode.prototype = {
  breakBr: PropTypes.bool,
  targetBlank: PropTypes.bool,
  array: PropTypes.object,
  format: PropTypes.string,
  renderer: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayValue: PropTypes.bool,
  textAlign: PropTypes.string,
  textPosition: PropTypes.string,
  textMargin: PropTypes.number,
  fontSize: PropTypes.number,
  background: PropTypes.string,
  lineColor: PropTypes.string,
  margin: PropTypes.number,
  marginBottom: PropTypes.number
};


export {
  CusJsBarcode
};
