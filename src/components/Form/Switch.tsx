import { Switch as HSwitch } from '@headlessui/react'

type props = {
  label: string
  checked: boolean
  onChange: (d: boolean) => void
}

export function Switch({ label, checked, onChange }: props) {
  return (
    <HSwitch.Group>
      <div className="flex justify-start gap-x-5 items-center">
        <HSwitch.Label className="text-sm font-medium text-gray-700">
          {label}
        </HSwitch.Label>
        <div>
          <HSwitch
            checked={checked}
            onChange={onChange}
            className={`${
              checked ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">{label}</span>
            <span
              className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </HSwitch>
        </div>
      </div>
    </HSwitch.Group>
  )
}
