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
  GET_MUSIC_DETAIL,
  GetMusicReq,
  GetMusicRes,
} from "@/apollo/gql";
import {
  AttributeCheckbox,
  CardRearityCheckbox,
  UnitCheckbox,
} from "utils/constants";
import { myLoader, pad } from "utils";
import { ChartViewer } from "@/components/ChartViewer";
import { useRouter } from "next/router";
import { Radar } from "react-chartjs-2";
import axios from "axios";

export default function CardDetail() {
  const { t } = useTransition("");
  const router = useRouter();
  const { id } = router.query;
  // const [chartData, setChartData] = useState<object | null>(null);
  useEffect(() => {
    // (async () => {
    //   const res = await axios.get(
    //     `https://asset.d4dj.info/ondemand/chart/chart_${pad(
    //       parseInt(id as string),
    //       8
    //     )}`
    //   );
    //   setChartData(res.data);
    // })();
  }, [id]);
  const { data, loading, error } = useQuery<GetMusicRes, GetMusicReq>(
    GET_MUSIC_DETAIL,
    {
      variables: {
        filter: {
          id: parseInt(id as string),
        },
      },
    }
  );
  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.music"), link: "" },
        { name: t("nav:game.music"), link: "/game/music" },
        { name: t("nav:game.music_detail"), link: `/game/music/${id}` },
      ]}
      title={`${t("nav:game.music_detail")}${
        data && data.music.length
          ? ` - ${data.music[0].name}`
          : "Music Not Found"
      }`}
    >
      {/* {chartData && <ChartViewer chartData={chartData} />} */}
      <WaitQuery loading={loading} error={error}>
        <Grid cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
          <GridCol row={3}>
            <Card title={t("music:info")}>
              <div className="grid grid-cols-2">
                <div>{t("music:id")}</div>
                <div>{data?.music[0].id}</div>
              </div>
            </Card>
          </GridCol>
          <GridCol row={3}>
            <Card>
              <div>
                <Radar
                  data={{
                    labels: [
                      "Eating",
                      "Drinking",
                      "Sleeping",
                      "Designing",
                      "Running",
                    ],
                    datasets: [
                      {
                        label: "Chart",
                        data: data?.music[0].chart![3].trends,
                        fill: true,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgb(255, 99, 132)",
                        pointBackgroundColor: "rgb(255, 99, 132)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(255, 99, 132)",
                      },
                    ],
                  }}
                />
              </div>
            </Card>
          </GridCol>
          <GridCol row={3}>
            <Card>
              <div></div>
            </Card>
          </GridCol>
        </Grid>
      </WaitQuery>
    </MainLayout>
  );
}
