import { Link } from 'react-router-dom'
import { Propover } from '../Propover'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { logoutUser } from 'src/apis/auth.api'
import { BellIcon, CartIcon, HelpIcon, LanguageIcon, LogoShopee, SearchIcon, ChevronDownIcon } from 'src/icons'
import path from 'src/constants/path'

function Header() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  console.log('profile', profile)

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className=' bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Link to='/' className='mx-3 capitalize hover:text-white/70'>
              Kênh người bán
            </Link>

            <div className='h-4 border-r-[1px] border-r-white/40'></div>

            <Link to='/' className='mx-3 capitalize hover:text-white/70'>
              Tải ứng dụng
            </Link>

            <div className='h-4 border-r-[1px] border-r-white/40'></div>

            <Link to='/' className='mx-3 capitalize hover:text-white/70'>
              Kết nối
            </Link>
          </div>
          <div className='flex'>
            <div className='flex items-center'>
              <div className='mr-3 flex cursor-pointer items-center py-1 hover:text-white/70'>
                <BellIcon />
                <span className='mx-1'>Thông báo</span>
              </div>
            </div>

            <div className='flex items-center'>
              <div className='mr-3 flex cursor-pointer items-center py-1 hover:text-white/70'>
                <HelpIcon />
                <span className='mx-1'>Hỗ trợ</span>
              </div>
            </div>

            <Propover
              placement='bottom-end'
              as='span'
              className='mr-3 flex cursor-pointer items-center py-1 hover:text-white/70'
              renderPropover={
                <div className='relative flex flex-col rounded-sm bg-white px-2 py-1 pl-2 pr-32 shadow-md'>
                  <button className='flex flex-col px-3 py-3 hover:text-orange'>Tiếng Việt</button>
                  <button className='flex flex-col px-3 py-3 hover:text-orange'>English</button>
                </div>
              }
            >
              <LanguageIcon />
              <span className='mx-1'>Tiếng Việt</span>
              <ChevronDownIcon />
            </Propover>

            {isAuthenticated && (
              <Propover
                placement='bottom'
                as='span'
                renderPropover={
                  <div className='mr-3 flex flex-col rounded-sm bg-white px-2 py-1 shadow-md'>
                    <Link to={path.profile} className='flex flex-col px-3 py-3 hover:text-cyan-500'>
                      Tài Khoản Của Tôi
                    </Link>
                    <button className='flex flex-col px-3 py-3 hover:text-cyan-500'>Đơn Mua</button>
                    <button onClick={handleLogout} className='flex flex-col px-3 py-3 hover:text-cyan-500'>
                      Đăng Xuất
                    </button>
                  </div>
                }
                className='ml-3 flex cursor-pointer items-center py-1 hover:text-white/70'
              >
                <div className='mr-2 h-5 w-5 flex-shrink-0'>
                  <img
                    src='https://down-vn.img.susercontent.com/file/7ed5792e0a57bc24746c4e1f490d2a67_tn'
                    alt='avatar'
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
                <span className='mx-1'>{profile?.email}</span>
              </Propover>
            )}

            {!isAuthenticated && (
              <div className='flex items-center'>
                <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                  Đăng ký
                </Link>
                <div className='h-4 border-r-[1px] border-r-white/40'></div>
                <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className='grid grid-cols-12 items-end gap-4 pb-3 pt-4'>
          <Link to='/' className='col-span-2'>
            <LogoShopee />
          </Link>

          <form className='col-span-9'>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                placeholder='SALE SỐC DƯỚI 250.000Đ'
                type='text'
                name='search'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
              />

              <button className='flex-shrink-0 rounded-sm bg-orange px-6 hover:opacity-90'>
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Propover
              placement='bottom-end'
              renderPropover={
                <div className='rounded-sm bg-white shadow-sm'>
                  <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        <div className='mt-2 flex py-2 hover:bg-gray-100'>
                          <div className='flex-shrink-0'>
                            <img
                              src='https://down-vn.img.susercontent.com/file/sg-11134201-22100-xht2eg8eqhivf7_tn'
                              alt='img'
                              className='h-11 w-11 object-cover
                              '
                            />
                          </div>
                          <div className='ml-2 flex-grow overflow-hidden'>
                            <div className='truncate'>Giường xếp văn phòng ngủ trưa</div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-orange'>đ200000</span>
                          </div>
                        </div>
                      </div>

                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>Thêm vào giỏ hàng</div>
                        <button className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:text-white/70'>
                          Xem giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/' className='relative'>
                <CartIcon />
              </Link>
            </Propover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
