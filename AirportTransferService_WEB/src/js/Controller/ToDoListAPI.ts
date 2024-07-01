import { ResultObj, AuthorizeFetch } from "../DomainTS";

/**
 * @description 新增待辦事項參數
 * @param {string} url 連結
 * @param {string} request 請求
 * @param {string} exexute_date 執行日期
 */
export interface TodoListCreateParams {
  url: string;
  request: string;
  exexute_date: string;
}

/**
 * @description 新增待辦事項
 */
export const ToDoListCreate = async (obj: TodoListCreateParams): Promise<ResultObj> => {
  return await AuthorizeFetch("ToDoList/ToDoListCreate", obj);
};
