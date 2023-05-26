import { Purchase, PurchaseStatusList } from "src/types/purchase.type";
import { SuccessResponse } from "src/types/util.type";
import http from "src/utils/http";

const URL = 'purchases';

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number; }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseStatusList }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi