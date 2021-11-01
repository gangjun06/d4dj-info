import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card, Disclosure } from "@/components/Basic";
import Image from "next/image";
import { Grid, GridCol } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { WaitQuery } from "@/components/Util";
import { GetGachaReq, GetGachaRes, GET_GACHA_DETAIL } from "@/apollo/gql";
import { myLoader, pad } from "utils";
import { useRouter } from "next/router";
import { Table, TableBody } from "@/components/Basic";
import { Gacha, Gacha as GachaModel, GachaCategory } from "models";
import { client } from "apollo";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CardItem } from "@/components/elements";

const canUseBanner = (item: Gacha) =>
  item.category !== GachaCategory.Tutorial &&
  item.category !== GachaCategory.Birthday;

export default function GachaDetail({
  gacha,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition("");
  const useBanner = canUseBanner(gacha);

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.gacha"), link: "/game/gacha" },
        {
          name: t("nav:game.gacha_detail"),
          link: `/game/character/${gacha.id}`,
        },
      ]}
      title={`${t("nav:game.character_detail")} - ${gacha.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t("character:info")}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={
                useBanner
                  ? `ondemand/banner/banner_gacha_${pad(
                      gacha.id,
                      gacha.id < 10 ? 4 : 5
                    )}.png`
                  : `ondemand/gacha/top/banner/${gacha.id}.png`
              }
              width={useBanner ? 612 : 324}
              alt={gacha.id.toString()}
              height={useBanner ? 200 : 172}
            />
            <div className="mt-2">{gacha.name}</div>

            {/*<Table>
              <TableBody
                data={[
                  [t("character:id"), character.id],
                  [t("character:color_code"), character.colorCode],
                  [t("character:firstname"), character.firstName],
                  [t("character:firstname_eng"), character.firstNameEnglish],
                  [t("character:fullname"), character.fullName],
                  [t("character:fullname_eng"), character.fullNameEnglish],
                ]}
              />
            </Table> */}
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t("character:illustrations.name")}>
            <></>
          </Card>
        </div>
        <div className="subtitle">Pickup Cards</div>
        <div className="col-span-1 md:col-span-3">
          <div className="grid-1">
            {gacha.pickUpCards!.map((item, index) => (
              <CardItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  gacha: GachaModel;
}> = async (context) => {
  const id = context.query.id;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const { data } = await client.query<GetGachaRes, GetGachaReq>({
    query: GET_GACHA_DETAIL,
    variables: {
      filter: {
        id: parseInt(id as string),
      },
    },
    fetchPolicy: "no-cache",
  });

  if (!data.gacha.length) {
    return { notFound: true };
  }

  return {
    props: {
      gacha: data.gacha[0],
    },
  };
};
