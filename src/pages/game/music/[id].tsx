import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card } from "@/components/Basic";
import Image from "next/image";
import { Music } from "models";
import { Grid, GridCol } from "@/components/Layout";
import { GET_MUSIC_DETAIL, GetMusicReq, GetMusicRes } from "@/apollo/gql";
import { client } from "apollo";
import { myLoader, pad } from "utils";
import { ChartViewer } from "@/components/Chart/ChartViewer";
import { ChartRadar } from "@/components/Chart";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function CardDetail({
  music,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition("");
  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.music"), link: "" },
        { name: t("nav:game.music"), link: "/game/music" },
        { name: t("nav:game.music_detail"), link: `/game/music/${music.id}` },
      ]}
      title={`${t("nav:game.music_detail")} - ${music.name}`}
    >
      {/* {chartData && <ChartViewer chartData={chartData} />} */}
      <Grid cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
        <GridCol row={3}>
          <Card
            title={t("music:info")}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={`music_jacket/music_jacket_${pad(music.id, 7)}.jpg`}
              alt="music jacket"
              width="128"
              height="128"
            />
            <div className="mt-2">{music.name}</div>
            <div className="flex ">{/* <div>{t("music:id")}</div> */}</div>
          </Card>
        </GridCol>
        <GridCol row={3}>
          <Card title={t("music:chart_info")}>
            <ChartRadar
              labels={["NTS", "DMG", "SCR", "EFT", "TEC"]}
              data={
                music.chart?.map((item) => ({
                  data: item.trends,
                  label: item.difficulty,
                })) || []
              }
            />
          </Card>
        </GridCol>
        <GridCol row={3}>
          <Card title={t("music:chart_preview")}>
            <div className="tabs">
              <div>
                {music.chart!.map((item) => (
                  <a className="tab tab-bordered" key={item.id}>
                    {item.difficulty}
                  </a>
                ))}
              </div>
              {/* <a className="tab tab-bordered tab-active">Tab 2</a> */}
            </div>
          </Card>
        </GridCol>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{ music: Music }> = async (
  context
) => {
  const id = context.query.id;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const { data } = await client.query<GetMusicRes, GetMusicReq>({
    query: GET_MUSIC_DETAIL,
    variables: {
      filter: {
        id: parseInt(id as string),
      },
    },
  });

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      music: data.music[0],
    },
  };
};
