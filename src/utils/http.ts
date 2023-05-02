import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify';
import { AuthResponse } from '../types/auth.type'
import { clearLS, getAccessTokenFromLS, getProfileFromLS, setAccessTokenToLS, setProfileToLS } from './auth';
import path from 'src/constants/path';
import { User } from 'src/types/user.type';
class Http {
  instance: AxiosInstance
  // Khởi tạo biến accessToken trong class để biến được lưu trên RAM thì lúc lấy ra sẽ nhanh hơn
  // Khi get accessToken từ LocalStogate thì biến được lưu trong ổ cứng nên sẽ lấy ra lâu hơn ảnh hưởng đến performent
  private accessToken: string
  private profile: User | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.profile = getProfileFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use((config) => {
      if (this.accessToken && config.headers) {
        // authorization phải đúng tên trên server
        config.headers.authorization = this.accessToken
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    this.instance.interceptors.response.use((response) => {
      const { url } = response.config
      if (`/${url}` === path.login || `/${url}` === path.register) {
        const data = (response.data as AuthResponse).data
        this.accessToken = data.access_token
        this.profile = data.user
        setAccessTokenToLS(this.accessToken)
        setProfileToLS(this.profile)
      } else if (`/${url}` === path.logout) {
        this.accessToken = ''
        clearLS()
      }
      return response
    },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const message = error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
