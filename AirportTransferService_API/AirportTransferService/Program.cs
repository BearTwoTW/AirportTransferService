global using AirportTransferService.App_Code;
global using AirportTransferService.Controllers;
global using AirportTransferService.Filters;
global using AirportTransferService.Models;
global using AirportTransferService.Services;

global using Microsoft.AspNetCore.Authorization;
global using Microsoft.Data.SqlClient;
global using System.ComponentModel.DataAnnotations;
global using System.Data;
global using System.Transactions;

global using Newtonsoft.Json;

using AirportTransferService.Swagger;
using static AirportTransferService.Swagger.SwaggerConfigureOptions;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();

    #region action
    builder.Services.AddScoped<IATS_WebSettings, IATS_WebSettings_IMPL>();
    builder.Services.AddScoped<IDealerSetting, IDealerSetting_IMPL>();
    builder.Services.AddScoped<IFiles, IFiles_IMPL>();
    builder.Services.AddScoped<ILog, ILog_IMPL>();
    builder.Services.AddScoped<IOfficeSiteSetting, IOfficeSiteSetting_IMPL>();
    builder.Services.AddScoped<IPage, IPage_IMPL>();
    builder.Services.AddScoped<IPermissionFunction, IPermissionFunction_IMPL>();
    builder.Services.AddScoped<ISystemParam, ISystemParam_IMPL>();
    builder.Services.AddScoped<ISystemSettings, ISystemSettings_IMPL>();
    builder.Services.AddScoped<IUser, IUser_IMPL>();
    builder.Services.AddScoped<IUserCareerRank, IUserCareerRank_IMPL>();
    builder.Services.AddScoped<IUserDuty, IUserDuty_IMPL>();
    builder.Services.AddScoped<IUserLevel, IUserLevel_IMPL>();
    #endregion

    // 注入使用者經銷商資訊物件
    builder.Services.AddScoped<UserDealerInfo>();
    // 注入使用者暫存物件
    builder.Services.AddSingleton<UserCache>();
    // 注入代碼檔暫存物件
    builder.Services.AddSingleton<SPSDictionary>();
    // 注入 IHttpContextAccessor
    builder.Services.AddHttpContextAccessor();
    // 注入 IBaseService
    builder.Services.AddScoped<IBaseService, BaseService>();

    //cors
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("LocalPolicy",
                builder => builder.AllowAnyOrigin()
                                  .AllowAnyMethod()
                                  .AllowAnyHeader());
    });

    builder.Services.AddControllersWithViews(option => { option.Filters.Add<GGGFilterAttribute>(); })
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = null;
        })
        .AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            options.SerializerSettings.ContractResolver = new DefaultContractResolver();
        });

    builder.Services.AddMemoryCache();
}

builder.Services.AddControllers(options =>
{
    options.Conventions.Add(new GroupNameActionModelConvention());
});

builder.Services.AddSwaggerGen(options =>
{
    IEnumerable<Type> controllerTypes = AppDomain.CurrentDomain.GetAssemblies()
    .SelectMany(s => s.GetTypes())
    .Where(p => typeof(ControllerBase).IsAssignableFrom(p));

    options.SchemaFilter<DisplayDescriptionSchemaFilter>();

    foreach (Type controllerType in controllerTypes)
    {
        string controllerName = controllerType.Name;
        options.SwaggerDoc(controllerName, new OpenApiInfo { Title = controllerName, Version = "v1" });
    }

    // 讀取 XML 檔案產生 API 說明
    string xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    string xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);

    //增加token驗證欄位在右上角
    options.AddSecurityDefinition("JwtBearer", new OpenApiSecurityScheme()
    {
        Description = "這是方式一(直接在輸入框中輸入認證資訊，不需要在開頭增加Bearer)",
        Name = "Authorization", //jwt預設的參數名稱
        In = ParameterLocation.Header,// jwt預設存放 Authorization 資訊的位置(request head)
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    //設置跟token驗證欄位有關的內容
    OpenApiSecurityScheme scheme = new()
    {
        Reference = new OpenApiReference() { Type = ReferenceType.SecurityScheme, Id = "JwtBearer" }
    };

    //註冊全域認證 (所有的API都可以使用認證)
    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        [scheme] = Array.Empty<string>()
    });
});

WebApplication app = builder.Build();
{
    if (PublishSettings.Config == "Debug")
    {
        // json 檔案
        app.UseSwagger();
        // Swagger UI 頁面
        app.UseSwaggerUI(options =>
        {
            string swaggerJsonBasePath = string.IsNullOrWhiteSpace(options.RoutePrefix) ? "." : "..";
            
            // 所有controller的類型屬性
            IEnumerable<Type> controllerTypes = Assembly.GetExecutingAssembly().GetTypes()
            .Where(type => typeof(ControllerBase).IsAssignableFrom(type));

            // 設置每一個contorllerUI
            foreach (Type controllerType in controllerTypes)
            {
                string controllerNameRP = controllerType.Name.Replace("Controller", "");
                string controllerName = controllerType.Name;

                // 建立新Swagger分頁時 UI也要給他一份
                options.SwaggerEndpoint($"{swaggerJsonBasePath}/swagger/{controllerName}/swagger.json", controllerNameRP);
            }
        });
    }

    app.Use((context, next) =>
    {
        context.Request.EnableBuffering();
        return next();
    });

    app.UseRouting();

    app.UseHttpsRedirection();

    //cors
    app.UseCors("LocalPolicy");

    app.UseAuthorization();

    app.MapControllers();

    using (IServiceScope serviceScope = app.Services.CreateScope())
    {
        IServiceProvider services = serviceScope.ServiceProvider;
        ISystemParam option = services.GetRequiredService<ISystemParam>();
    }

    app.Run();
}