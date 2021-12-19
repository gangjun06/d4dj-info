import axios from "axios";
import { Event } from "models";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useForm, useFormState, useWatch } from "react-hook-form";
import { formatTime, myLoader } from "utils";
import { Card } from "../Basic";
import { FormBlock } from "../Form";

type UserExpData = {
  curLevel: number;
  curLevelPercent: number;
  expPerPlay: number;
  targetLevel: number;
};

export const UserExpCard = () => {
  const { register, control, getValues, handleSubmit } = useForm<UserExpData>({
    defaultValues: {
      curLevel: 100,
      curLevelPercent: 0,
      expPerPlay: 8000,
      targetLevel: 250,
    },
  });

  const [reqExp, setReqExp] = useState<number>(0);
  const [reqGame, setReqGame] = useState<number>(0);
  const [expData, setExpData] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://asset.d4dj.info/Master/UserExpMaster.json"
      );
      setExpData(res.data);
    })();
  }, []);

  const onSubmit = handleSubmit((data) => {
    let { curLevel, curLevelPercent, expPerPlay, targetLevel } = data;
    const req =
      expData[targetLevel.toString()].TotalExp -
      expData[curLevel.toString()].TotalExp;
    setReqExp(req);
    setReqGame(~~(req / expPerPlay));
  });

  return (
    <Card title="User Exp">
      <form onSubmit={onSubmit}>
        <div className="flex gap-x-2">
          <FormBlock label={"Current Level"}>
            <input
              type="number"
              min="1"
              max="250"
              placeholder="100"
              className="input input-bordered input-sm"
              {...register("curLevel")}
            />
          </FormBlock>
          <FormBlock label={"Current Level Percent"}>
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
          <FormBlock label={"Exp Per Play"}>
            <input
              type="number"
              placeholder="8000"
              step={500}
              className="input input-bordered input-sm"
              {...register("expPerPlay")}
            />
          </FormBlock>
          <FormBlock label={"Target Level"}>
            <input
              type="number"
              placeholder="8000"
              value={8000}
              max={250}
              className="input input-bordered input-sm"
              {...register("targetLevel")}
            />
          </FormBlock>
        </div>

        <div>{reqExp}</div>
        <div>{reqGame}</div>
        <button className="btn btn-sm btn-primary btn-outline" type="submit">
          Calculate
        </button>
      </form>
    </Card>
  );
};
