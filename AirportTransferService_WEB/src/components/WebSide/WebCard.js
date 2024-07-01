import { Box } from '@mui/material';
import { imageURL } from '../../js/Domain';
import fakeimg from '../../images/FakeImages/fakeimg.png';
import { isTest } from '../../js/DomainTS';
import { WebTextIconButton3 } from '../../components/WebSide/WebButton';

export const WebCommodityCard3 = (props) => {
  const { className, imgSrc, alt, commodityName, is_preorder, shipType, commodityPrice, onClick, suggestedPrice, maxPrice, minPrice } = props
  const click = (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    // 按鈕點擊後的處理邏輯
    console.log("按鈕被點擊，事件不會冒泡。");
  }
  return (
    <Box className={className}>
      <a onClick={onClick}>
        <div className={`img_container ${isTest ? "watermark" : ""}`}>
          <img className="commodity_img duration-1000 hover:scale-105 cursor-pointer" src={imgSrc ? (imageURL + imgSrc) : fakeimg} alt={alt} />
          <div className="overlay flex items-end p-2.5">
            {/* <WebTextIconButton3
              fullWidth={true}
              size={"large"}
              color="primary"
              text="加入購物車"
              onClick={(e) => click(e)} /> */}
          </div>
          <div className="absolute top-0 right-0 space-x-2.5">
            {is_preorder === "Y" ? <span className="text-xs bg-primary text-info p-1 whitespace-nowrap">預購</span> : null}
            {shipType !== "一般" ? <span className="text-xs bg-primary text-info p-1 whitespace-nowrap">{shipType}</span> : null}
          </div>
        </div>
      </a>
      <Box className="py-2.5 space-y-2">
        <h3 className="text-ellipsis multi-line-truncate">
          {commodityName}
        </h3>
        {maxPrice === minPrice ? commodityPrice === suggestedPrice ?
          <p className="text-sm text-secInfo dollarSign">{commodityPrice}</p>
          :
          <Box className="w-full flex space-x-2.5 text-secInfo max-sm:flex-wrap">
            <del className="text-sm dollarSign">{commodityPrice}</del>
            <p className="text-sm">$ {suggestedPrice}</p>
          </Box>
          :
          <Box className="w-full flex space-x-2.5 text-secInfo max-sm:flex-wrap">
            <p className="text-sm dollarSign">{minPrice}</p>
            <p className="text-sm"> ~ </p>
            <p className="text-sm dollarSign">{maxPrice}</p>
          </Box>}
      </Box>
    </Box>
  )
}