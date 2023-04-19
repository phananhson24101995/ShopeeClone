import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input } from 'src/components/Input'
import { getRules } from 'src/utils/rules'
import { Button } from 'src/components/Button'

interface StateFormType {
  email: string
  password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<StateFormType>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log('data', data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                name='email'
                type='email'
                register={register}
                rules={rules.email}
                errorMessage={errors.email?.message}
                placeholder='Email...'
                autoComplete='on'
              />

              <Input
                className='mt-3'
                name='password'
                type='password'
                register={register}
                rules={rules.password}
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
