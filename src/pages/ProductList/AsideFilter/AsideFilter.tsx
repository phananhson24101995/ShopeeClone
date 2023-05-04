import { useQuery } from '@tanstack/react-query'
import { Link, createSearchParams } from 'react-router-dom'
import categoryApi from 'src/apis/category.api'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import path from 'src/constants/path'
import { CategoryIcon, DropDownArrowRightIcon, FilterIcon, StarIcon } from 'src/icons'
import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/util.type'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'

interface Props {
  categoriesData: Category[]
  queryConfig: QueryConfig
}

export default function AsideFilter({ categoriesData, queryConfig }: Props) {
  const { category } = queryConfig
  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold capitalize', { 'text-orange': !category })}
      >
        <CategoryIcon /> Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'> </div>
      {categoriesData && (
        <ul className='pb-3 pt-1'>
          {categoriesData.map((categoryItem) => {
            const isActive = categoryItem._id === category
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && <DropDownArrowRightIcon />}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <FilterIcon /> Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='pb-3 pt-1'>
        <div>Khoảng giá</div>
        <form className='mt-3'>
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

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='pb-3 pt-1'>
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
      </div>

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='pb-3 pt-1'>
        <Button className='flex w-full items-center justify-center bg-orange p-2 pt-1 text-sm uppercase text-white hover:bg-orange/80'>
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}
