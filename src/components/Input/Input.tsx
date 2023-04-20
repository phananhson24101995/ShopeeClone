import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type?: React.HTMLInputTypeAttribute
  register: UseFormRegister<any>
  name: string
  className?: string
  placeholder?: string
  rules?: RegisterOptions
  errorMessage?: string
  autoComplete?: string
}

function Input({ type = 'text', register, rules, className, placeholder, name, errorMessage, autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        type={type}
        placeholder={placeholder}
        {...register(name)}
        autoComplete={autoComplete}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}

export default Input
