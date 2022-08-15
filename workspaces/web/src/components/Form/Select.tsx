import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { Fragment } from 'react'
import { Control, Controller } from 'react-hook-form'
import { HiCheck, HiOutlineSelector } from 'react-icons/hi'
import { ImageWithFallback } from '../Elements/Image'

type DataType = {
  id: string | number
  name: string
  img?: string
}

type props = {
  data: DataType[]
  control: Control<any, object>
  name: string
  onChange?: (data: string | number) => void
}

const Selected = ({ data }: { data?: DataType }) => {
  const { t } = useTranslation()
  if (!data) return <></>

  const { img, name } = data
  return (
    <>
      {img && (
        <div className="flex-shrink-0 h-6 w-6 rounded-full">
          <ImageWithFallback src={img} auto alt="img" />
        </div>
      )}
      <span className={classNames(img && 'ml-3', 'block truncate')}>
        {name || t('common:select')}
      </span>
    </>
  )
}

export function Select({ name, control, data, onChange }: props) {
  const { t } = useTranslation()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Listbox
          value={data.find((item) => item.id === field.value)}
          onChange={(data) => {
            field.onChange(data?.id)
            if (onChange && data) onChange(data.id)
          }}
        >
          {({ open }) => (
            <>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <span className="flex items-center">
                    <Selected
                      data={
                        data.find((item) => item.id === field.value) || {
                          id: '',
                          name: t('common:select'),
                        }
                      }
                    />
                  </span>
                  <span
                    className={classNames(
                      data.find((item) => item.id === field.value)?.img &&
                        'ml-3',
                      'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'
                    )}
                  >
                    <HiOutlineSelector
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {data.map((data) => (
                      <Listbox.Option
                        key={data.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-blue-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={data}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              {data.img && (
                                <div className="flex-shrink-0 h-6 w-6 rounded-full">
                                  <ImageWithFallback
                                    src={data.img}
                                    auto
                                    alt="img"
                                  />
                                </div>
                              )}
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  data.img && 'ml-3',
                                  'block truncat'
                                )}
                              >
                                {data.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-blue-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <HiCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      )}
    />
  )
}
