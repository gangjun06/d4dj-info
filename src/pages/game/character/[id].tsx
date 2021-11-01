import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card, Disclosure } from "@/components/Basic";
import Image from "next/image";
import Link from "next/link";
import {
  GetCharacterReq,
  GetCharacterRes,
  GET_CHARACTER_DETAIL,
} from "@/apollo/gql";
import { myLoader, pad } from "utils";
import { Table, TableBody } from "@/components/Basic";
import { Character as CharacterModel } from "models";
import { CardItem } from "@/components/elements";
import { client } from "apollo";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { createLive2DShare } from "utils/live2d";
export default function CardDetail({
  character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition("");

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.character"), link: "/game/character" },
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
                  [
                    t("nav:live2d"),
                    {
                      link: createLive2DShare([
                        {
                          name:
                            character.fullNameEnglish ||
                            character.firstNameEnglish,
                          model: `live2d_chara_${pad(character.id, 3)}0001`,
                        },
                      ]),
                      name: t("nav:live2d"),
                    },
                  ],
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
        <div className="subtitle">{t("character:card_list")}</div>
        <div className="col-span-1 md:col-span-3">
          <div className="grid-1">
            {character.card!.map((item, index) => (
              <CardItem key={index} data={item} />
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
