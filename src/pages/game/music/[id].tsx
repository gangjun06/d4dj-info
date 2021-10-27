import { useEffect, useState } from "react";
import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card } from "@/components/Basic";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Checkbox, FormBlock } from "@/components/Form";
import { cleanArray, cleanArrayWithInt } from "utils/array";
import { Attribute } from "models";
import { Grid, GridCol } from "@/components/Layout";
import { gql, useQuery } from "@apollo/client";
import { WaitQuery } from "@/components/Util";
import {
  GET_CARD_LIST,
  GetCardReq,
  GetCardRes,
  GET_CARD_DETAIL,
} from "@/apollo/gql";
import {
  AttributeCheckbox,
  CardRearityCheckbox,
  UnitCheckbox,
} from "utils/constants";
import { myLoader, pad } from "utils";
import { ChartViewer } from "@/components/ChartViewer";
import { useRouter } from "next/router";
import axios from "axios";

export default function CardDetail() {
  const { t } = useTransition("");
  const router = useRouter();
  const { id } = router.query;
  const [chartData, setChartData] = useState<object | null>(null);
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://asset.d4dj.info/ondemand/chart/chart_${pad(
          parseInt(id as string),
          8
        )}`
      );
      setChartData(res.data);
    })();
  }, [id]);
  // const { data, loading, error } = useQuery<GetCardRes, GetCardReq>(
  //   GET_CARD_DETAIL,
  //   {
  //     variables: {
  //       filter: {
  //         id: id as string,
  //       },
  //     },
  //   }
  // );
  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.music"), link: "" },
        { name: t("nav:game.music"), link: "/game/music" },
        { name: t("nav:game.music_detail"), link: `/game/music/${id}` },
      ]}
      title={"a"}
      // title={`${t("nav:game.card_detail")}${
      //   data
      //     ? ` - ${data.card[0].cardName} (${
      //         data.card[0].character?.fullNameEnglish ||
      //         data.card[0].character?.firstNameEnglish
      //       })`
      //     : ""
      // }`}
    >
      {chartData && <ChartViewer chartData={chartData} />}
      {/* <WaitQuery loading={loading} error={error}>
        <Grid cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
          <GridCol row={3}>
            <Card title={t("card:info")}>
              <div className="grid grid-cols-2">
                <div>{t("card:id")}</div>
                <div>{data?.card[0].id}</div>
              </div>
            </Card>
          </GridCol>
          <GridCol row={3}>
            <Card>
              <div></div>
            </Card>
          </GridCol>
          <GridCol row={3}>
            <Card>
              <div></div>
            </Card>
          </GridCol>
        </Grid> */}
      {/* </WaitQuery> */}
      {/* <WaitQuery loading={loading} error={error}>
        <Grid>
          {data?.card.map((item, index) => {
            return (
              <Card
                key={index}
                bodyClassName="flex justify-center items-center flex-col gap-2"
              >
                <Image
                  loader={myLoader}
                  src={`ondemand/card_icon/card_icon_${pad(
                    parseInt(item.id),
                    9
                  )}_0.jpg`}
                  width="128"
                  alt={item.id}
                  height="128"
                />

                <div>
                  ({item.attribute}) {item.cardName}
                </div>
              </Card>
            );
          })}
        </Grid>
      </WaitQuery> */}
    </MainLayout>
  );
}
