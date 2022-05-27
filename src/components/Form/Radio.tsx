import { ReactElement } from 'react'
import { Control, Controller } from 'react-hook-form'

type props = {
  list: { label?: string; value: any; component?: ReactElement }[]
  name: string
  control: Control<any, object>
}

export function Radio({ name, list, control }: props) {
  return (
    <div className="flex flex-row gap-x-4 flex-wrap">
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }) => (
          <>
            {list.map((item, index) => (
              <label className="cursor-pointer label" key={index}>
                <span className="label-text mr-2">{item.label}</span>
                <input
                  {...field}
                  type="radio"
                  className="radio"
                  // value={}
                  checked={field.value === item.value}
                  onChange={(event) => {
                    field.onChange(
                      event.target.checked ? item.value : undefined
                    )
                  }}
                />
              </label>
            ))}
          </>
        )}
      />
    </div>
  )
}
