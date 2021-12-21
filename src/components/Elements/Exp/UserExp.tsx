import axios from 'axios'
import useTransition from 'next-translate/useTranslation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { formatNumber } from 'utils'
import { Card, Modal, Table, TableBody, TableHead } from '../../Basic'
import { FormBlock } from '../../Form'

type UserExpData = {
  curLevel: string
  curLevelPercent: string
  expPerPlay: string
  targetLevel: string
}

export const UserExpCard = () => {
  const { t } = useTransition('')

  const { register, handleSubmit } = useForm<UserExpData>({
    defaultValues: {
      curLevel: '100',
      curLevelPercent: '0',
      expPerPlay: '8000',
      targetLevel: '250',
    },
  })

  const [reqExp, setReqExp] = useState<number>(0)
  const [reqGame, setReqGame] = useState<number>(0)
  const [expData, setExpData] = useState<any | null>(null)

  const [show, setShow] = useState<boolean>(false)

  const expTableData = useMemo(() => {
    if (!expData) return []
    return Object.keys(expData).map((item: any) => [
      expData[item].Level,
      formatNumber(expData[item].TotalExp),
      expData[item].MaxFriendCount,
    ])
  }, [expData])

  useEffect(() => {
    axios
      .get('https://asset.d4dj.info/Master/UserExpMaster.json')
      .then((res) => setExpData(res.data))
  }, [])

  const onSubmit = handleSubmit((data) => {
    try {
      const { curLevel, curLevelPercent, expPerPlay, targetLevel } = data
      const totalExp = expData[targetLevel.toString()].TotalExp
      const curLevelExp = expData[curLevel.toString()].TotalExp
      const curExp =
        (expData[(parseInt(curLevel) + 1).toString()].TotalExp - curLevelExp) *
          (parseInt(curLevelPercent) / 100) +
        curLevelExp
      const req = totalExp - curExp
      setReqExp(req)
      setReqGame(~~(req / parseInt(expPerPlay)))
    } catch (e) {
      setReqExp(-1)
      setReqGame(-1)
    }
  })

  return (
    <>
      <Modal
        title={t('exp:userExp')}
        show={show}
        onClose={() => setShow(false)}
        showCloseBtn
      >
        <Table>
          <TableHead
            data={[t('exp:level'), t('exp:exp'), t('exp:maxFriend')]}
          />
          <TableBody data={expTableData} />
        </Table>
      </Modal>
      <Card
        title={t('exp:userExp')}
        left={
          <HiOutlineInformationCircle
            size={22}
            className="cursor-pointer"
            onClick={() => setShow(true)}
          />
        }
      >
        <form onSubmit={onSubmit}>
          <div className="sm:flex flex-wrap gap-x-2">
            <FormBlock label={t('exp:curLevel')} className="flex-1">
              <label className="input-group input-group-sm">
                <input
                  type="number"
                  min="1"
                  max="249"
                  placeholder="100"
                  className="input input-bordered input-sm w-full"
                  {...register('curLevel')}
                />
                <span>Lv.</span>
              </label>
            </FormBlock>
            <FormBlock label={t('exp:curLevelPercent')} className="flex-1">
              <label className="input-group input-group-sm">
                <input
                  type="number"
                  placeholder="100"
                  min={0}
                  max={100}
                  step={5}
                  className="input input-bordered input-sm w-full"
                  {...register('curLevelPercent')}
                />
                <span>%</span>
              </label>
            </FormBlock>
          </div>
          <div className="sm:flex flex-wrap gap-x-2 w-full">
            <FormBlock label={t('exp:expPerPlay')} className="flex-1">
              <label className="input-group input-group-sm">
                <input
                  type="number"
                  placeholder="8000"
                  step={500}
                  className="input input-bordered input-sm w-full"
                  {...register('expPerPlay')}
                />
                <span>Exp.</span>
              </label>
            </FormBlock>
            <FormBlock label={t('exp:targetLevel')} className="flex-1">
              <label className="input-group input-group-sm">
                <input
                  type="number"
                  placeholder="1~250"
                  max={250}
                  className="input input-bordered input-sm w-full"
                  {...register('targetLevel')}
                />
                <span>Lv.</span>
              </label>
            </FormBlock>
          </div>
          <div className="flex justify-between items-center">
            <div>{`${t('exp:reqExp')}: ${reqExp}`}</div>
            <div>{`${t('exp:reqGame')}: ${reqGame}`}</div>
            <button
              className="btn btn-sm btn-primary btn-outline"
              type="submit"
            >
              {t('common:calculate')}
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}
