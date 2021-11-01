import { GetUnitRes, GET_UNIT } from "@/apollo/gql";
import Image from "next/image";
import { Card } from "@/components/Basic";
import { WaitQuery } from "@/components/Util";
import { useQuery } from "@apollo/client";
import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import Link from "next/link";
import { myLoader, pad } from "utils";

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
      <WaitQuery loading={loading} error={error}>
        <div>
          {data?.unit.map((item) => (
            <Card className="mb-3" title={item.name} key={item.id}>
              <div className="flex justify-around flex-wrap">
                {item.characters.map((item) => (
                  <Link
                    href={`/game/character/${item.id}`}
                    passHref
                    key={item.id}
                  >
                    <a className="flex flex-col justify-center items-center">
                      <Image
                        loader={myLoader}
                        src={`adv/ondemand/chara_icon/adv_icon_${pad(
                          item.id,
                          3
                        )}.png`}
                        width="128"
                        alt={item.fullNameEnglish}
                        height="128"
                      />
                      {item.fullNameEnglish || item.firstNameEnglish}
                    </a>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </WaitQuery>
    </MainLayout>
  );
}
