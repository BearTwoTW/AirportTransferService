import { Backdrop } from '@mui/material';
import { LinearProgress, CircularProgress } from '@mui/material';

/** 多加一個蓋版loading，其他的loading順路加到這個ts檔案裡面 */

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

/** 條狀加載畫面 */
export const LinearLoading = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0
    }}>
      <LinearProgress className={"LinearLoading"} />
    </div>
  )
};

/** 轉圈加載畫面 */
export const CircularLoading = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "100%",
      transform: "translateY(-55%)",
      display: "flex",
      justifyContent: "center"
    }}>
      <CircularProgress />
    </div>
  )
};

/** 炫砲loading字樣 */
export const CusLoading = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "100%",
      transform: "translateY(-55%)",
      display: "flex",
      justifyContent: "center"
    }}>
      <div className="loader">
        <span className="l">L</span>
        <span className="o">O</span>
        <span className="a">A</span>
        <span className="d">D</span>
        <span className="i">I</span>
        <span className="n">N</span>
        <span className="g">G</span>
        <span className="d1">.</span>
        <span className="d2">.</span>
      </div>
    </div>
  )
};

/** 客製loading字樣傳入參數 */
export type CusLoadingTextProps = {
  text: string;
};

/** 客製化loading字樣
 * @param props 客製loading字樣傳入參數
 */
export const CusLoadingText = (props: CusLoadingTextProps) => {
  const { text } = props;
  const loadingText: string[] = Array.from("...");

  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "100%",
      transform: "translateY(-55%)",
      display: "flex",
      justifyContent: "center"
    }}>
      <div className="loader">
        <span
          style={{
            color: "#F1F2F6",
            letterSpacing: "0.5em",
            fontSize: "16px",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
        >
          {text}
        </span>
        {loadingText.map((textItem, index) => {
          return (
            <span
              key={index}
              style={{
                color: "#F1F2F6",
                opacity: "0",
                letterSpacing: "0.5em",
                fontSize: "16px",
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                animation: `pass ${loadingText.length * 0.8}s ease-in-out infinite`,
                animationDelay: `${(index + 1) * 0.8}s`
              }}
            >
              {textItem}
            </span>
          )
        })}
      </div>
    </div>
  );

};

/** 背景幕傳入參數 */
export type CusBackdropLoadingProps = {
  open: boolean;
  text: string;
};

/** 客製化背景幕
 * @param props 背景幕傳入參數
 */
export const CusBackdropLoading = (props: CusBackdropLoadingProps) => {
  const { open, text } = props;

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => Math.max.apply(Math, Object.values(theme.zIndex)) + 1
      }}
      open={open}
    >
      <CusLoadingText text={text} />
    </Backdrop>
  )
};