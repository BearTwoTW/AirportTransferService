import { createContext, useState, useEffect } from "react";
import { PermissionFunctionAPI } from '../js/APITS';
import { tryCatchError } from '../js/FunctionTS';

// 設置defaultValue 預設值
export const PermissionCheckValidContext = createContext({
  switchPositionCheckValid: null
});

export const PermissionCheckValidContextProvider = (props) => {
  const [switchPositionCheckValid, setSwitchPositionCheckValid] = useState("N")

  /**查詢據點權限 */
  const getPermissionSwitchPositionCheckValid = async () => {
    try {
      const res = await PermissionFunctionAPI.PermissionCheckValid({});
      if (res.success) {
        setSwitchPositionCheckValid(res.data.find(item => item.key === "SwitchPosition").value)
      }
    } catch (e) {
      tryCatchError(e)
    }
  }

  useEffect(() => {
    getPermissionSwitchPositionCheckValid();
  }, []);

  const context = {
    switchPositionCheckValid: switchPositionCheckValid
  };

  return (
    <PermissionCheckValidContext.Provider value={context}>
      {props.children}
    </PermissionCheckValidContext.Provider>
  );
}
