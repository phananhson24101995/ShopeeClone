import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  classNameInput?: string
  classNameError?: string
  rules?: RegisterOptions
  errorMessage?: string
}

function Input(props: Props) {
  const {
    register,
    rules,
    className,
    name,
    errorMessage,
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    ...rest
  } = props
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
