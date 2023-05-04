import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type RulesType = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): RulesType => ({
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
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Mật khẩu và mật khẩu nhập lại không trùng nhau'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là trường bắt buộc')
      .email('Sai định dạng')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Password là trường bắt buộc')
      .min(5, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Confirm Password là trường bắt buộc')
      .min(5, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự')
      .oneOf([yup.ref('password')], 'Mật khẩu và mật khẩu nhập lại không trùng nhau'),
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá trị không phù hợp',
      test: testPriceMinMax
    }),
    price_max: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá trị không phù hợp',
      test: testPriceMinMax
    })
  })
  .required()

export type FormRegisterType = yup.InferType<typeof schema>

export type Schema = yup.InferType<typeof schema>
