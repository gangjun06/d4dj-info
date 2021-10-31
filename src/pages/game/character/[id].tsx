import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card, Disclosure } from "@/components/Basic";
import Image from "next/image";
import { Grid, GridCol } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { WaitQuery } from "@/components/Util";
import {
  GetCardReq,
  GetCardRes,
  GetCharacterReq,
  GetCharacterRes,
  GET_CARD_DETAIL,
  GET_CHARACTER_DETAIL,
} from "@/apollo/gql";
import { myLoader, pad } from "utils";
import { useRouter } from "next/router";
import { Table, TableBody } from "@/components/Basic";
import { Card as CardModel, Character as CharacterModel } from "models";
import { client } from "apollo";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
export default function CardDetail({
  character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition("");

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.character"), link: "/game/charactera" },
        {
          name: t("nav:game.character_detail"),
          link: `/game/character/${character.id}`,
        },
      ]}
      title={`${t("nav:game.character_detail")} - ${
        character.fullNameEnglish || character?.firstNameEnglish
      }`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t("character:info")}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={`adv/ondemand/chara_icon/adv_icon_${pad(
                character.id,
                3
              )}.png`}
              width="128"
              alt={character.fullNameEnglish}
              height="128"
            />
            <div className="mt-2">
              {character.fullNameEnglish || character.firstNameEnglish}
            </div>

            <div className="text-gray-600">{character.unit?.name}</div>
            <Table>
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
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t("character:illustrations.name")}>
            <Disclosure title={t("character:illustrations.livestart")}>
              <div className="flex-center">
                <Image
                  loader={myLoader}
                  src={`LiveStartCutin/${pad(
                    character.unit!.id,
                    2
                  )}/LiveStartChara${pad(character.id, 3)}.png`}
                  width={3200}
                  height={270}
                  alt={`live start cutin image`}
                />
              </div>
            </Disclosure>
            <Disclosure title={t("character:illustrations.rankheader")}>
              <div className="flex-center">
                <Image
                  loader={myLoader}
                  src={`ondemand/character/character_rank_header_${pad(
                    character.id,
                    3
                  )}.png`}
                  width={429}
                  height={154}
                  alt={`rank header`}
                />
              </div>
            </Disclosure>
            <Disclosure title={t("character:illustrations.gacha_silhouette")}>
              <div className="flex-center bg-gray-500 relative h-48">
                <Image
                  loader={myLoader}
                  src={`ondemand/character/gacha_silhouette_${pad(
                    character.id,
                    3
                  )}.png`}
                  layout="fill"
                  objectFit="contain"
                  alt={`gacha silhouette image`}
                />
              </div>
            </Disclosure>
            <Disclosure title={t("character:illustrations.profile")}>
              <div className="flex-center">
                <Image
                  loader={myLoader}
                  src={`ondemand/character_profile/character_profile_${pad(
                    character.id,
                    3
                  )}.jpg`}
                  width={2478}
                  height={1440}
                  alt={`transparent image`}
                />
              </div>
            </Disclosure>
            <Disclosure title={t("character:illustrations.standup")}>
              <div className="flex-center relative h-96">
                <Image
                  loader={myLoader}
                  src={`ondemand/character/character_stand_up_${pad(
                    character.id,
                    3
                  )}.png`}
                  layout="fill"
                  objectFit="contain"
                  alt={`stand up image`}
                />
              </div>
            </Disclosure>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-3">
          <div className="grid-1">
            {character.card!.map((item, index) => (
              <Card
                key={index}
                bodyClassName="flex justify-center items-center flex-col"
                link={`/game/card/${item.id}`}
              >
                <Image
                  loader={myLoader}
                  src={`ondemand/card_icon/card_icon_${pad(item.id, 9)}_0.jpg`}
                  width="128"
                  alt={item.id.toString()}
                  height="128"
                />
                <div className="flex flex-row gap-x-2 my-2">
                  <div className="badge badge-outline badge-md">
                    {t(`card:rarity.${item.rarity}`)}
                  </div>
                  <div className="badge badge-outline badge-md">
                    {item.attribute}
                  </div>
                </div>
                {item.cardName}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  character: CharacterModel;
}> = async (context) => {
  const id = context.query.id;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const { data } = await client.query<GetCharacterRes, GetCharacterReq>({
    query: GET_CHARACTER_DETAIL,
    variables: {
      filter: {
        id: parseInt(id as string),
      },
    },
    fetchPolicy: "no-cache",
  });

  if (!data.character.length) {
    return { notFound: true };
  }

  return {
    props: {
      character: data.character[0],
    },
  };
};
