import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { InputNumber } from 'src/components/InputNumber'
import { ProductRating } from 'src/components/ProductRating'
import { CartIcon, ChevronLeft, ChevronRight } from 'src/icons'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  if (!product) return null
  console.log('product', product)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              {/* pt-[100%] làm cho width = height */}
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <ChevronLeft className='h-5 w-5' />
                </button>
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <ChevronRight className='h-5 w-5' />
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative col-span-1 h-full w-full pt-[100%]' key={img}>
                      {isActive && <div className='absolute inset-0 z-10 border-2 border-orange'></div>}
                      <img
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                        src={img}
                        alt=''
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='mx-3 flex items-center'>
                  <span className='mr-1 border-b border-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='h-4 w-4 fill-orange text-orange'
                    nonActiveClassName='h-4 w-4 fill-gray-300 text-gray-300'
                  />
                </div>

                <div className='h-6 border-r-[1px] border-r-black/[0.14]'></div>

                <div className='mx-3 flex items-center'>
                  <span className='mr-1 border-b border-black/80 text-black/80'>
                    {formatNumberToSocialStyle(product.sold)}
                  </span>
                  <span className='ml-1 text-black/40'>Đã bán</span>
                </div>
              </div>

              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} Giảm
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                    </svg>
                  </button>
                  <InputNumber
                    classNameInput='flex h-8 w-14 items-center justify-center rounded-l-sm border-b border-t border-gray-300 p-1 outline-none text-center'
                    classNameError='hidden'
                    value={1}
                    className=''
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>

              <div className='mt-8 flex items-center'>
                <button className='text flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow hover:bg-orange/5'>
                  <CartIcon className='mr-3 h-5 w-5' />
                  Thêm vào giỏ hàng
                </button>

                <button className='min-w[5rem] ml-4 flex h-12 items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='rounded bg-gray-50 p-4 text-lg uppercase text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mb-4 mt-8 text-sm leading-loose'>
            {/* DOMPurify.sanitize: Chống bị tấn công XSS */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
