import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input } from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { Button } from 'src/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/util.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { AuthResponse } from 'src/types/auth.type'

// interface StateFormType {
//   email: string
//   password: string
// }

type StateFormType = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<StateFormType>({
    resolver: yupResolver(loginSchema)
  })

  const loginUserMutation = useMutation({
    mutationFn: (body: StateFormType) => authApi.loginUser(body)
  })

  const onSubmit = (data: StateFormType) => {
    loginUserMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        console.log(data)
        setProfile((data.data as AuthResponse).data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<StateFormType>>(error)) {
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

              <Button
                type='submit'
                className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                isLoading={loginUserMutation.isLoading}
                disabled={loginUserMutation.isLoading}
              >
                Đăng nhập
              </Button>

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
