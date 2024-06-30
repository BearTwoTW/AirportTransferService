namespace AirportTransferService.Services
{
    public interface IOfficeSiteSetting
    {
        #region OSS_WebsiteSetting
        int CreateOSS_WebsiteSetting(CreateOSS_WebsiteSettingParam param);
        List<SearchOSS_WebsiteSettingResult> SearchOSS_WebsiteSetting(SearchOSS_WebsiteSettingParam param, List<string> columns, out int page_count);
        void UpdateOSS_WebsiteSetting(UpdateOSS_WebsiteSettingParam param);
        void DeleteOSS_WebsiteSetting(int id);
        #endregion

        #region OSS_SocialLinkSetting
        int CreateOSS_SocialLinkSetting(CreateOSS_SocialLinkSettingParam param);
        List<SearchOSS_SocialLinkSettingResult> SearchOSS_SocialLinkSetting(SearchOSS_SocialLinkSettingParam param, List<string> columns, out int page_count);
        void UpdateOSS_SocialLinkSetting(UpdateOSS_SocialLinkSettingParam param);
        void DeleteOSS_SocialLinkSetting(int id);
        #endregion

        #region OSS_QASetting
        int CreateOSS_QASetting(CreateOSS_QASettingParam param);
        List<SearchOSS_QASettingResult> SearchOSS_QASetting(SearchOSS_QASettingParam param, List<string> columns, out int page_count);
        void UpdateOSS_QASetting(UpdateOSS_QASettingParam param);
        void DeleteOSS_QASetting(int id);
        #endregion

        #region OSS_TermSetting
        int CreateOSS_TermSetting(CreateOSS_TermSettingParam param);
        List<SearchOSS_TermSettingResult> SearchOSS_TermSetting(SearchOSS_TermSettingParam param, List<string> columns, out int page_count);
        void UpdateOSS_TermSetting(UpdateOSS_TermSettingParam param);
        void DeleteOSS_TermSetting(int id);
        #endregion

        #region OSS_CustomPageSetting
        int CreateOSS_CustomPageSetting(CreateOSS_CustomPageSettingParam param);
        List<SearchOSS_CustomPageSettingResult> SearchOSS_CustomPageSetting(SearchOSS_CustomPageSettingParam param, List<string> columns, out int page_count);
        void UpdateOSS_CustomPageSetting(UpdateOSS_CustomPageSettingParam param);
        void DeleteOSS_CustomPageSetting(int id);
        #endregion
    }

    public class IOfficeSiteSetting_IMPL : IOfficeSiteSetting
    {
        public readonly IConfiguration _config;

        private readonly string strConn = "";
        public IOfficeSiteSetting_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        #region OSS_WebsiteSetting
        public int CreateOSS_WebsiteSetting(CreateOSS_WebsiteSettingParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into OSS_WebsiteSetting({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return id;
        }

        public void DeleteOSS_WebsiteSetting(int id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from OSS_WebsiteSetting where id=@id";
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchOSS_WebsiteSettingResult> SearchOSS_WebsiteSetting(SearchOSS_WebsiteSettingParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchOSS_WebsiteSettingResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchOSS_WebsiteSettingResult>(columns)}
                from OSS_WebsiteSetting
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time desc 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchOSS_WebsiteSettingResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchOSS_WebsiteSettingResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    website_name = dt.Columns.Contains("website_name") ? dr["website_name"].ToString() : null,
                    bussiness_hour = dt.Columns.Contains("bussiness_hour") ? dr["bussiness_hour"].ToString() : null,
                    phone = dt.Columns.Contains("phone") ? dr["phone"].ToString() : null,
                    address = dt.Columns.Contains("address") ? dr["address"].ToString() : null,
                    email = dt.Columns.Contains("email") ? dr["email"].ToString() : null,
                    can_website_cancel_order = dt.Columns.Contains("can_website_cancel_order") ? dr["can_website_cancel_order"].ToString() : null,
                    buy_limit = dt.Columns.Contains("buy_limit") ? dr.Field<int?>("buy_limit") : null,
                    bonus_expired_month = dt.Columns.Contains("bonus_expired_month") ? dr.Field<int?>("bonus_expired_month") : null,
                    order_bonus_limit_rate = dt.Columns.Contains("order_bonus_limit_rate") ? dr.Field<decimal?>("order_bonus_limit_rate") : null,
                    bonus_isopen = dt.Columns.Contains("bonus_isopen") ? dr["bonus_isopen"].ToString() : null,
                    shopping_voucher_isopen = dt.Columns.Contains("shopping_voucher_isopen") ? dr["shopping_voucher_isopen"].ToString() : null,
                    invoice_isopen = dt.Columns.Contains("invoice_isopen") ? dr["invoice_isopen"].ToString() : null,
                    days_after_pay_get_bonus = dt.Columns.Contains("days_after_pay_get_bonus") ? dr.Field<int?>("days_after_pay_get_bonus") : null,
                    days_after_ship_get_bonus = dt.Columns.Contains("days_after_ship_get_bonus") ? dr.Field<int?>("days_after_ship_get_bonus") : null,
                    google_login_isopen = dt.Columns.Contains("google_login_isopen") ? dr["google_login_isopen"].ToString() : null,
                    line_login_isopen = dt.Columns.Contains("line_login_isopen") ? dr["line_login_isopen"].ToString() : null,
                });
            }
            return result;
        }

        public void UpdateOSS_WebsiteSetting(UpdateOSS_WebsiteSettingParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update OSS_WebsiteSetting
                    {str}
                    where id=@id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion

        #region OSS_SocialLinkSetting
        public int CreateOSS_SocialLinkSetting(CreateOSS_SocialLinkSettingParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into OSS_SocialLinkSetting({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return id;
        }

        public void DeleteOSS_SocialLinkSetting(int id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from OSS_SocialLinkSetting where id=@id";
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchOSS_SocialLinkSettingResult> SearchOSS_SocialLinkSetting(SearchOSS_SocialLinkSettingParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchOSS_SocialLinkSettingResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchOSS_SocialLinkSettingResult>(columns)}
                from OSS_SocialLinkSetting
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by seq asc 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchOSS_SocialLinkSettingResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchOSS_SocialLinkSettingResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    icon = dt.Columns.Contains("icon") ? dr["icon"].ToString() : null,
                    url = dt.Columns.Contains("url") ? dr["url"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    seq = dt.Columns.Contains("seq") ? dr.Field<int?>("seq") : null,
                });
            }
            return result;
        }

        public void UpdateOSS_SocialLinkSetting(UpdateOSS_SocialLinkSettingParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update OSS_SocialLinkSetting
                    {str}
                    where id=@id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion

        #region OSS_QASetting
        public int CreateOSS_QASetting(CreateOSS_QASettingParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into OSS_QASetting({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return id;
        }

        public void DeleteOSS_QASetting(int id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from OSS_QASetting where id=@id";
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchOSS_QASettingResult> SearchOSS_QASetting(SearchOSS_QASettingParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchOSS_QASettingResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchOSS_QASettingResult>(columns)}
                from OSS_QASetting
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by seq asc
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchOSS_QASettingResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchOSS_QASettingResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    question = dt.Columns.Contains("question") ? dr["question"].ToString() : null,
                    answer = dt.Columns.Contains("answer") ? dr["answer"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    seq = dt.Columns.Contains("seq") ? dr.Field<int?>("seq") : null,
                });
            }
            return result;
        }

        public void UpdateOSS_QASetting(UpdateOSS_QASettingParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update OSS_QASetting
                    {str}
                    where id=@id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion

        #region OSS_TermSetting
        public int CreateOSS_TermSetting(CreateOSS_TermSettingParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into OSS_TermSetting({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return id;
        }

        public void DeleteOSS_TermSetting(int id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from OSS_TermSetting where id=@id";
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchOSS_TermSettingResult> SearchOSS_TermSetting(SearchOSS_TermSettingParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchOSS_TermSettingResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchOSS_TermSettingResult>(columns)}
                from OSS_TermSetting
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time desc
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchOSS_TermSettingResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchOSS_TermSettingResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    privacy_policy = dt.Columns.Contains("privacy_policy") ? dr["privacy_policy"].ToString() : null,
                    service_policy = dt.Columns.Contains("service_policy") ? dr["service_policy"].ToString() : null,
                    purchase_notice = dt.Columns.Contains("purchase_notice") ? dr["purchase_notice"].ToString() : null,
                });
            }
            return result;
        }

        public void UpdateOSS_TermSetting(UpdateOSS_TermSettingParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update OSS_TermSetting
                    {str}
                    where id=@id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion

        #region OSS_CustomPageSetting
        public int CreateOSS_CustomPageSetting(CreateOSS_CustomPageSettingParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into OSS_CustomPageSetting({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return id;
        }

        public void DeleteOSS_CustomPageSetting(int id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from OSS_CustomPageSetting where id=@id";
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchOSS_CustomPageSettingResult> SearchOSS_CustomPageSetting(SearchOSS_CustomPageSettingParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchOSS_CustomPageSettingResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchOSS_CustomPageSettingResult>(columns)}
                from OSS_CustomPageSetting
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by seq asc
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchOSS_CustomPageSettingResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchOSS_CustomPageSettingResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    content = dt.Columns.Contains("content") ? dr["content"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    seq = dt.Columns.Contains("seq") ? dr.Field<int?>("seq") : null,
                });
            }
            return result;
        }

        public void UpdateOSS_CustomPageSetting(UpdateOSS_CustomPageSettingParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update OSS_CustomPageSetting
                    {str}
                    where id=@id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion
    }
}