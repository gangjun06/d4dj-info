import { Control, Controller } from 'react-hook-form'

type props = {
  control: Control<any, object>
  name: string
  placeholder: string
}

export function Input({ placeholder, control, name }: props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          {...field}
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
        />
      )}
    />
  )
}
