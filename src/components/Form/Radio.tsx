import { UseFormRegister } from 'react-hook-form'

type props = {
  list: { label: string; value: any }[]
  name: string
  register?: UseFormRegister<any>
}

export function Radio({ name, list, register }: props) {
  return (
    <div className="flex flex-row gap-x-4 flex-wrap">
      {list.map(({ label, value }, index) => (
        <label className="flex items-center gap-x-2 cursor-pointer" key={index}>
          <span>{label}</span>
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
