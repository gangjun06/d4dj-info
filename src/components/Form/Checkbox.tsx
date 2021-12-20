import { Control, Controller } from 'react-hook-form'

type props = {
  list: { label: string; value: string }[]
  control: Control<any, object>
  name: string
}

export function Checkbox({ name, control, list }: props) {
  return (
    <div className="flex flex-row gap-x-4 flex-wrap">
      {list.map((item, index) => (
        <Controller
          key={index}
          control={control}
          name={`${name}[${index}]`}
          render={({ field }) => (
            <label className="cursor-pointer label">
              <span className="label-text mr-2">{item.label}</span>
              <input
                {...field}
                type="checkbox"
                className="checkbox"
                value={undefined}
                checked={field.value === item.value}
                onChange={(event) => {
                  field.onChange(event.target.checked ? item.value : undefined)
                }}
              />
            </label>
          )}
        />
      ))}
    </div>
  )
}
