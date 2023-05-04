import { Category } from "src/types/category.type"
import { SuccessResponse } from "src/types/util.type"
import http from "src/utils/http"

const URL = 'categories'
const categoryApi = {
  getCategoties() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
export default categoryApi