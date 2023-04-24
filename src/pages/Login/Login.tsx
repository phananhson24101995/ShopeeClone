import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input } from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { Button } from 'src/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/util.type'

// interface StateFormType {
//   email: string
//   password: string
// }

type StateFormType = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<StateFormType>({
    resolver: yupResolver(loginSchema)
  })

  const loginUserMutation = useMutation({
    mutationFn: (body: StateFormType) => loginUser(body)
  })

  const onSubmit = (data: StateFormType) => {
    console.log('data', data)
    loginUserMutation.mutate(data, {
      onSuccess: (res) => {
        console.log('res', res)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<StateFormType>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              const field = key as keyof StateFormType
              setError(field, {
                message: formError[field],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  }

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                name='email'
                type='email'
                register={register}
                errorMessage={errors.email?.message}
                placeholder='Email...'
                autoComplete='on'
              />

              <Input
                className='mt-3'
                name='password'
                type='password'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu...'
                autoComplete='on'
              />

              <Button className='mt-3' labelName='Đăng nhập' type='submit' />

              <div className='mt-8 flex justify-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link to='/register' className='ml-1 text-red-400'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
