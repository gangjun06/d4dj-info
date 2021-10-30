import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card } from "@/components/Basic";
import Image from "next/image";
import { Grid, GridCol } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { WaitQuery } from "@/components/Util";
import { GetCardReq, GetCardRes, GET_CARD_DETAIL } from "@/apollo/gql";
import { myLoader, pad } from "utils";
import { useRouter } from "next/router";
import { Card as CardModel } from "models";
import { client } from "apollo";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

export default function CardDetail({
  card,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition("");

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.card"), link: "/game/card" },
        { name: t("nav:game.card_detail"), link: `/game/card/${card.id}` },
      ]}
      title={`${t("nav:game.card_detail")} - ${card.cardName} (${
        card.character?.fullNameEnglish || card.character?.firstNameEnglish
      })`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t("card:info")}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={`ondemand/card_icon/card_icon_${pad(card.id, 9)}_0.jpg`}
              width="128"
              alt={"card image"}
              height="128"
            />
            {/* <div className="flex flex-row gap-x-2 mt-2">
              {card.character.}
              </div> */}
            <div className="mt-2">{card.cardName}</div>
            <div className="text-gray-600">
              {card.character?.fullNameEnglish ||
                card.character?.firstNameEnglish}{" "}
              - {card.character?.unit?.name}
            </div>
            {/* <Table>
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
            </Table> */}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{ card: CardModel }> =
  async (context) => {
    const id = context.query.id;
    if (typeof id !== "string") {
      return {
        notFound: true,
      };
    }

    const { data } = await client.query<GetCardRes, GetCardReq>({
      query: GET_CARD_DETAIL,
      variables: {
        filter: {
          id: parseInt(id as string),
        },
      },
      fetchPolicy: "no-cache",
    });

    if (!data) {
      return { notFound: true };
    }

    return {
      props: {
        card: data.card[0],
      },
    };
  };
