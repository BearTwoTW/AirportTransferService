using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;

namespace AirportTransferService.Swagger
{
    public class SwaggerConfigureOptions(IApiDescriptionGroupCollectionProvider provider) : IConfigureOptions<SwaggerGenOptions>
    {
        private readonly IApiDescriptionGroupCollectionProvider provider = provider;

        public void Configure(SwaggerGenOptions options)
        {
            foreach (ApiDescriptionGroup description in provider.ApiDescriptionGroups.Items)
            {
                options.SwaggerDoc(description.GroupName, null);
            }
        }
        public class DisplayAttributeSchemaFilter : ISchemaFilter
        {
            public void Apply(OpenApiSchema schema, SchemaFilterContext context)
            {
                PropertyInfo? propertyInfo = context.Type.GetProperties().FirstOrDefault(p => p.Name == context.MemberInfo.Name);
                if (propertyInfo != null)
                {
                    DisplayAttribute? displayAttribute = propertyInfo.GetCustomAttribute<DisplayAttribute>();
                    if (displayAttribute != null)
                    {
                        schema.Title = displayAttribute.Name;
                    }
                }
            }
        }

        public class DisplayDescriptionSchemaFilter : ISchemaFilter
        {
            public void Apply(OpenApiSchema schema, SchemaFilterContext context)
            {
                Type type = context.Type;
                if (type == null || !type.IsClass) return;

                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    DisplayAttribute? displayAttribute = property.GetCustomAttribute<DisplayAttribute>();
                    if (displayAttribute != null && !string.IsNullOrEmpty(displayAttribute.Name))
                    {
                        if (schema.Properties != null && schema.Properties.TryGetValue(property.Name, out OpenApiSchema? value))
                        {
                            var propertySchema = value;
                            propertySchema.Description = displayAttribute.Name;
                        }
                    }
                }
            }
        }
    }

    /// <summary>
    /// 給予條件使API能夠取得一個分頁的分類
    /// </summary>
    public class GroupNameActionModelConvention : IActionModelConvention
    {
        public void Apply(ActionModel action)
        {
            IEnumerable<Type> controllerTypes = Assembly.GetExecutingAssembly().GetTypes().Where(type => typeof(ControllerBase).IsAssignableFrom(type));

            foreach (Type controllerType in controllerTypes)
            {
                string controllerNameRP = controllerType.Name.Replace("Controller", "").Trim();
                string controllerName = controllerType.Name;
                if (action.Controller.ControllerName == controllerNameRP)
                {
                    action.ApiExplorer.GroupName = controllerName;
                    action.ApiExplorer.IsVisible = true;
                }
            }
        }
    }
}