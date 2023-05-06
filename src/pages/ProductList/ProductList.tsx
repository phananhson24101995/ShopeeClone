import { useQuery } from '@tanstack/react-query'
import { AsideFilter } from './components/AsideFilter'
import Product from './components/Product/Product'
import { SortProductList } from './components/SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product.api'
import { Pagination } from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import { omitBy, isUndefined } from 'lodash'
import categoryApi from 'src/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function ProductList() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  // Get Products
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true // Không set data về undefined để tránh load lại UI
  })

  // Get Categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategoties()
    },
    keepPreviousData: true // Không set data về undefined để tránh load lại UI
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categoriesData={categoriesData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
