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

    // �`�J�ϥΪ̸g�P�Ӹ�T����
    builder.Services.AddScoped<UserDealerInfo>();
    // �`�J�ϥΪ̼Ȧs����
    builder.Services.AddSingleton<UserCache>();
    // �`�J�N�X�ɼȦs����
    builder.Services.AddSingleton<SPSDictionary>();
    // �`�J IHttpContextAccessor
    builder.Services.AddHttpContextAccessor();
    // �`�J IBaseService
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

    // Ū�� XML �ɮײ��� API ����
    string xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    string xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);

    //�W�[token�������b�k�W��
    options.AddSecurityDefinition("JwtBearer", new OpenApiSecurityScheme()
    {
        Description = "�o�O�覡�@(�����b��J�ؤ���J�{�Ҹ�T�A���ݭn�b�}�Y�W�[Bearer)",
        Name = "Authorization", //jwt�w�]���ѼƦW��
        In = ParameterLocation.Header,// jwt�w�]�s�� Authorization ��T����m(request head)
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    //�]�m��token������즳�������e
    OpenApiSecurityScheme scheme = new()
    {
        Reference = new OpenApiReference() { Type = ReferenceType.SecurityScheme, Id = "JwtBearer" }
    };

    //���U����{�� (�Ҧ���API���i�H�ϥλ{��)
    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        [scheme] = Array.Empty<string>()
    });
});

WebApplication app = builder.Build();
{
    if (PublishSettings.Config == "Debug")
    {
        // json �ɮ�
        app.UseSwagger();
        // Swagger UI ����
        app.UseSwaggerUI(options =>
        {
            string swaggerJsonBasePath = string.IsNullOrWhiteSpace(options.RoutePrefix) ? "." : "..";
            
            // �Ҧ�controller�������ݩ�
            IEnumerable<Type> controllerTypes = Assembly.GetExecutingAssembly().GetTypes()
            .Where(type => typeof(ControllerBase).IsAssignableFrom(type));

            // �]�m�C�@��contorllerUI
            foreach (Type controllerType in controllerTypes)
            {
                string controllerNameRP = controllerType.Name.Replace("Controller", "");
                string controllerName = controllerType.Name;

                // �إ߷sSwagger������ UI�]�n���L�@��
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