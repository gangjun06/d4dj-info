import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import { Card } from "@/components/Basic";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Checkbox, FormBlock } from "@/components/Form";
import { cleanArray, cleanArrayWithInt } from "utils/array";
import { Attribute } from "models";
import { Grid } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import InfinityScroll from "react-infinite-scroll-component";
import { WaitQuery } from "@/components/Util";
import {
  GET_CARD_LIST,
  CardSort,
  GetCardListReq,
  GetCardListRes,
} from "@/apollo/gql";
import {
  AttributeCheckbox,
  CardRearityCheckbox,
  UnitCheckbox,
} from "utils/constants";
import { myLoader, pad } from "utils";
import { useState } from "react";

type FilterData = {
  attribute: Attribute[];
  cardRearity: string[];
  unit: string[];
};

export default function CardList() {
  const { t } = useTransition("");
  const { handleSubmit, control } = useForm<FilterData>();
  const [reqData, setReqData] = useState<GetCardListReq | null>(null);
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetCardListRes,
    GetCardListReq
  >(GET_CARD_LIST, {
    variables: {
      sort: {
        name: CardSort.id,
        order: "asc",
      },
      page: {
        take: 30,
        skip: 0,
      },
      filter: {},
    },
  });
  const onSubmit = handleSubmit((data) => {
    const reqData: GetCardListReq = {
      filter: {
        attribute: cleanArray(data.attribute),
        rairity: cleanArrayWithInt(data.cardRearity),
        unit: cleanArrayWithInt(data.unit),
      },
    };
    setReqData(reqData);
    refetch(reqData);
  });

  const fetchData = async () => {
    await fetchMore({
      variables: {
        ...reqData,
        page: {
          skip: 0,
          take: 30,
          after: data?.card[data?.card.length - 1].id,
        },
      },
      updateQuery: (previousResult: GetCardListRes, { fetchMoreResult }) => {
        const newEntries = fetchMoreResult!.card;
        return {
          card: [...previousResult?.card, ...newEntries],
        };
      },
    });
  };
  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.card"), link: "/game/card" },
      ]}
      title={t("nav:game.card")}
    >
      <Card title={t("common:filter")} className="mb-4">
        <form onSubmit={onSubmit}>
          <FormBlock label={t("common:attribute.name")}>
            <Checkbox
              name="attribute"
              control={control}
              list={AttributeCheckbox(t)}
            />
          </FormBlock>
          <FormBlock label={t("common:card_rearity.name")}>
            <Checkbox
              name="cardRearity"
              control={control}
              list={CardRearityCheckbox(t)}
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
          dataLength={data?.card.length || 0}
          next={fetchData}
          hasMore={true}
          scrollableTarget="mainContent"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          loader={<div>Loading..</div>}
        >
          <Grid>
            {data?.card.map((item, index) => (
              <Card
                key={index}
                bodyClassName="flex justify-center items-center flex-col gap-2"
                link={`/game/card/${item.id}`}
              >
                <Image
                  loader={myLoader}
                  src={`ondemand/card_icon/card_icon_${pad(
                    parseInt(item.id),
                    9
                  )}_0.jpg`}
                  width="128"
                  alt={item.id}
                  height="128"
                />
                <div>
                  ({item.attribute}) {item.cardName}
                </div>
              </Card>
            ))}
          </Grid>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  );
}
