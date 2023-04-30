import { Link, useMatch } from 'react-router-dom'
import { LogoShopee } from 'src/icons'

function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegisterMatch = Boolean(registerMatch)

  return (
    <header className='py-5'>
      <div className='container'>
        {/* item-end: Căn chỉnh các item vào cuối của vùng chứa */}
        <nav className='flex items-end'>
          <Link to={'/'}>
            <LogoShopee fillColor='fill-orange' />
          </Link>

          <div className='ml-5 text-xl lg:text-2xl'>{isRegisterMatch ? 'Đăng ký' : 'Đăng nhập'}</div>
        </nav>
      </div>
    </header>
  )
}

export default RegisterHeader
