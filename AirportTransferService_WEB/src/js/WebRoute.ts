export const WedSideTemplatePages = (() => {
  /** 官網版面-1 */
  const TemplatePagesArr1: any = [];

  /** 官網版面-2 */
  const TemplatePagesArr2: any = [];

  /** 官網版面-3 */
  const TemplatePagesArr3 = [
    { path: "", name: "首頁", pathName: "Index", value: "Y", children: [] },
    { path: "", name: "加價服務", pathName: "Price", value: "Y", children: [] },
    { path: "", name: "預約及車資計算", pathName: "Reserve", value: "Y", children: [], },
  ];

  /** 組件化嘗試版本 */
  const Template = [
    { path: "", name: "Auth", page: "Auth", value: "Y", children: [] },
    { path: "Checkout", name: "結帳", page: "Checkout", value: "Y", children: [] },
    { path: "CheckoutSecond", name: "訂單完成", page: "CheckoutSecond", value: "Y", children: [] },
    { path: "CommodityMid", name: "中分類", page: "CommodityMid", value: "Y", children: [] },
    { path: "CommodityPage", name: "商品", page: "CommodityPage", value: "Y", children: [] },
    { path: "CommoditySmall", name: "小分類", page: "CommoditySmall", value: "Y", children: [] },
    { path: "Index", name: "首頁", page: "Index", value: "Y", children: [] },
    { path: "Login", name: "登入", page: "Login", value: "Y", children: [] },
    {
      path: "MemberCenter",
      name: "會員資料",
      page: "MemberCenter",
      value: "Y",
      children: [
        { path: "", name: "基本資料", page: "MemberCenterBasicInfo", value: "Y", children: [] },
        { path: "", name: "付款資訊", page: "MemberCenterPayInfo", value: "Y", children: [] },
        { path: "", name: "收貨地址", page: "MemberCenterDeliveryAddress", value: "Y", children: [] },
        { path: "", name: "修改密碼", page: "MemberCenterChangePassword", value: "Y", children: [] },
        { path: "", name: "訂單查詢", page: "MemberCenterOrderSearch", value: "Y", children: [] },
        { path: "", name: "退訂/退貨查詢", page: "MemberCenterOrderReturnSearch", value: "Y", children: [] },
        { path: "", name: "折扣碼", page: "MemberCenterDiscountCode", value: "Y", children: [] },
        { path: "", name: "紅利", page: "MemberCenterDividend", value: "Y", children: [] },
        { path: "", name: "購物金", page: "MemberCenterShoppingPoints", value: "Y", children: [] },
        { path: "", name: "收藏清單", page: "MemberCenterFavoritesList", value: "Y", children: [] },
      ],
    },
    { path: "CustomPage0", name: "自訂頁面0", page: "CustomPage0", value: "Y", children: [] },
    { path: "CustomPage1", name: "自訂頁面1", page: "CustomPage1", value: "Y", children: [] },
    { path: "ShoppingGuide", name: "購物須知", page: "ShoppingGuide", value: "Y", children: [] },
    { path: "FAQPage", name: "FAQ常見問題", page: "FAQPage", value: "Y", children: [] },
    { path: "TermPage", name: "隱私權條款", page: "TermPage", value: "Y", children: [] },
  ];

  return {
    TemplatePagesArr1,
    TemplatePagesArr2,
    TemplatePagesArr3,
    Template,
  };
})();
