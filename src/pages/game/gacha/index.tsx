import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import InfinityScroll from "react-infinite-scroll-component";
import { GET_GACHA_LIST, GetGachaListRaq, GetGachaListRas } from "@/apollo/gql";
import { useQuery } from "@apollo/client";
import { WaitQuery } from "@/components/Util";
import { useState } from "react";
import { Card } from "@/components/Basic";
import { GachaItemContent } from "@/components/elements/GachaItem";

export default function Event() {
  const { t } = useTransition("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetGachaListRas,
    GetGachaListRaq
  >(GET_GACHA_LIST, {
    variables: {
      page: {
        take: 30,
        skip: 0,
      },
      // filter: {},
    },
  });

  const fetchData = async () => {
    const res = await fetchMore({
      variables: {
        page: {
          skip: data!.gacha.length > 0 ? 1 : 0,
          take: 30,
          after: data?.gacha[data?.gacha.length - 1].id,
        },
      },
    });
    if (((res.data as any).gacha as any[]).length < 30) {
      setHasMore(false);
    }
  };

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.gacha"), link: "/game/gacha" },
      ]}
      title={t("nav:game.gacha")}
    >
      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={data?.gacha.length || 0}
          next={fetchData}
          hasMore={hasMore}
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loaaing..</div>}
        >
          <div className="grid-1">
            {data?.gacha.map((item, index) => {
              return (
                <Card key={index} link={`/game/gacha/${item.id}`}>
                  <GachaItemContent data={item} />
                </Card>
              );
            })}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  );
}
