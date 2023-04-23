import { Link } from 'react-router-dom'
import { RegisterOptions, UseFormRegisterReturn, useForm } from 'react-hook-form'
import { FormRegisterType, getRules, schema } from 'src/utils/rules'
import { Input } from 'src/components/Input'
import { Button } from 'src/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'

// interface StateFormType {
//   email: string
//   password: string
//   confirm_password: string
// }

type StateFormType = FormRegisterType

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StateFormType>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<StateFormType, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = (data: any, e: any) => {
    // const body = omit<StateFormType, 'confirm_password'>(data, ['confirm_password'])
    delete data.confirm_password
    registerAccountMutation.mutate(data, {
      onSuccess(data1) {
        console.log('data', data1)
      },
      onError(error, variables, context) {
        console.log('error', error)
      }
    })
  }

  const onError = (errors: any, e: any) => {
    console.log('')
  }

  // const formVal = watch('email')
  // console.log('formVal', formVal)
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit, onError)} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                type='email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                placeholder='Email...'
                autoComplete='on'
              />
              <Input
                className='mt-2'
                name='password'
                type='password'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu...'
                autoComplete='on'
              />

              <Input
                className='mt-2'
                name='confirm_password'
                type='password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                placeholder='Nhập lại mật khẩu...'
                autoComplete='on'
              />
              <Button className='mt-3' labelName='Đăng ký' type='submit' />

              <div className='mt-8 flex justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='ml-1 text-red-400'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
