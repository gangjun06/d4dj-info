import setLanguage from 'next-translate/setLanguage'
import useTransition from 'next-translate/useTranslation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from './Basic'
import { Button, FormBlock, Radio } from './Form'

export const SettingContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null)

type FormData = {
  lang: string
}

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<boolean>(false)
  const { t, lang } = useTransition()
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      lang,
    },
  })

  const onSubmit = handleSubmit((data) => {
    setLanguage(data.lang)
    localStorage.setItem('lang', data.lang)
    setState(false)
  })

  const onClose = () => {
    setState(false)
  }

  return (
    <SettingContext.Provider value={[state, setState]}>
      <Modal
        show={state}
        onClose={onClose}
        title={'Settings'}
        actions={<Button onClick={onSubmit}>{t('common:save')}</Button>}
      >
        <FormBlock label={t('common:language')}>
          <Radio
            control={control}
            name="lang"
            list={[
              { label: 'Korean', value: 'ko' },
              { label: 'English', value: 'en' },
            ]}
          />
        </FormBlock>
      </Modal>
      {children}
    </SettingContext.Provider>
  )
}
