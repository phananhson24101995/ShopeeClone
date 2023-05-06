import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { StarIcon, StarIconWhite } from 'src/icons'
import { QueryConfig } from '../ProductList'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStar({ queryConfig }: Props) {
  const navigate = useNavigate()
  const handleFilterStar = (rating_filter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: rating_filter.toString()
      }).toString()
    })
  }
  return (
    <ul>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index}>
              <li className='flex py-1 pl-2'>
                <div
                  className='flex cursor-pointer items-center text-sm'
                  onClick={() => handleFilterStar(5 - index)}
                  aria-hidden
                  tabIndex={0}
                  role='button'
                >
                  {Array(5)
                    .fill(0)
                    .map((_, indexStar) => {
                      if (indexStar < 5 - index) {
                        return <StarIcon key={indexStar} />
                      }
                      return <StarIconWhite key={indexStar} />
                    })}
                </div>
                {index !== 0 && <span>trở lên</span>}
              </li>
            </div>
          )
        })}
    </ul>
  )
}
