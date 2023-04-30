import { ButtonHTMLAttributes } from 'react'
import { LoaddingIcon } from 'src/icons'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}
function Button(props: Props) {
  const { className, isLoading, disabled, children, ...rest } = props
  const newClassName = disabled ? className + ' cursor-not-allowed' : className
  return (
    <button className={newClassName} {...rest} disabled={disabled}>
      {isLoading && <LoaddingIcon />}
      <span>{children}</span>
    </button>
  )
  // return (
  //   <div className={className}>
  //     <button
  //       type={type}
  //       className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
  //     >
  //       {labelName}
  //     </button>
  //   </div>
  // )
}

export default Button
