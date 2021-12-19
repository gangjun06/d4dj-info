import axios from "axios";
import useTransition from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Modal, Table, TableBody, TableHead } from "../Basic";
import { FormBlock } from "../Form";
import { HiOutlineInformationCircle } from "react-icons/hi";

type UserExpData = {
  curLevel: string;
  curLevelPercent: string;
  expPerPlay: string;
  targetLevel: string;
};

export const UserExpCard = () => {
  const { t } = useTransition("");

  const { register, control, getValues, handleSubmit } = useForm<UserExpData>({
    defaultValues: {
      curLevel: "100",
      curLevelPercent: "0",
      expPerPlay: "8000",
      targetLevel: "250",
    },
  });

  const [reqExp, setReqExp] = useState<number>(0);
  const [reqGame, setReqGame] = useState<number>(0);
  const [expData, setExpData] = useState<any | null>(null);

  const [show, setShow] = useState<boolean>(false);

  const expTableData = useMemo(() => {
    if (!expData) {
      return [];
    }
    return Object.keys(expData).map((item: any) => [
      expData[item].Level,
      expData[item].TotalExp,
      expData[item].MaxFriendCount,
    ]);
  }, [expData]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://asset.d4dj.info/Master/UserExpMaster.json"
      );
      setExpData(res.data);
    })();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    let { curLevel, curLevelPercent, expPerPlay, targetLevel } = data;
    const totalExp = expData[targetLevel.toString()].TotalExp;
    const curLevelExp = expData[curLevel.toString()].TotalExp;
    const curExp =
      (expData[(parseInt(curLevel) + 1).toString()].TotalExp - curLevelExp) *
        (parseInt(curLevelPercent) / 100) +
      curLevelExp;
    const req = totalExp - curExp;
    setReqExp(req);
    setReqGame(~~(req / parseInt(expPerPlay)));
  });

  return (
    <>
      <Modal show={show} onClose={() => setShow(false)} showCloseBtn>
        <Table>
          <TableHead
            data={[t("exp:level"), t("exp:exp"), t("exp:maxFriend")]}
          />
          <TableBody data={expTableData} />
        </Table>
      </Modal>
      <Card
        title={t("exp:userExp")}
        left={
          <HiOutlineInformationCircle
            size={22}
            className="cursor-pointer"
            onClick={() => setShow(true)}
          />
        }
      >
        <form onSubmit={onSubmit}>
          <div className="flex gap-x-2">
            <FormBlock label={t("exp:curLevel")}>
              <input
                type="number"
                min="1"
                max="250"
                placeholder="100"
                className="input input-bordered input-sm"
                {...register("curLevel")}
              />
            </FormBlock>
            <FormBlock label={t("exp:curLevelPercent")}>
              <input
                type="number"
                placeholder="100"
                min={0}
                max={100}
                step={5}
                className="input input-bordered input-sm"
                {...register("curLevelPercent")}
              />
            </FormBlock>
          </div>
          <div className="flex gap-x-2">
            <FormBlock label={t("exp:expPerPlay")}>
              <input
                type="number"
                placeholder="8000"
                step={500}
                className="input input-bordered input-sm"
                {...register("expPerPlay")}
              />
            </FormBlock>
            <FormBlock label={t("exp:targetLevel")}>
              <input
                type="number"
                placeholder="1~250"
                max={250}
                className="input input-bordered input-sm"
                {...register("targetLevel")}
              />
            </FormBlock>
          </div>
          <div className="flex justify-between items-center">
            <div>{`${t("exp:reqExp")}: ${reqExp}`}</div>
            <div>{`${t("exp:reqGame")}: ${reqGame}`}</div>
            <button
              className="btn btn-sm btn-primary btn-outline"
              type="submit"
            >
              {t("common:calculate")}
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};
