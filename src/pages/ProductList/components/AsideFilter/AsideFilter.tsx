import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/Button'
import path from 'src/constants/path'
import { CategoryIcon, DropDownArrowRightIcon, FilterIcon, StarIcon } from 'src/icons'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../../ProductList'
import classNames from 'classnames'
import { InputNumber } from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/util.type'
import { RatingStar } from '../RatingStar'
import { omit } from 'lodash'

interface Props {
  categoriesData: Category[]
  queryConfig: QueryConfig
}

/**
 * Rule Validate
 * Nếu có price_min và price_max thì giá price_max >= price_min
 * Còn không thì có price_min thì không có price_max và ngược lại
 */
type FormDate = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ categoriesData, queryConfig }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset
  } = useForm<FormDate>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

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
        <form className='mt-3' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='đ TỪ'
                  classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  classNameError='hidden'
                  className='grow'
                  placeholder='đ ĐẾN'
                  classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='pb-3 pt-1'>
        <div className='text-sm'>Đánh giá</div>
        <div className='my-3'>
          <RatingStar queryConfig={queryConfig} />
        </div>
      </div>

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='pb-3 pt-1'>
        <Button
          onClick={handleRemoveAll}
          className='flex w-full items-center justify-center bg-orange p-2 pt-1 text-sm uppercase text-white hover:bg-orange/80'
        >
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}
