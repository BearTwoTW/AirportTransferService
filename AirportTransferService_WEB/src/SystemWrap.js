import React, { Suspense } from 'react';
//Components
import { LinearLoading } from "./components/CusProgress";
import { CusPersistentSideBar } from './components/CusSideBar';
import { OfficeSiteContextProvider } from './store/OfficeSiteContext';
import { PermissionCheckValidContextProvider } from './store/PermissionCheckValidContext';

const SystemWrap = (props) => {
  return (
    <React.Fragment>
      <Suspense fallback={<LinearLoading />}>
        <OfficeSiteContextProvider>
          <PermissionCheckValidContextProvider>
            <CusPersistentSideBar routeData={props.routeData} groupData={props.groupData} />
          </PermissionCheckValidContextProvider>
        </OfficeSiteContextProvider>
      </Suspense>
    </React.Fragment>
  )
}

export default SystemWrap