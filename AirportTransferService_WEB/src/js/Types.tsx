import { Moment } from 'moment';
import { useSnackbar } from 'notistack';

export type PropHistory = {
  history: ReturnType<typeof useSnackbar>
}

/**
 * 為了使用withSnakebar定義的Props
 * @description 使用& 來做交集型別(Intersection)
 * @param {*} enqueueSnackbar
 * @param {*} closeSnackbar
 */
export type PageProps = PropHistory


/**
 * DDMenu 取得的內容
 */
export type DDMenuItem = {
  sps_id: string;
  name: string;
  remark: string;
};

/**
 * 縣市區 DDMenu 取得的內容
 */
export type CityDDMenuItem = {
  name: string;
  code: string;
  children: Array<{ name: string; code: string }>;
};

/**
 * 單一頁面的權限資訊
 */
export type permissionPageInfo = {
  name: string;
  code: string;
  ctrl_code: string;
  children: Array<permissionPageInfo>;
};

/**
 * 查詢頁面權限回傳參數
 */
export type nowPageStateResult = {
  groupArr: Array<permissionPageInfo>;
  groupY: boolean;
  pageArr: Array<permissionPageInfo>;
  pageY: boolean;
};

/**
 * 查詢頁面權限參數
 */
export type nowPageStateParam = {
  sidebar: permissionPageInfo | null;
  groupCode: string;
  pageCode: string | undefined;
};

/**
 * 每一頁面固定參數
 */
export type PageState = {
  indexDB: any | null;
  initDB: boolean;
};

/**
 * 事件
 */
export type HandleInputEvent = {
  target: {
    id?: string;
    name: string;
    value?: any,
    checked?: boolean,
    label?: string,
    type?: string,
    key?: string
  }
}

export type HandleSelectEvent = {
  target: {
    id?: string;
    name: string;
    value?: any,
    label?: string,
    type?: string,
    key: string
  }
}

export type CusDialogMethods = {
  handleOpen: () => void;
  handleClose: () => void;
}