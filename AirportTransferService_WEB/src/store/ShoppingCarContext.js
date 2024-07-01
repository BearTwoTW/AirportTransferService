import { createContext, useState } from "react";

// 設置defaultValue 預設值
export const ShoppingCarContext = createContext({
  searchIsShoppingCar: () => { },
  localStorageClear: () => { },
  shoppingCar: [],
});

export const ShoppingCarContextProvider = (props) => {

  /**[觸發] 查詢購物車 */
  function searchIsShoppingCarHandler() {
    props.setDelCartConfirm((prevBool) => !prevBool)
  }

  /**[觸發] 查詢購物車 */
  function localStorageClearHandler() {
    props.localStorageClear()
  }


  const context = {
    shoppingCar: props.shoppingCar,
    searchIsShoppingCar: searchIsShoppingCarHandler,
    localStorageClear: localStorageClearHandler
  };

  return (
    <ShoppingCarContext.Provider value={context}>
      {props.children}
    </ShoppingCarContext.Provider>
  );
}

