import { GetUnitRes, GET_UNIT } from "@/apollo/gql";
import { Card } from "@/components/Basic";
import { gql, useQuery } from "@apollo/client";
import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import Link from "next/link";
import {
  HiOutlineMusicNote,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineCalendar,
} from "react-icons/hi";

export default function Character() {
  const { t } = useTransition("");
  const { loading, error, data } = useQuery<GetUnitRes>(GET_UNIT);
  return (
    <MainLayout
      title={t("nav:game.character")}
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.character"), link: "/game/character" },
      ]}
    >
      <>
        {loading ? (
          <div></div>
        ) : (
          <div>
            {data?.unit.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        )}
      </>
    </MainLayout>
  );
}
