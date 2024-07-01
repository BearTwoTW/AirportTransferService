import { createContext, useEffect, useState } from "react";
import { OfficeSiteSettingAPI } from '../js/APITS';
import { tryCatchError } from '../js/FunctionTS';

// 設置defaultValue 預設值
export const OfficeSiteContext = createContext({
  officeSite: null,
});

export const OfficeSiteContextProvider = (props) => {
  const [officeSite, setOfficeSite] = useState(null);

  useEffect(() => {
    try {
      OfficeSiteSettingAPI.OSS_AllSettingSearch({}).then(res => {
        if (res.success) setOfficeSite(res.data)
      })
    } catch (e) {
      tryCatchError(e)
    }
  }, []);

  const context = {
    officeSite: officeSite,
  };

  return (
    <OfficeSiteContext.Provider value={context}>
      {props.children}
    </OfficeSiteContext.Provider>
  );
}
