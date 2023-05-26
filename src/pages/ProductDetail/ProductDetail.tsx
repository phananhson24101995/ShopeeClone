import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { InputNumber } from 'src/components/InputNumber'
import { ProductRating } from 'src/components/ProductRating'
import { CartIcon, ChevronLeft, ChevronRight } from 'src/icons'
import { ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import { Product } from '../ProductList/components/Product'
import { QuantityController } from 'src/components/QuantityController'

export default function ProductDetail() {
  const [buyCount, setByCount] = useState(1)
  const [activeImage, setActiveImage] = useState('')
  const [currentIndexImage, setCurrenIndexImage] = useState([0, 5])
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  const imageRef = useRef<HTMLImageElement>(null)
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [currentIndexImage, product]
  )

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    enabled: Boolean(product), // Kiểm tra nếu có product rồi thì k gọi nữa
    staleTime: 3 * 60 * 1000
  })

  console.log('productData Detail', productData)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  if (!product) return null
  console.log('product', product)

  const handleActiveImage = (img: string) => {
    setActiveImage(img)
  }

  const handlePrev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrenIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleNext = () => {
    if (currentIndexImage[1] < product.images.length) {
      setCurrenIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Lấy width height của thẻ div
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    //Lấy giá trị nguyên bản của ảnh
    const { naturalHeight, naturalWidth } = image

    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    // Sử dụng khi không thể CSS được cho component để thêm pointer-events-none vào xử lý bubble event
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
    image.style.maxWidth = 'unset'

    // Event bubble - chống sự kiện chồng chéo
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setByCount(value)
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              {/* pt-[100%] làm cho width = height */}
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  ref={imageRef}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  src={activeImage}
                  alt={product.name}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={handlePrev}
                  className='absolute left-0 top-1/2 z-20 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <ChevronLeft className='h-5 w-5' />
                </button>
                <button
                  onClick={handleNext}
                  className='absolute right-0 top-1/2 z-20 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <ChevronRight className='h-5 w-5' />
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      onMouseEnter={() => handleActiveImage(img)}
                      className='relative col-span-1 h-full w-full pt-[100%]'
                      key={img}
                    >
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
                <QuantityController
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
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

      <div className='mt-8'>
        <div className='container'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg uppercase text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mb-4 mt-8 text-sm leading-loose'>
              {/* DOMPurify.sanitize: Chống bị tấn công XSS */}
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
            </div>
          </div>
        </div>
      </div>

      {productData && (
        <div className='mt-8'>
          <div className='container'>
            <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productData.data.data.products.map((product) => (
                <div key={product._id} className='col-span-1'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
