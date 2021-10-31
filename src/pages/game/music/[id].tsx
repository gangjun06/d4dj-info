import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card, Table, TableBody } from "@/components/Basic";
import Image from "next/image";
import { Music } from "models";
import { Grid, GridCol } from "@/components/Layout";
import { GET_MUSIC_DETAIL, GetMusicReq, GetMusicRes } from "@/apollo/gql";
import { client } from "apollo";
import { myLoader, pad } from "utils";
import { ChartViewer } from "@/components/Chart/ChartViewer";
import { ChartRadar } from "@/components/Chart";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState, useCallback } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function MusicDetail({
  music,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition("");
  const [tab, setTab] = useState<number>(0);

  const updateTab = useCallback((index) => setTab(index), []);

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.music"), link: "" },
        { name: t("nav:game.music"), link: "/game/music" },
        { name: t("nav:game.music_detail"), link: `/game/music/${music.id}` },
      ]}
      title={`${t("nav:game.music_detail")} - ${music.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t("music:info")}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={`music_jacket/music_jacket_${pad(music.id, 7)}.jpg`}
              width="128"
              alt={`image jacket`}
              height="128"
            />
            <div className="flex flex-row gap-x-2 mt-2">
              {music.chart?.map((item, index) => (
                <div className="badge badge-outline badge-md" key={index}>
                  {item.level}
                </div>
              ))}
            </div>
            <div className="mt-2">{music.name}</div>
            <div className="text-gray-600">
              {music.unit?.name} -{" "}
              {t(`music:category.${music.category.toLowerCase()}`)}
            </div>
            <Table>
              <TableBody
                data={[
                  [t("music:id"), music.id],
                  [t("music:composer"), music.composer],
                  [t("music:lyrist"), music.lyrist],
                  [t("music:arranger"), music.arranger],
                  [t("music:bpm"), music.musicBpm],
                  [t("music:startdate"), music.startDate],
                  [t("music:enddate"), music.endDate],
                  [t("music:unit"), music.unit?.name],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t("music:chart_info")}>
            <div className="tabs">
              <div className="mb-2">
                {music.chart!.map((item, index) => (
                  <div
                    key={index}
                    className={`tab tab-bordered ${
                      index === tab ? "tab-active" : ""
                    }`}
                    onClick={() => updateTab(index)}
                  >
                    {item.difficulty}
                  </div>
                ))}
              </div>
            </div>
            <Table>
              <TableBody
                data={[
                  [t("music:note_count"), music.chart![tab].noteCount],
                  [
                    t("music:chart_designer"),
                    music.chart![tab].chartDesigner?.name,
                  ],
                ]}
              />
            </Table>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="disclosure-btn">
                    {t("music:trends")}
                    <HiChevronUp
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-500">
                    <div className="max-w-sm">
                      <ChartRadar
                        labels={["NTS", "DMG", "SCR", "EFT", "TEC"]}
                        data={[
                          {
                            data: music.chart![tab].trends,
                            label: music.chart![tab].difficulty,
                          },
                        ]}
                      />
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="disclosure-btn">
                    {t("music:chart_preview")}
                    <HiChevronUp
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-500">
                    <ChartViewer chartID={music.chart![tab].id} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </Card>
        </div>
      </div>
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
