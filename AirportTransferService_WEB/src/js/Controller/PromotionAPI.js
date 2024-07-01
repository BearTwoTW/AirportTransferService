import { AuthorizeFetch } from "../Domain";

/**
 * @description PromotionAPI 促銷
 */
export const PromotionAPI = (() => {
  /**
 * Promotion/PromotionCreate
 * @description 促銷活動新建
 */
  const PromotionCreate = async function (obj = {
    name: null,
    note: null,
    order: null,
    combine_other_promotion: null,
    customer_labels: null,
    valid_time_start: null,
    valid_time_end: null,
    event_type: null,
    count_type: null,
    event_number_start: null,
    event_number_end: null,
    discount_type: null,
    discount_startcount: null,
    discount_maxcount: null,
    discount_number: null,
    gift_object_number: null,
    ismultiple: null,
    isfreightfree: null,
    restrict_commoditys: null,
    restrict_commodity_labels: null,
    target_commoditys: null,
    target_commodity_labels: null,
    gift_commoditys: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionCreate', obj);
  }

  /**
   * Promotion/PromotionUpdateMaster
   * @description 促銷活動修改主項
   */
  const PromotionUpdateMaster = async function (obj = {
    promotion_id: null,
    visible: null,
    name: null,
    note: null,
    order: null,
    combine_other_promotion: null,
    customer_labels: null,
    valid_time_start: null,
    valid_time_end: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionUpdateMaster', obj);
  }

  /**
   * Promotion/PromotionUpdateDiscount
   * @description 促銷活動修改折扣內容
   */
  const PromotionUpdateDiscount = async function (obj = {
    promotion_id: null,
    event_type: null,
    count_type: null,
    event_number_start: null,
    event_number_end: null,
    discount_type: null,
    discount_startcount: null,
    discount_maxcount: null,
    discount_number: null,
    ismultiple: null,
    isfreightfree: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionUpdateDiscount', obj);
  }

  /**
   * Promotion/PromotionUpdateRestrictCommodity
   * @description 促銷活動修改限制商品
   */
  const PromotionUpdateRestrictCommodity = async function (obj = {
    promotion_id: null,
    restrict_commoditys: null,
    restrict_commodity_labels: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionUpdateRestrictCommodity', obj);
  }

  /**
   * Promotion/PromotionUpdateTargetCommodity
   * @description 促銷活動修改目標商品
   */
  const PromotionUpdateTargetCommodity = async function (obj = {
    promotion_id: null,
    target_commoditys: null,
    target_commodity_labels: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionUpdateTargetCommodity', obj);
  }

  /**
   * Promotion/PromotionUpdateGift
   * @description 促銷活動修改目標商品
   */
  const PromotionUpdateGift = async function (obj = {
    promotion_id: null,
    gift_object_number: null,
    gift_commoditys: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionUpdateGift', obj);
  }

  /**
 * Promotion/PromotionSearch
 * @description 促銷活動查詢
 */
  const PromotionSearch = async function (obj = {
    name: null,
    valid_time_start: null,
    valid_time_end: null,
    event_type: null,
    discount_type: null,
    combine_other_promotion: null,
    visible: null,
    isfreightfree: null,
    page: null,
    num_per_page: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionSearch', obj);
  }

  /**
* Promotion/PromotionDetail
* @description 促銷活動細項
*/
  const PromotionDetail = async function (obj = {
    promotion_id: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionDetail', obj);
  }

  /**
   * Promotion/PromotionDelete
   * @description 促銷活動刪除
   */
  const PromotionDelete = async function (obj = {
    promotion_id: null
  }) {
    return await AuthorizeFetch('Promotion/PromotionDelete', obj);
  }


  return {
    PromotionCreate,
    PromotionUpdateMaster,
    PromotionUpdateDiscount,
    PromotionUpdateRestrictCommodity,
    PromotionUpdateTargetCommodity,
    PromotionUpdateGift,
    PromotionSearch,
    PromotionDetail,
    PromotionDelete
  }
})();