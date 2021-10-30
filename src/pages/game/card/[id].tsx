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
      <Grid cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
        <GridCol row={3}>
          <Card title={t("card:info")}>
            <div className="grid grid-cols-2">
              <div>{t("card:id")}</div>
              <div>{card.id}</div>
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
      </Grid>
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
