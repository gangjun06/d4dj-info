import { Modal } from '@/components/Basic/Modal'
import { Button, FormBlock, Radio } from '@/components/Form'
import { getRegionCookie, setRegionCookie } from '@/lib/cookies'
import { Region } from '@/models/index'
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
  const [region, setRegion] = useState<Region>(() => getRegionCookie())
  const { t, lang } = useTransition()

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      lang: lang ?? 'jp',
      region,
    },
  })

  const onSubmit = handleSubmit((data) => {
    if (!data.lang) return
    setLanguage(data.lang)
    localStorage.setItem('lang', data.lang)
    setRegionStore(data.region as Region)
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
      setRegion(region)
      setRegionCookie(region)
    },
    [setRegion]
  )

  return (
    <SettingContext.Provider
      value={{ show, openSetting, region, setRegion: setRegionStore }}
    >
      <Modal
        show={show}
        wrapper={(children) => <form onSubmit={onSubmit}>{children}</form>}
        onClose={onClose}
        title={'Settings'}
        showCloseBtn
        actions={
          <Button type="Primary" submit>
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
        <FormBlock label={t('common:region')}>
          <Radio
            control={control}
            name="region"
            list={[
              { label: 'Global', value: 'en' },
              { label: 'Japan', value: 'jp' },
            ]}
            // list={(Object.keys(Region) as Array<keyof typeof Region>).map(
            //   (key) => ({ label: key, value: Region[key] })
            // )}
          />
        </FormBlock>
      </Modal>
      {children}
    </SettingContext.Provider>
  )
}
