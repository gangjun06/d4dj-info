import { UseFormRegister } from 'react-hook-form'

type props = {
  name: string
  list: { label: string; value: any }[]
  register: UseFormRegister<any>
}

export const Checkbox = ({ name, list, register }: props) => {
  return (
    <div className="flex flex-row gap-x-4 flex-wrap py-1">
      {list.map(({ label, value }, index) => (
        <label key={index} className="flex items-center gap-x-2 select-none">
          <span className="cursor-pointer">{label}</span>
          <input
            {...register!(`${name}[${index}]`)}
            value={value}
            type="checkbox"
          />
        </label>
      ))}
    </div>
  )
}
