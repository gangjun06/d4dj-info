import axios from 'axios'
import useTransition from 'next-translate/useTranslation'
import { useEffect, useMemo, useState } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { formatNumber } from 'utils'
import { Card, Modal, Table, TableBody, TableHead } from '../../Basic'

export const UnitExpCard = () => {
  const { t } = useTransition('')

  const [expData, setExpData] = useState<any | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const expTableData = useMemo(() => {
    if (!expData) return []
    return Object.keys(expData).map((item: any) => [
      expData[item].Level,
      formatNumber(expData[item].TotalExp),
    ])
  }, [expData])

  useEffect(() => {
    axios
      .get('https://cdn.d4dj.info/jp/Master/UnitExpMaster.json')
      .then((res) => setExpData(res.data))
  }, [])

  return (
    <>
      <Modal
        title={t('exp:unitExp')}
        show={show}
        onClose={() => setShow(false)}
        showCloseBtn
      >
        <Table>
          <TableHead data={[t('exp:level'), t('exp:exp')]} />
          <TableBody data={expTableData} />
        </Table>
      </Modal>
      <Card
        title={t('exp:unitExp')}
        right={
          <HiOutlineInformationCircle
            size={22}
            className="cursor-pointer"
            onClick={() => setShow(true)}
          />
        }
      >
        <div>{t('exp:clickGuide')}</div>
      </Card>
    </>
  )
}
