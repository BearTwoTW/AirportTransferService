/**
 * @param {*} onPerfEntry 這個回調函數會在每次測量網頁性能指標時被調用，並且會傳遞一個性能指標對象作為參數
 * @description 測量和報告網頁性能指標，例如載入速度、渲染速度等等。它可以幫助您監控和優化您的網頁性能，以提高用戶體驗。
 * @param CLS（Cumulative Layout Shift）：它測量了網頁畫面穩定性，即在網頁載入期間，元素的位置是否發生變化。較低的 CLS 意味著網頁感覺更穩定，因此越低越好。
 * 
 * @param FID（First Input Delay）：它測量了瀏覽器接收到用戶輸入到網頁對輸入作出反應的時間。較短的 FID 意味著網頁對用戶輸入的反應速度更快，因此越低越好。
 * 
 * @param FCP（First Contentful Paint）：它測量了第一個有內容的元素顯示在屏幕上的時間。較短的 FCP 意味著網頁感覺更快，因此越低越好。
 * 
 * @param LCP（Largest Contentful Paint）：它測量了最大的可見元素顯示在屏幕上的時間。較短的 LCP 意味著網頁感覺更快，因此越低越好。
 * 
 * @param TTFB （Time to First Byte）：它測量了瀏覽器發出請求到收到第一個字節的時間。較短的 TTFB 意味著網頁載入速度更快，因此越低越好。
 */
const ReportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default ReportWebVitals;
