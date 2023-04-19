import type { RegisterOptions } from 'react-hook-form'

type RulesType = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const rules: RulesType = {
  email: {
    required: {
      value: true,
      message: 'Email là trường bắt buộc'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Sai định dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là trường bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password là trường bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  }
}
