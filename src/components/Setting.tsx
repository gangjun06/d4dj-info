import { Region } from '@/models/index'
import Cookies from 'js-cookie'
import setLanguage from 'next-translate/setLanguage'
import useTransition from 'next-translate/useTranslation'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { loadRegion } from 'utils'
import { Modal } from './Basic'
import { Button, FormBlock, Radio } from './Form'

type ContextType = {
  show: boolean
  openSetting: () => void
  region: Region
  setRegion: (region: Region) => void
}

export const SettingContext = createContext<Partial<ContextType>>({})

export const useSetting = () => useContext(SettingContext)

type FormData = {
  lang: string
  region: string
}

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(false)
  const [region, setRegion] = useState<Region>(() => loadRegion())
  const { t, lang } = useTransition()

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      lang,
      region,
    },
  })

  const onSubmit = handleSubmit((data) => {
    setLanguage(data.lang)
    localStorage.setItem('lang', data.lang)
    setShow(false)
  })

  const openSetting = useCallback(() => {
    setShow(true)
  }, [setShow])

  const onClose = useCallback(() => {
    setShow(false)
  }, [setShow])

  const setRegionStore = useCallback(
    (region: Region) => {
      Cookies.set('region', region)
      setRegion(region)
    },
    [setRegion]
  )

  return (
    <SettingContext.Provider
      value={{ show, openSetting, region, setRegion: setRegionStore }}
    >
      <Modal
        show={show}
        onClose={onClose}
        title={'Settings'}
        showCloseBtn
        actions={
          <Button type="Primary" onClick={onSubmit}>
            {t('common:save')}
          </Button>
        }
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
        <FormBlock label={t('common:Region')}>
          <Radio
            control={control}
            name="region"
            list={(Object.keys(Region) as Array<keyof typeof Region>).map(
              (key) => ({ label: key, value: Region[key] })
            )}
          />
        </FormBlock>
      </Modal>
      {children}
    </SettingContext.Provider>
  )
}
