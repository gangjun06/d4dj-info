import { UseFormRegister } from 'react-hook-form'

type props = {
  register: UseFormRegister<any>
  name: string
  placeholder: string
}

export function Input({ placeholder, register, name }: props) {
  return (
    <input
      {...register(name)}
      type="text"
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      placeholder={placeholder}
    />
  )
}
