using System.Collections;
using System.Reflection;
using System.Transactions;

namespace AirportTransferService.App_Code
{
    /// <summary>
    /// 資料庫
    /// </summary>
    public class SQL
    {
        /// <summary>
        /// 取得AutoNumber值順便更新
        /// </summary>
        /// <param name="myConnection">SQL連線 SqlConnection </param>
        /// <param name="number_name">AutoNumber 的 number_name</param>
        /// <param name="current_prefix">號碼前贅詞</param>
        /// <param name="maxNum">最大值</param>
        /// <param name="isdaily">是否隨日期更新前贅詞</param>
        /// <param name="head_office_dbo">連線資料庫字串</param>
        /// <returns></returns>
        public static ResultObject<string> GetAutoNumber(SqlConnection myConnection, string number_name, string current_prefix = "", int maxNum = 999, bool isdaily = false, string head_office_dbo = "")
        {
            using (TransactionScope tx = new(TransactionScopeOption.RequiresNew))
            {
                string NewCurrentNumber = "";
                try
                {
                    using (SqlCommand myCommand2 = new("", myConnection))
                    {
                        //檢查日期流水號是否需要更新
                        if (isdaily)
                        {
                            myCommand2.CommandText = $@"
                            update {head_office_dbo}AutoNumber 
                            set current_digits=CASE WHEN current_prefix<>SUBSTRING(Convert(varchar,GETDATE(),112),1,LEN(current_prefix))
                                               THEN 1
                                               ELSE current_digits END,
                                current_prefix=CASE WHEN current_prefix<>SUBSTRING(Convert(varchar,GETDATE(),112),1,LEN(current_prefix))
                                               THEN SUBSTRING(Convert(varchar,GETDATE(),112),1,LEN(current_prefix))
                                               ELSE current_prefix END
                            where number_name=@number_name;";
                            myCommand2.Parameters.AddWithValue("@number_name", number_name);
                            myCommand2.ExecuteNonQuery();
                        }

                        //編號取號
                        myCommand2.CommandText = $@"
                        update {head_office_dbo}Autonumber set current_digits = current_digits + value_interval
                        output deleted.current_prefix+RIGHT(REPLICATE('0', LEN(deleted.digits_width))+CAST(deleted.current_digits as NVARCHAR), LEN(deleted.digits_width))
                        where number_name=@number_name";
                        myCommand2.Parameters.Clear();
                        myCommand2.Parameters.AddWithValue("@number_name", number_name);
                        NewCurrentNumber = myCommand2.ExecuteScalar()?.ToString() ?? "";

                        if (string.IsNullOrEmpty(NewCurrentNumber))
                        {
                            if (isdaily)
                            {
                                myCommand2.CommandText = $@"
                                insert into {head_office_dbo}AutoNumber(number_name, current_prefix, digits_width, current_digits, value_interval, min_value)
                                values(@number_name, SUBSTRING(Convert(varchar,GETDATE(),112),1,@current_prefix_len), @digits_width, 1, 1, 1);

                                update {head_office_dbo}Autonumber set current_digits = current_digits + value_interval
                                output deleted.current_prefix+RIGHT(REPLICATE('0', LEN(deleted.digits_width))+CAST(deleted.current_digits as NVARCHAR), LEN(deleted.digits_width))
                                where number_name=@number_name";
                                myCommand2.Parameters.Clear();
                                myCommand2.Parameters.AddWithValue("@number_name", number_name);
                                myCommand2.Parameters.AddWithValue("@digits_width", maxNum);
                                myCommand2.Parameters.AddWithValue("@current_prefix_len", current_prefix.Length == 0 ? 8 : current_prefix.Length);
                                NewCurrentNumber = myCommand2.ExecuteScalar()?.ToString() ?? "";
                            }
                            else
                            {
                                myCommand2.CommandText = $@"
                                insert into {head_office_dbo}AutoNumber(number_name, current_prefix, digits_width, current_digits, value_interval, min_value)
                                values(@number_name, @current_prefix, @digits_width, 1, 1, 1);

                                update {head_office_dbo}Autonumber set current_digits = current_digits + value_interval
                                output deleted.current_prefix+RIGHT(REPLICATE('0', LEN(deleted.digits_width))+CAST(deleted.current_digits as NVARCHAR), LEN(deleted.digits_width))
                                where number_name=@number_name";
                                myCommand2.Parameters.Clear();
                                myCommand2.Parameters.AddWithValue("@number_name", number_name);
                                myCommand2.Parameters.AddWithValue("@current_prefix", current_prefix);
                                myCommand2.Parameters.AddWithValue("@digits_width", maxNum);
                                NewCurrentNumber = myCommand2.ExecuteScalar()?.ToString() ?? "";
                            }
                        }
                    }

                    tx.Complete();
                    return new ResultObject<string> { success = true, message = "", data = NewCurrentNumber };
                }
                catch (Exception e)
                {
                    return new ResultObject<string> { success = false, message = e.ToString(), data = JsonConvert.SerializeObject(e) };
                }
            }
        }

        /// <summary>
        /// 重要欄位異動物件
        /// </summary>
        public class ColumnUpdate_obj
        {
            /// <summary>
            /// 異動時間
            /// </summary>
            [Display(Name = "異動時間")]
            public string time { get; set; } = "";

            /// <summary>
            /// 異動使用者
            /// </summary>
            [Display(Name = "異動使用者")]
            public string user_id { get; set; } = "";

            /// <summary>
            /// 欄位名稱
            /// </summary>
            [Display(Name = "欄位名稱")]
            public string column_name { get; set; } = "";

            /// <summary>
            /// 欄位舊值
            /// </summary>
            [Display(Name = "欄位舊值")]
            public string column_old_value { get; set; } = "";

            /// <summary>
            /// 欄位新值
            /// </summary>
            [Display(Name = "欄位新值")]
            public string column_new_value { get; set; } = "";

            /// <summary>
            /// 是否加密
            /// </summary>
            [Display(Name = "是否加密")]
            public bool is_encryption { get; set; } = false;
        }

        /// <summary>
        /// 重要欄位異動紀錄
        /// </summary>
        /// <param name="myConnection"></param>
        /// <param name="table_name"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public static ResultObject<object> ColumnUpdateLog(SqlConnection myConnection, string table_name, List<ColumnUpdate_obj> list)
        {
            try
            {
                using (SqlCommand myCommand = new("", myConnection))
                {
                    foreach (ColumnUpdate_obj obj in list)
                    {
                        myCommand.CommandText = @"
                        insert into ColumnUpdateLog (cre_userid,cre_time,table_name,column_name,column_old_value,column_new_value,is_encryption)
                        values (@cre_userid,@cre_time,@table_name,@column_name,@column_old_value,@column_new_value,@is_encryption)";
                        myCommand.Parameters.Clear();
                        myCommand.Parameters.AddWithValue("@cre_userid", obj.user_id);
                        myCommand.Parameters.AddWithValue("@cre_time", obj.time);
                        myCommand.Parameters.AddWithValue("@table_name", table_name);
                        myCommand.Parameters.AddWithValue("@column_name", obj.column_name);
                        myCommand.Parameters.AddWithValue("@column_old_value", obj.is_encryption ? Tool.Sy_Encoder(obj.column_old_value, obj.time) : obj.column_old_value);
                        myCommand.Parameters.AddWithValue("@column_new_value", obj.is_encryption ? Tool.Sy_Encoder(obj.column_new_value, obj.time) : obj.column_new_value);
                        myCommand.Parameters.AddWithValue("@is_encryption", obj.is_encryption ? "Y" : "N");
                        myCommand.ExecuteNonQuery();
                        myCommand.Cancel();
                    }
                }

                return new ResultObject<object> { message = "更新成功", success = true };
            }
            catch (Exception e)
            {
                return new ResultObject<object> { message = e.ToString(), success = false, data = e };
            }
        }

        /// <summary>
        /// 檢查指定查詢欄位是否存在
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="columns"></param>
        /// <returns></returns>
        public static bool CheckSearchColumn<T>(List<string> columns)
        {
            //取得T的屬性名稱們
            IEnumerable<string> properties = typeof(T).GetProperties().Select(p => p.Name);

            if (columns.Exists(x => !properties.Contains(x))) return false;

            return true;
        }

        /// <summary>
        /// 根據選擇欄位動態產生sql查詢欄位語法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="columns"></param>
        /// <returns></returns>
        public static string GenerateSQLSelectQuery<T>(List<string> columns)
        {
            string sql_query_columns = @" COUNT(1) OVER() as C ";
            foreach (var property in typeof(T).GetProperties())
            {
                SQLSourceAttribute? attribute = property.GetCustomAttribute<SQLSourceAttribute>();

                if (attribute != null && columns.Contains(property.Name))
                {
                    sql_query_columns += $@",{attribute.Description} as [{property.Name}]";
                }
            }
            return sql_query_columns;
        }

        /// <summary>
        /// 根據sql語法和參數給值產生結果並分頁
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="param"></param>
        /// <param name="strSql"></param>
        /// <param name="myConn"></param>
        /// <param name="page_count"></param>
        /// <param name="need_params"></param>
        /// <param name="page_column"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static DataTable GenerateSQLSelectResult<T>(T param, string strSql, SqlConnection myConn, out int page_count, List<string>? need_params = null, string page_column = "C")
        {
            if (param == null) throw new Exception(message: "Null param");
            if (need_params != null && need_params.Count > 0)
            {
                if (!CheckSearchColumn<T>(need_params)) throw new Exception(message: "Search Parameter Not Exists");
            }

            DataTable dt = new();
            int page = 0;
            int num_per_page = 0;

            using (SqlCommand myCommand = new(strSql, myConn))
            {
                //myCommand.Parameters.AddWithValue("@own_user_id", "VVM001");
                //myCommand.Parameters.AddWithValue("@top_ul_ids0", 1);
                using (SqlDataAdapter myAdapter = new())
                {
                    myAdapter.SelectCommand = myCommand;
                    foreach (var property in param.GetType().GetProperties())
                    {
                        SQLSearchConditionAttribute? search_condition_attribute = property.GetCustomAttribute<SQLSearchConditionAttribute>();

                        //字串空或null就不當條件
                        if (property.PropertyType == typeof(string))
                        {
                            if (!string.IsNullOrEmpty(property.GetValue(param)?.ToString())
                                //直接塞入必須的變數
                                || (need_params != null && need_params.Contains(property.Name)))
                                myCommand.Parameters.AddWithValue(
                                    $"@{property.Name}",
                                    (search_condition_attribute != null && search_condition_attribute.SQLSearchConditionType == SQLSearchConditionType.Like)
                                    ? QueryEscape(property.GetValue(param)?.ToString())
                                    : property.GetValue(param)?.ToString());
                        }
                        //陣列迴圈AddWithValue
                        else if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
                        {
                            object? value = property.GetValue(param);
                            if (value == null) continue;
                            if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
                            {
                                int count = 0;
                                foreach (object item in (IEnumerable)value)
                                {
                                    myCommand.Parameters.AddWithValue($"@{property.Name}{count}", item);
                                    count++;
                                }
                            }
                        }
                        //剩下的型態們 目前 int decimal DateTime DateOnly TimeOnly
                        else
                        //else if (property.PropertyType == typeof(int) || property.PropertyType == typeof(int?) || property.PropertyType == typeof(decimal) || property.PropertyType == typeof(decimal?))
                        {
                            if (property.GetValue(param) != null
                                //直接塞入必須的變數
                                || (need_params != null && need_params.Contains(property.Name)))
                                myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                        }
                        //頁碼page和一頁幾筆num_per_page的參數
                        if (property.Name.Equals("page"))
                        {
                            if (!int.TryParse(property?.GetValue(param)?.ToString() ?? "0", out page)) throw new Exception(message: "Wrong page");
                        }
                        else if (property.Name.Equals("num_per_page"))
                        {
                            if (!int.TryParse(property?.GetValue(param)?.ToString() ?? "0", out num_per_page)) throw new Exception(message: "Wrong num_per_page");
                        }
                    }
                    myAdapter.Fill(dt);
                    myCommand.Cancel();
                }
            }
            if (!(page == 0 || num_per_page == 0 || dt.Rows.Count == 0)
                && !dt.Columns.Contains(page_column)) throw new Exception(message: "page column not exist");
            //分頁 把datatable的總筆數拿出來
            page_count = (page == 0 || num_per_page == 0 || dt.Rows.Count == 0) ? 0 : (int)Math.Ceiling(dt.Rows[0].Field<int>(page_column) / (decimal)num_per_page);

            return dt;
        }

        /// <summary>
        /// 根據選擇欄位動態產生sql查詢條件語法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static string GenerateSQLWhereQuery<T>(T param)
        {
            string sql_where_query = @"";
            foreach (var property in typeof(T).GetProperties())
            {
                if (property.GetValue(param) == null) continue;

                if (property.PropertyType == typeof(string) && string.IsNullOrEmpty(property.GetValue(param)?.ToString())) continue;

                else if ((property.PropertyType == typeof(int) || property.PropertyType == typeof(int?)
                        || property.PropertyType == typeof(decimal) || property.PropertyType == typeof(decimal?)) && property.GetValue(param) == null) continue;

                //else if (property.PropertyType == typeof(List<string>) && (property.GetValue(param) == null || ((List<string>?)property.GetValue(param) ?? new List<string>()).Count <= 0)) continue;

                else if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>)
                   && property.GetValue(param) == null
                /*&& (property.GetValue(param) == null || ((IEnumerable)property.GetValue(param) ?? new List<object>()).Count() <= 0)*/) continue;

                //else if (property.PropertyType != typeof(DateOnly) && property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>) &&
                //    (property.GetValue(param) == null || ((IEnumerable)property.GetValue(param) ?? new List<object>()).Cast<object>().Count() <= 0)) continue;
                else if ((property.PropertyType == typeof(DateTime) || property.PropertyType == typeof(DateTime?)
                        || property.PropertyType == typeof(DateOnly) || property.PropertyType == typeof(DateOnly?)
                        || property.PropertyType == typeof(TimeOnly) || property.PropertyType == typeof(TimeOnly?)) && property.GetValue(param) == null) continue;

                SQLSearchConditionAttribute? search_condition_attribute = property.GetCustomAttribute<SQLSearchConditionAttribute>();
                if (!string.IsNullOrEmpty(search_condition_attribute?.Description) && search_condition_attribute != null)
                {
                    switch (search_condition_attribute.SQLSearchConditionType)
                    {
                        case SQLSearchConditionType.Equal:
                            sql_where_query += $@" and {search_condition_attribute.Description}=@{property.Name} ";
                            break;
                        case SQLSearchConditionType.Like:
                            sql_where_query += $@" and {search_condition_attribute.Description} like '%'+@{property.Name}+'%' ESCAPE '\' ";
                            break;
                        case SQLSearchConditionType.In:
                            object? value = property.GetValue(param);
                            if (value == null) break;
                            if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
                            {
                                int count = 0;
                                string str_to_add = $@" and {search_condition_attribute.Description} in ( ";
                                foreach (object item in (IEnumerable)value)
                                {
                                    str_to_add += $"@{property.Name}{count},";
                                    count++;
                                }
                                if (count > 0)
                                {
                                    str_to_add = $"{str_to_add.TrimEnd(',')})";
                                }
                                else
                                {
                                    str_to_add = "";
                                }
                                sql_where_query += str_to_add;
                            }
                            //if (property.PropertyType == typeof(List<string>) || property.PropertyType == typeof(List<int>))
                            //{
                            //    sql_where_query += $@" and {search_condition_attribute.Description} in ({"'" + string.Join("','", property.GetValue(param)) + "'"})";
                            //}
                            break;
                        case SQLSearchConditionType.RangeStart:
                            sql_where_query += $@" and ({search_condition_attribute.Description} is null or {search_condition_attribute.Description}>=@{property.Name}) ";
                            break;
                        case SQLSearchConditionType.RangeEnd:
                            sql_where_query += $@" and ({search_condition_attribute.Description} is null or {search_condition_attribute.Description}<=@{property.Name}) ";
                            break;
                        case SQLSearchConditionType.ISNULL:
                            if (property.GetValue(param) != null && property.GetValue(param) is not bool) throw new Exception(message: "SQLSearchConditionType ISNULL 錯誤參數型態");

                            bool? is_null = (bool?)property.GetValue(param);
                            if (is_null.HasValue)
                            {
                                sql_where_query += $@" and {search_condition_attribute.Description} is {(is_null.Value ? "" : "not")} null ";
                            }

                            break;
                        default:
                            break;
                    }
                }
            }
            return sql_where_query;
        }

        /// <summary>
        /// 根據欄位動態產生sql新建語法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="param"></param>
        /// <param name="str_column"></param>
        /// <param name="str_value"></param>
        /// <param name="pk_is_identity"></param>
        public static void GenerateSQLCreateQuery<T>(T param, out string str_column, out string str_value, bool pk_is_identity)
        {
            //找到T有Key屬性的成員們
            List<string> pks = typeof(T).GetProperties().Where(prop => prop.IsDefined(typeof(KeyAttribute), true))?.Select(x => x?.Name ?? "")?.ToList() ?? [];
            if (!pk_is_identity && pks.Count == 0) throw new Exception(message: string.Format("{0}找無Key屬性成員", typeof(T).Name));

            str_column = pk_is_identity ? "" : ("[" + string.Join("],[", pks) + "]");
            str_value = pk_is_identity ? "" : ("@" + string.Join(",@", pks));
            foreach (var property in typeof(T).GetProperties())
            {
                if (property.GetValue(param) != null && !property.IsDefined(typeof(KeyAttribute), true))
                {
                    if (string.IsNullOrEmpty(str_column))
                    {
                        str_column += $@"[{property.Name}]";
                        str_value += $@"@{property.Name}";
                    }
                    else
                    {
                        str_column += $@",[{property.Name}]";
                        str_value += $@",@{property.Name}";
                    }
                }
            }
        }

        /// <summary>
        /// 根據欄位動態產生sql修改語法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static void GenerateSQLUpdateQuery<T>(T param, out string str)
        {
            str = "";
            foreach (var property in typeof(T).GetProperties())
            {
                bool isKeyField = Attribute.IsDefined(property, typeof(KeyAttribute));

                if (isKeyField) continue;

                else if (property.PropertyType == typeof(string) && property.GetValue(param)?.ToString() == Appsettings.api_string_param_no_pass) continue;

                else if ((property.PropertyType == typeof(int) || property.PropertyType == typeof(int?)
                        || property.PropertyType == typeof(decimal) || property.PropertyType == typeof(decimal?)) && Convert.ToInt32(property.GetValue(param)) == Appsettings.api_numeric_param_no_pass) continue;

                else if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>)
                && (property.GetValue(param) == null || !((IEnumerable<object>?)property.GetValue(param) ?? []).Any())) continue;

                else if ((property.PropertyType == typeof(DateTime) || property.PropertyType == typeof(DateTime?)) && Convert.ToDateTime(property.GetValue(param)) == Appsettings.api_datetime_param_no_pass) continue;
                else if ((property.PropertyType == typeof(DateOnly) || property.PropertyType == typeof(DateOnly?)) && DateOnly.FromDateTime(Convert.ToDateTime(property.GetValue(param)?.ToString())) == Appsettings.api_dateonly_param_no_pass) continue;
                else if ((property.PropertyType == typeof(TimeOnly) || property.PropertyType == typeof(TimeOnly?)) && TimeOnly.FromDateTime(Convert.ToDateTime(property.GetValue(param)?.ToString())) == Appsettings.api_timeonly_param_no_pass) continue;

                if (string.IsNullOrEmpty(str))
                {
                    str += $@" set [{property.Name}]=@{property.Name} ";
                }
                else
                {
                    str += $@",[{property.Name}]=@{property.Name} ";
                }
            }
        }

        /// <summary>
        /// 根據欄位動態產生sql欄位異動記錄語法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="param"></param>
        /// <param name="tmp_table_name"></param>
        /// <param name="column_log_output_str"></param>
        /// <param name="column_log_insert_str"></param>
        /// <param name="tmp_table_create_str"></param>
        /// <exception cref="Exception"></exception>
        public static void GenerateSQLColumnLogQuery<T>(T param, string tmp_table_name, out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str)
        {
            //避免暫存表名稱重複
            string rnd_tmp_table_name = Tool.CreateRandomCode(3) + tmp_table_name;
            column_log_output_str = "";
            column_log_insert_str = "";
            tmp_table_create_str = "";

            //資料PK
            string key_value = typeof(T).GetProperties().Where(x => Attribute.IsDefined(x, typeof(KeyAttribute)) && !string.IsNullOrEmpty(x.GetValue(param)?.ToString()))
                                                        .FirstOrDefault()?.GetValue(param)?.ToString() ?? "";
            if (string.IsNullOrEmpty(key_value)) throw new Exception(message: "pk value lost");

            foreach (var property in typeof(T).GetProperties())
            {
                //有SQLColumnLogAttribute屬性的才要記log
                if (!Attribute.IsDefined(property, typeof(SQLColumnLogAttribute))) continue;

                else if (property.PropertyType == typeof(string) && property.GetValue(param)?.ToString() == Appsettings.api_string_param_no_pass) continue;

                else if ((property.PropertyType == typeof(int) || property.PropertyType == typeof(int?)
                        || property.PropertyType == typeof(decimal) || property.PropertyType == typeof(decimal?)) && Convert.ToInt32(property.GetValue(param)) == Appsettings.api_numeric_param_no_pass) continue;

                else if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(List<>)
                && (property.GetValue(param) == null || !((IEnumerable<object>?)property.GetValue(param) ?? []).Any())) continue;

                else if ((property.PropertyType == typeof(DateTime) || property.PropertyType == typeof(DateTime?)) && Convert.ToDateTime(property.GetValue(param)) == Appsettings.api_datetime_param_no_pass) continue;
                else if ((property.PropertyType == typeof(DateOnly) || property.PropertyType == typeof(DateOnly?)) && DateOnly.FromDateTime(Convert.ToDateTime(property.GetValue(param)?.ToString())) == Appsettings.api_dateonly_param_no_pass) continue;
                else if ((property.PropertyType == typeof(TimeOnly) || property.PropertyType == typeof(TimeOnly?)) && TimeOnly.FromDateTime(Convert.ToDateTime(property.GetValue(param)?.ToString())) == Appsettings.api_timeonly_param_no_pass) continue;

                if (string.IsNullOrEmpty(column_log_output_str))
                {
                    tmp_table_create_str += $@"
                    CREATE TABLE #{rnd_tmp_table_name} (
                     upd_time datetime
                    ,upd_userid NVARCHAR(255)
                    ,old_{property.Name} NVARCHAR(255)
                    ,new_{property.Name} NVARCHAR(255)";
                    column_log_output_str += $@"
                    OUTPUT 
                     INSERTED.upd_time as upd_time
                    ,INSERTED.upd_userid as upd_userid
                    ,DELETED.{property.Name} as old_{property.Name}
                    ,INSERTED.{property.Name} as new_{property.Name}";
                    column_log_insert_str += $@"
                    INSERT INTO  ColumnUpdateLog (cre_time,cre_userid,table_name,key_value,column_name,column_old_value,column_new_value) 
                    SELECT upd_time,upd_userid,'{tmp_table_name}','{key_value}','{property.Name}',old_{property.Name},new_{property.Name} FROM #{rnd_tmp_table_name} ";
                }
                else
                {
                    tmp_table_create_str += $@"
                    ,old_{property.Name} NVARCHAR(255)
                    ,new_{property.Name} NVARCHAR(255)";
                    column_log_output_str += $@"
                    ,DELETED.{property.Name} as old_{property.Name}
                    ,INSERTED.{property.Name} as new_{property.Name} ";
                    column_log_insert_str += $@"
                    UNION ALL 
                    SELECT upd_time,upd_userid,'{tmp_table_name}','{key_value}','{property.Name}',old_{property.Name},new_{property.Name} FROM #{rnd_tmp_table_name} ";
                }
            }
            if (!string.IsNullOrEmpty(column_log_output_str))
            {
                column_log_output_str += $@" INTO #{rnd_tmp_table_name} ";
                column_log_insert_str += $@" DROP TABLE #{rnd_tmp_table_name} ";
                tmp_table_create_str += $@");";
            }
        }

        /// <summary>
        /// like語法忽略特殊符號
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string QueryEscape(string? input)
        {
            if (string.IsNullOrEmpty(input)) return input ?? "";

            string[] Wildcards = ["[", "%", "_", "^"];
            foreach (string Wildcard in Wildcards)
            {
                input = input.Replace(Wildcard, $"\\{Wildcard}");
            }
            return input;
        }

        /// <summary>
        /// 排序物件
        /// </summary>
        public class SQLOrder_obj
        {
            /// <summary>
            /// 欄位名稱
            /// </summary>
            public string sort_column { get; set; } = "";
            /// <summary>
            /// 特殊欄位表達
            /// </summary>
            public string sort_column_description { get; set; } = "";

            /// <summary>
            /// 是否反序
            /// </summary>
            public bool is_desc { get; set; } = false;
        }

        /// <summary>
        /// 根據傳入陣列們拼出排序語法
        /// </summary>
        /// <param name="sort_columns"></param>
        /// <param name="default_str"></param>
        public static string GenerateSQLOrderQuery<T>(List<SQLOrder_obj> sort_columns, string default_str)
        {
            string str = "";
            if (sort_columns.Count == 0)
            {
                str = default_str;
            }
            else
            {
                if (!CheckSearchColumn<T>(sort_columns.Select(x => x.sort_column).ToList())) throw new Exception(message: "Sort Column Not Exists");

                foreach (SQLOrder_obj obj in sort_columns)
                {
                    str += string.Format(
                        "{0} {1} {2} ",
                        string.IsNullOrEmpty(str) ? " order by " : ",",
                        string.IsNullOrEmpty(obj.sort_column_description)
                        ? typeof(T).GetProperties().Where(x => x.Name.Equals(obj.sort_column)).FirstOrDefault()?.GetCustomAttribute<SQLSourceAttribute>()?.Description ?? "1"
                        : obj.sort_column_description,
                        obj.is_desc ? "desc" : "asc");
                }
            }
            return str;
        }
    }
}

