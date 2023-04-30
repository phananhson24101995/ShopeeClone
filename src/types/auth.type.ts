import { User } from './user.type'
import { SuccessResponse } from './util.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: number
  user: User
}>
