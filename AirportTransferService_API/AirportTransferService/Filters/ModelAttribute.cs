using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AirportTransferService.Filters
{
    /// <summary>
    /// ModelAttribute
    /// </summary>
    public class ModelAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// OnActionExecuting
        /// </summary>
        /// <param name="actionContext"></param>
        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                actionContext.Result = new BadRequestObjectResult(new ResultObject<object>
                {
                    success = false,
                    message = "參數錯誤",
                    data = actionContext.ModelState
                          .Where(x => x.Value?.Errors.Count > 0)
                          .ToDictionary(k => k.Key.Replace("data.", ""), k => k.Value?.Errors.Select(e => e.ErrorMessage).ToArray())
                });

                base.OnActionExecuting(actionContext);
            }
        }
    }

    /// <summary>
    /// 資料庫語法欄位來源
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class SQLSourceAttribute(string description) : Attribute
    {
        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; } = description;
    }

    /// <summary>
    /// 資料庫語法欄位異動記錄屬性
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class SQLColumnLogAttribute : Attribute
    {
        /// <summary>
        /// SQLColumnLogAttribute
        /// </summary>
        public SQLColumnLogAttribute() { }
    }

    /// <summary>
    /// SQLSearchConditionType
    /// </summary>
    public enum SQLSearchConditionType
    {
        /// <summary>
        /// Equal
        /// </summary>
        Equal,
        /// <summary>
        /// Like
        /// </summary>
        Like,
        /// <summary>
        /// In
        /// </summary>
        In,
        /// <summary>
        /// RangeStart
        /// </summary>
        RangeStart,
        /// <summary>
        /// RangeEnd
        /// </summary>
        RangeEnd,
        /// <summary>
        /// ISNULL
        /// </summary>
        ISNULL
    }

    /// <summary>
    /// 資料庫語法查詢條件類型
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class SQLSearchConditionAttribute(SQLSearchConditionType sQLSearchConditionType, string description) : Attribute
    {
        /// <summary>
        /// SQLSearchConditionType
        /// </summary>
        public SQLSearchConditionType SQLSearchConditionType { get; } = sQLSearchConditionType;

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; } = description;
    }

    #region DateOnly 與 TimeOnly 的 JsonConverter
    //public class DateOnlyJsonConverter : System.Text.Json.Serialization.JsonConverter<DateOnly>
    //{
    //    private const string Format = "yyyy-MM-dd";

    //    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    //    {
    //        return DateOnly.ParseExact(reader.GetString()!, Format, CultureInfo.InvariantCulture);
    //    }

    //    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    //    {
    //        writer.WriteStringValue(value.ToString(Format, CultureInfo.InvariantCulture));
    //    }
    //}

    /// <summary>
    /// DateOnlyJsonConverter
    /// </summary>
    public class DateOnlyJsonConverter : JsonConverter<DateOnly?>
    {
        //public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        //{
        //    return DateOnly.FromDateTime(reader.GetDateTime());
        //}

        //public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        //{
        //    var isoDate = value.ToString("O");
        //    writer.WriteStringValue(isoDate);
        //}
        private const string Format = "yyyy-MM-dd";

        //public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        //{
        //    return DateOnly.ParseExact(reader.GetString()!, Format, CultureInfo.InvariantCulture);
        //}

        /// <summary>
        /// ReadJson
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="objectType"></param>
        /// <param name="existingValue"></param>
        /// <param name="hasExistingValue"></param>
        /// <param name="serializer"></param>
        /// <returns></returns>
        /// <exception cref="JsonReaderException"></exception>
        public override DateOnly? ReadJson(JsonReader reader, Type objectType, DateOnly? existingValue, bool hasExistingValue, Newtonsoft.Json.JsonSerializer serializer)
        {
            if (reader.Value == null) return null;
            if (reader.ValueType != typeof(DateTime)) throw new JsonReaderException(message: "錯誤日期時間格式");
            return DateOnly.FromDateTime((DateTime)reader.Value);
        }

        //public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        //{
        //    writer.WriteStringValue(value.ToString(Format, CultureInfo.InvariantCulture));
        //}

        /// <summary>
        /// WriteJson
        /// </summary>
        /// <param name="writer"></param>
        /// <param name="value"></param>
        /// <param name="serializer"></param>
        public override void WriteJson(JsonWriter writer, DateOnly? value, Newtonsoft.Json.JsonSerializer serializer)
        {
            //if (value.HasValue) writer.WriteValue(value.Value.ToString(Format, CultureInfo.InvariantCulture));
            //writer.WriteValue(value.HasValue ? value.Value.ToString("o") : null);
            writer.WriteValue(value.HasValue ? value.Value.ToDateTime(new TimeOnly(0, 0, 0)) : null);
        }
    }

    /// <summary>
    /// TimeOnlyJsonConverter
    /// </summary>
    public class TimeOnlyJsonConverter : JsonConverter<TimeOnly?>
    {
        private const string Format = "HH:mm";

        //public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        //{
        //    return TimeOnly.ParseExact(reader.GetString()!, Format, CultureInfo.InvariantCulture);
        //}

        /// <summary>
        /// ReadJson
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="objectType"></param>
        /// <param name="existingValue"></param>
        /// <param name="hasExistingValue"></param>
        /// <param name="serializer"></param>
        /// <returns></returns>
        /// <exception cref="JsonReaderException"></exception>
        public override TimeOnly? ReadJson(JsonReader reader, Type objectType, TimeOnly? existingValue, bool hasExistingValue, Newtonsoft.Json.JsonSerializer serializer)
        {
            if (reader.Value == null) return null;
            if (reader.ValueType != typeof(DateTime)) throw new JsonReaderException(message: "錯誤日期時間格式");
            return TimeOnly.FromDateTime((DateTime)reader.Value);
        }

        //public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
        //{
        //    writer.WriteStringValue(value.ToString(Format, CultureInfo.InvariantCulture));
        //}

        /// <summary>
        /// WriteJson
        /// </summary>
        /// <param name="writer"></param>
        /// <param name="value"></param>
        /// <param name="serializer"></param>
        public override void WriteJson(JsonWriter writer, TimeOnly? value, Newtonsoft.Json.JsonSerializer serializer)
        {
            //if (value.HasValue) writer.WriteValue(value.Value.ToString(Format, CultureInfo.InvariantCulture));
            writer.WriteValue(value.HasValue ? new DateOnly().ToDateTime(value.Value) : null);

        }
    }
    #endregion
}