import { Event, Gacha, GachaCategory } from "models";
import Image from "next/image";
import { formatTime, myLoader, pad } from "utils";

const canUseBanner = (item: Gacha) =>
  item.category !== GachaCategory.Tutorial &&
  item.category !== GachaCategory.Birthday;

export const GachaItemContent = ({ data }: { data: Gacha }) => {
  const useBanner = canUseBanner(data);
  return (
    <div className="flex-center">
      <Image
        loader={myLoader}
        src={
          useBanner
            ? `ondemand/banner/banner_gacha_${pad(
                data.id,
                data.id < 10 ? 4 : 5
              )}.png`
            : `ondemand/gacha/top/banner/${data.id}.png`
        }
        width={useBanner ? 612 : 324}
        alt={data.id.toString()}
        height={useBanner ? 200 : 172}
      />
      <div className="mt-2">{data.name}</div>
      <div className="text-gray-600 mt-0.5">
        {`${formatTime(data.startDate)} ~ ${formatTime(data.endDate)}`}
      </div>
    </div>
  );
};
