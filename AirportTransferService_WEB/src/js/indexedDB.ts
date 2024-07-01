import { type } from "os";
import { permisionURL } from "./DomainTS";
// --------------------------------------------- 20230818 還沒改成TypeScript，所以ResultObj先寫在這 by Sabrina Start---------------------------------------------//
// import { ResultObj } from "./Domain"
type ResultObj<T = any, T2 = any> = {
  success: boolean;
  data: T;
  message: string;
  dt2?: T2 | null;
  page?: number;
};
// --------------------------------------------- 20230818 還沒改成TypeScript，所以ResultObj先寫在這 by Sabrina End---------------------------------------------//

type DBSet = {
  data_base_name: string;
  version: number;
  tables_set: TableSet[];
};

type TableSet = {
  table_name: string;
  option: {
    keyPath: string[];
  };
  index: ColumnSet[];
};

type ColumnSet = {
  index_name: string[];
  index_value: string[];
  option: {
    unique: boolean;
  };
};

export class IndexedDBClass {
  set_json: DBSet[] = [];
  idb: IDBDatabase | null = null;
  idb_name: string = "";

  constructor(idb_name = "") {
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return;
    }
    this.idb_name = idb_name;
  }

  init() {}

  async openIndexedDB(first_time_open = true): Promise<ResultObj> {
    return new Promise(async (resolve, reject) => {
      // 取得設定

      (async () => {
        if (window.location.origin.indexOf("localhost") !== -1 || window.location.origin.indexOf("127.0.0.1") !== -1) {
          return await require(`../_${sessionStorage.company_code}/indexedDB_setting.json`);
        } else {
          let a = await fetch(`${permisionURL}/indexedDB_setting.json?x=` + Date.now())
            .then((res) => res.json())
            .catch(() => []);
          return a;
        }
      })().then((res) => {
        this.set_json = res;
        if (res.some((dbSet: DBSet) => dbSet.data_base_name === this.idb_name)) {
          res
            .filter((dbSet: DBSet) => dbSet.data_base_name === this.idb_name)
            .forEach((dbSet: DBSet) => {
              if (dbSet.data_base_name == "" || dbSet.data_base_name == null || dbSet.data_base_name == undefined) console.warn(dbSet, "建立 indexedDB 遺失 database 名稱，請檢查JSON設定是否有 data_base_name 參數");
              else if (dbSet.version == null || dbSet.version == undefined) console.warn(dbSet, "建立 indexedDB 遺失 database 版本號，請檢查JSON設定是否有 version 參數");
              else if (dbSet.tables_set == null || dbSet.tables_set == undefined) console.warn(dbSet, "建立 indexedDB 遺失 tables_set 資料表設定，請檢查JSON設定是否有 tables_set 參數");

              // 開啟
              let request = window.indexedDB.open(dbSet.data_base_name, dbSet.version);

              // 建立失敗的話
              request.onerror = (event) => {
                console.trace("IDB create error");
                // 直接指定對應的功能會回傳正常建立之下的東西，避免發生錯誤導致程式卡住
                reject({
                  success: false,
                  message: "open IndexedDB database error",
                  data: {
                    openIndexedDB: async () => ({
                      success: false,
                      message: "(openIndexedDB)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    deleteIndexedDB: async () => ({
                      success: false,
                      message: "(deleteIndexedDB)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    add: async () => ({
                      success: false,
                      message: "(add)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    search: async () => ({
                      success: false,
                      message: "(search)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    index: async () => ({
                      success: false,
                      message: "(index)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    update: async () => ({
                      success: false,
                      message: "(update)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    cursor: async () => ({
                      success: false,
                      message: "(cursor)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    remove: async () => ({
                      success: false,
                      message: "(remove)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                    clear: async () => ({
                      success: false,
                      message: "(clear)未正確的開啟IDB，無法使用本地暫存機制之服務",
                      data: event,
                    }),
                  },
                });
              };

              request.onsuccess = () => {
                this.idb = request.result;
                if (this.idb_name === request.result.name) {
                  if (first_time_open) this.idb.close();
                  resolve({
                    success: true,
                    message: "IDB 建立成功: " + request.result.name,
                    data: request.result,
                  });
                }
              };

              request.onupgradeneeded = function (e) {
                let db = request.result;
                db.onerror = (event) =>
                  reject({
                    success: false,
                    message: "IDB 更新失敗: ",
                    data: event,
                  });
                // 產生資料表
                for (let i = 0; i < dbSet.tables_set.length; i++) {
                  let table_set = dbSet.tables_set[i];
                  // 如果該table已經有存在，就先刪除
                  if (db.objectStoreNames.contains(table_set.table_name)) db.deleteObjectStore(table_set.table_name);

                  // 建立資料表，並且設定"鍵值"
                  let objectStore = db.createObjectStore(table_set.table_name, table_set.option);
                  table_set.index.forEach((index_setting: ColumnSet) => {
                    if (typeof index_setting.index_name === "string") objectStore.createIndex(index_setting.index_name, index_setting.index_value, index_setting.option);
                    else {
                      objectStore.createIndex(index_setting.index_name.join(", "), index_setting.index_value, index_setting.option);
                    }
                  });
                }
              };
            });
        } else {
          reject({ success: false, message: "IDB 啟動失敗: ", data: null });
        }
      });
    });
  }

  /**
   * 刪除資料庫
   * @returns ResultObject
   */
  async deleteIndexedDB() {
    return new Promise(async (resolve, reject) => {
      if (this.idb_name === "")
        resolve({
          success: false,
          message: "IDB 刪除失敗: idb name 不得為空 ",
        });
      else {
        let request = window.indexedDB.deleteDatabase(this.idb_name);
        request.onsuccess = (event) => resolve({ success: true, message: "IDB 刪除成功", data: event });
        request.onerror = (event) => reject({ success: false, message: "IDB 刪除失敗", data: event });
        request.onblocked = (event) => reject({ success: true, message: "IDB 刪除失敗", data: event });
      }
    });
  }

  async add(table_name = "", data = null) {
    return new Promise(async (resolve, reject) => {
      if (this.idb === null) throw new Error("idb 不得為null");
      else if (table_name === null) throw new Error("table_name 不得為null");
      else if (data === null) throw new Error("data 不得為null");

      await this.openIndexedDB(false).then((r) => {
        if (this.idb === null) reject({ success: false, message: "遺失 idb", data: null });
        else {
          let transaction = this.idb.transaction(table_name, "readwrite");
          transaction.oncomplete = () => {};
          transaction.onerror = (event) => {
            console.trace("IDB insert error");
            event.preventDefault();
            if (this.idb !== null) this.idb.close();
            reject({
              success: false,
              message: "IDB insert error",
              data: event,
            });
          };

          let object_store = transaction.objectStore(table_name);
          let request = object_store.add(data);
          request.onerror = (event: Event) => {
            let t: IDBTransaction | null = event.target as IDBTransaction;
            if (this.idb !== null) this.idb.close();
            reject({ success: false, message: t?.error, data: event });
          };

          request.onsuccess = () => {
            if (this.idb !== null) this.idb.close();
            resolve({
              success: true,
              message: "新建成功",
              data: request.result,
            });
          };
        }
      });
    });
  }

  async search<T = any>(table_name: string = "", keyPath: string[]): Promise<ResultObj<T>> {
    return new Promise(async (resolve, reject) => {
      if (this.idb === null) throw new Error("idb 不得為null");
      else if (table_name === null) throw new Error("table_name 不得為null");

      await this.openIndexedDB(false).then((r) => {
        if (this.idb === null) reject({ success: false, message: "遺失 idb", data: null });
        else {
          let transaction = this.idb.transaction(table_name);
          transaction.oncomplete = () => {};
          transaction.onerror = (event) => {
            console.trace("IDB search error");
            event.preventDefault();
            if (this.idb) this.idb.close();
            reject({
              success: false,
              message: "IDB search error",
              data: event,
            });
          };
          let object_store = transaction.objectStore(table_name);
          let request = object_store.get(keyPath);
          request.onerror = (event: Event) => {
            let t: IDBTransaction | null = event.target as IDBTransaction;
            if (this.idb) this.idb.close();
            reject({ success: false, message: t?.error, data: event });
          };
          request.onsuccess = () => {
            if (this.idb) this.idb.close();
            resolve({
              success: true,
              message: "查詢成功",
              data: request.result === undefined ? null : request.result,
            });
          };
        }
      });
    });
  }

  async index(table_name = null, indexStr: string[] | null = null, keyPath = null) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.idb === null) throw new Error("idb 不得為null");
        else if (table_name === null) throw new Error("table_name 不得為null");
        else if (indexStr === null) throw new Error("indexStr 不得為null");
        else if (keyPath === null) throw new Error("keyPath 不得為null");
        await this.openIndexedDB(false).then((r) => {
          if (this.idb === null) reject({ success: false, message: "遺失 idb", data: null });
          else {
            let transaction = this.idb.transaction(table_name);
            let object_store = transaction.objectStore(table_name);
            let request = object_store.index(indexStr.join(",")).getAll(keyPath);
            request.onerror = (event: Event) => {
              let t: IDBTransaction | null = event.target as IDBTransaction;
              if (this.idb !== null) this.idb.close();
              reject({ success: false, message: t?.error, data: event });
            };
            request.onsuccess = () => {
              if (this.idb !== null) this.idb.close();
              resolve({
                success: true,
                message: "查詢成功",
                data: request.result,
              });
            };
          }
        });
      } catch (e) {
        reject({ success: false, message: JSON.stringify(e), data: e });
      }
    });
  }

  async cursor(table_name = null) {
    return new Promise(async (resolve, reject) => {
      if (this.idb === null) throw new Error("idb 不得為null");
      else if (table_name === null) throw new Error("table_name 不得為null");
      await this.openIndexedDB(false).then((r) => {
        if (this.idb === null) reject({ success: false, message: "遺失 idb", data: null });
        else {
          let transaction = this.idb.transaction(table_name, "readwrite");
          let object_store = transaction.objectStore(table_name);
          let arr = new Array();
          object_store.openCursor().onsuccess = (event: any) => {
            let cursor = event.target.result;
            if (cursor) {
              arr.push(cursor.value);
              cursor.continue();
            } else {
              if (this.idb !== null) this.idb.close();
              resolve({ success: true, message: "查詢成功", data: arr });
            }
          };
        }
      });
    });
  }

  async update(table_name = null, data = null) {
    return new Promise(async (resolve, reject) => {
      if (this.idb === null) throw new Error("idb 不得為null");
      else if (table_name === null) throw new Error("table_name 不得為null");
      else if (data === null) throw new Error("data 不得為null");
      await this.openIndexedDB(false).then((r) => {
        if (this.idb === null) reject({ success: false, message: "遺失 idb", data: null });
        else {
          let transaction = this.idb.transaction(table_name, "readwrite");
          let object_store = transaction.objectStore(table_name);
          let request = object_store.put(data);
          request.onerror = (event: Event) => {
            let t: IDBTransaction | null = event.target as IDBTransaction;
            if (this.idb !== null) this.idb.close();
            reject({ success: false, message: t?.error, data: event });
          };
          request.onsuccess = () => {
            if (this.idb !== null) this.idb.close();
            resolve({ success: true, message: "修改成功", data: data });
          };
        }
      });
    });
  }

  async remove(table_name = null, keyPath = null) {
    return new Promise(async (resolve, reject) => {
      if (this.idb === null) throw new Error("idb 不得為null");
      else if (table_name === null) throw new Error("table_name 不得為null");
      else if (keyPath === null) throw new Error("keyPath 不得為null");
      await this.openIndexedDB(false).then((r) => {
        if (this.idb === null) reject({ success: false, message: "遺失 idb", data: null });
        else {
          let transaction = this.idb.transaction(table_name, "readwrite");
          let object_store = transaction.objectStore(table_name);
          let request = object_store.delete(keyPath);
          request.onerror = (event: Event) => {
            let t: IDBTransaction | null = event.target as IDBTransaction;
            if (this.idb !== null) this.idb.close();
            reject({ success: false, message: t?.error, data: event });
          };
          request.onsuccess = () => {
            if (this.idb !== null) this.idb.close();
            resolve({ success: true, message: "刪除成功", data: "" });
          };
        }
      });
    });
  }

  // 清空指定table
  async clear(table_name = null) {
    return new Promise(async (resolve, reject) => {
      if (this.idb === null) throw new Error("idb 不得為null");
      else if (table_name === null) throw new Error("table_name 不得為null");
      await this.openIndexedDB(false).then((r) => {
        if (this.idb === null) reject({ success: false, message: "遺失 idb", data: null });
        else {
          let transaction = this.idb.transaction(table_name, "readwrite");
          let object_store = transaction.objectStore(table_name);
          let request = object_store.clear();
          request.onerror = (event: Event) => {
            let t: IDBTransaction | null = event.target as IDBTransaction;
            if (this.idb !== null) this.idb.close();
            reject({ success: false, message: t?.error, data: event });
          };
          request.onsuccess = () => {
            if (this.idb !== null) this.idb.close();
            resolve({ success: true, message: "清除成功", data: "" });
          };
        }
      });
    });
  }
}
