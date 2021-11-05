import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card, Disclosure } from "@/components/Basic";
import Image from "next/image";
import { Grid, GridCol } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { WaitQuery } from "@/components/Util";
import {
  GetEventReq,
  GetEventRes,
  GetGachaReq,
  GetGachaRes,
  GET_EVENT_DETAIL,
  GET_EVENT_LIST,
  GET_GACHA_DETAIL,
} from "@/apollo/gql";
import { formatTime, formatTimeDetail, myLoader, pad } from "utils";
import { useRouter } from "next/router";
import { Table, TableBody } from "@/components/Basic";
import { Gacha, Gacha as GachaModel, GachaCategory } from "models";
import { client } from "apollo";
import { Event as EventModel } from "models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CardItem } from "@/components/elements";

export default function GachaDetail({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition("");
  const baseUrl = `ondemand/event/event_${event.id}/`;

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.event"), link: "/game/event" },
        {
          name: t("nav:game.event_detail"),
          link: `/game/event/${event.id}`,
        },
      ]}
      title={`${t("nav:game.event_detail")} - ${event.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t("event:info")}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={`${baseUrl}title_logo.png`}
              width="350"
              alt={event.id.toString()}
              height="200"
            />
            <div className="flex flex-row gap-x-2 my-2">
              <div className="badge badge-outline badge-md">{event.type}</div>
            </div>
            {event.name}
            <div className="text-gray-600">
              {`${formatTimeDetail(event.startDate)} ~ ${formatTimeDetail(
                event.endDate
              )}`}
            </div>

            <Table>
              <TableBody
                data={[
                  [t("event:id"), event.id],
                  [
                    t("event:reception_close_date"),
                    formatTimeDetail(event.receptionCloseDate),
                  ],
                  [
                    t("event:result_announcement_date"),
                    formatTimeDetail(event.resultAnnouncementDate),
                  ],
                  [
                    t("event:rank_fix_start_date"),
                    formatTimeDetail(event.rankFixStartDate),
                  ],
                  [
                    t("event:story_unlock_date"),
                    formatTimeDetail(event.storyUnlockDate),
                  ],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t("event:illustrations.name")}>
            <Disclosure title={t("event:illustrations.background")}>
              <Image
                loader={myLoader}
                src={`${baseUrl}background.jpg`}
                width="2380"
                alt={`background`}
                height="1440"
              />
            </Disclosure>
            <Disclosure title={t("event:illustrations.banner_event")}>
              <Image
                loader={myLoader}
                src={`${baseUrl}banner_event.png`}
                width="612"
                alt={`background`}
                height="200"
              />
            </Disclosure>
            <Disclosure title={t("event:illustrations.banner_event_notice")}>
              <Image
                loader={myLoader}
                src={`${baseUrl}banner_event_notice.png`}
                width="612"
                alt={`background`}
                height="200"
              />
            </Disclosure>
          </Card>
        </div>

        {event.episodeCharactersData!.length > 0 && (
          <>
            <div className="subtitle">{t("event:episode_characters")}</div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid-1">
                {event.episodeCharactersData!.map((item) => (
                  <Card
                    link={`/game/character/${item.id}`}
                    key={item.id}
                    bodyClassName="flex flex-col justify-center items-center"
                  >
                    <Image
                      loader={myLoader}
                      src={`adv/ondemand/chara_icon/adv_icon_${pad(
                        item.id,
                        3
                      )}.png`}
                      width="128"
                      alt={"card icon"}
                      height="128"
                    />
                    {item.fullNameEnglish || item.firstNameEnglish}
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  event: EventModel;
}> = async (context) => {
  const id = context.query.id;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const { data } = await client.query<GetEventRes, GetEventReq>({
    query: GET_EVENT_DETAIL,
    variables: {
      filter: {
        id: parseInt(id as string),
      },
    },
    fetchPolicy: "no-cache",
  });

  if (!data.event.length) {
    return { notFound: true };
  }

  return {
    props: {
      event: data.event[0],
    },
  };
};