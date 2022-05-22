import { ReactElement } from 'react'
import { UseFormRegister } from 'react-hook-form'

type props = {
  list: { label?: string; value: any; component?: ReactElement }[]
  name: string
  register?: UseFormRegister<any>
}

export function Radio({ name, list, register }: props) {
  return (
    <div className="flex flex-row gap-x-4 flex-wrap">
      {list.map(({ label, value, component }, index) => (
        <label
          className="flex items-center gap-x-2 gap-y-1.5 cursor-pointer select-none"
          key={index}
        >
          <span>
            {label} {component}
          </span>
          <input
            {...register!(name)}
            type="radio"
            className="radio"
            value={value}
          />
        </label>
      ))}
    </div>
  )
}
