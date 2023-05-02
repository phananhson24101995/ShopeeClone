import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // type?: React.HTMLInputTypeAttribute
  register?: UseFormRegister<any>
  classNameInput?: string
  classNameError?: string
  // name: string
  // className?: string
  // placeholder?: string
  rules?: RegisterOptions
  errorMessage?: string
  // autoComplete?: string
}

function Input(props: Props) {
  const {
    register,
    rules,
    className,
    type,
    placeholder,
    name,
    autoComplete,
    errorMessage,
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
  } = props
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        className={classNameInput}
        type={type}
        placeholder={placeholder}
        {...registerResult}
        autoComplete={autoComplete}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
