import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card } from "@/components/Basic";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Checkbox, FormBlock } from "@/components/Form";
import { cleanArray, cleanArrayWithInt } from "utils/array";
import { Grid } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import InfinityScroll from "react-infinite-scroll-component";
import { WaitQuery } from "@/components/Util";
import {
  GetCardListReq,
  GetMusicListReq,
  GET_MUSIC_LIST,
  GetMusicListRes,
} from "@/apollo/gql";
import { MusicCategoryCheckbox, UnitCheckbox } from "utils/constants";
import { myLoader, pad } from "utils";
import { useState } from "react";

type FilterData = {
  category: string[];
  unit: string[];
};

export default function Music() {
  const { t } = useTransition("");
  const { handleSubmit, control } = useForm<FilterData>();
  const [reqData, setReqData] = useState<GetCardListReq | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetMusicListRes,
    GetMusicListReq
  >(GET_MUSIC_LIST, {
    variables: {
      page: {
        take: 30,
        skip: 0,
      },
      filter: {},
    },
  });

  const onSubmit = handleSubmit((data) => {
    const reqData: GetMusicListReq = {
      filter: {
        category: cleanArray(data.category),
        unit: cleanArrayWithInt(data.unit),
      },
    };
    setReqData(reqData);
    refetch(reqData);
  });

  const fetchData = async () => {
    const res = await fetchMore({
      variables: {
        ...reqData,
        page: {
          skip: data!.music.length > 0 ? 1 : 0,
          take: 30,
          after: data?.music[data?.music.length - 1].id,
        },
      },
    });
    if (((res.data as any).music as any[]).length < 30) {
      setHasMore(false);
    }
  };

  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.music"), link: "/game/music" },
      ]}
      title={t("nav:game.music")}
    >
      <Card title={t("common:filter")} className="mb-4">
        <form onSubmit={onSubmit}>
          <FormBlock label={t("music:category.name")}>
            <Checkbox
              name="category"
              control={control}
              list={MusicCategoryCheckbox(t)}
            />
          </FormBlock>
          <FormBlock label={t("common:unit.name")}>
            <Checkbox name="unit" control={control} list={UnitCheckbox(t)} />
          </FormBlock>
          <button className="btn btn-sm btn-primary btn-outline" type="submit">
            {t("common:search")}
          </button>
        </form>
      </Card>
      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={data?.music.length || 0}
          next={fetchData}
          hasMore={hasMore}
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <Grid>
            {data?.music.map((item, index) => (
              <Card
                key={item.id}
                bodyClassName="flex justify-center items-center flex-col gap-2"
                link={`/game/music/${item.id}`}
              >
                <Image
                  loader={myLoader}
                  src={`music_jacket/music_jacket_${pad(item.id, 7)}.jpg`}
                  width="128"
                  alt={`image jacket`}
                  height="128"
                />
                <div className="flex flex-row gap-x-2">
                  {item.chart?.map((item) => (
                    <div className="badge badge-outline badge-md" key={item.id}>
                      {item.level}
                    </div>
                  ))}
                </div>
                <div>{item.name}</div>
              </Card>
            ))}
          </Grid>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  );
}
