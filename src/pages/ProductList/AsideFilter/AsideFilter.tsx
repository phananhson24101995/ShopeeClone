import { Link } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import path from 'src/constants/path'
import { CategoryIcon, DropDownArrowRightIcon, FilterIcon, StarIcon } from 'src/icons'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold capitalize'>
        <CategoryIcon /> Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'> </div>
      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 font-semibold text-orange'>
            <DropDownArrowRightIcon />
            Thời trang nam
          </Link>
        </li>

        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 '>
            Áo khoác
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 '>
            Áo khoác
          </Link>
        </li>
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <FilterIcon /> Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='py-5'>
        <div>Khoảng giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='đ TỪ'
              classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='đ ĐẾN'
              classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
            />
          </div>
          <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='text-sm'>Đánh giá</div>
      <div className='my-3'>
        <ul>
          <li className='flex py-1 pl-2'>
            <Link to={''} className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <StarIcon key={index} />
                ))}
            </Link>
            <span>trở lên</span>
          </li>
        </ul>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
        Xóa tất cả
      </Button>
    </div>
  )
}
