import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('register', body)
  },
  loginUser(body: { email: string; password: string }) {
    return http.post('login', body)
  },
  logoutUser() {
    return http.post('logout')
  }
}

export default authApi