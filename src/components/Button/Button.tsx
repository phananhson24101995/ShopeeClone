interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  className: string
  labelName: string
}
function Button({ type, className, labelName }: Props) {
  return (
    <div className={className}>
      <button
        type={type}
        className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
      >
        {labelName}
      </button>
    </div>
  )
}

export default Button
