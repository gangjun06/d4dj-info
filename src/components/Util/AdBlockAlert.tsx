// import { AdBlockDetectedWrapper } from 'adblock-detect-react'
import useTranslation from 'next-translate/useTranslation'

export const AdBlockAlert = () => {
  const { t } = useTranslation()
  return <></>
  // <AdBlockDetectedWrapper>
  //   <TempModal id="ad-block-alert">
  //     {t('common:adblock')
  //       .split('\n')
  //       .map((item, index) => (
  //         <Fragment key={index}>
  //           {item}
  //           <br />
  //         </Fragment>
  //       ))}
  //   </TempModal>
  // </AdBlockDetectedWrapper>
}
