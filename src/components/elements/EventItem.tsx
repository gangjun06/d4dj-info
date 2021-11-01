import { Event } from "models";
import Image from "next/image";
import { formatTime, myLoader } from "utils";

export const EventItemContent = ({ data }: { data: Event }) => (
  <div className="flex-center flex-col">
    <Image
      loader={myLoader}
      src={`ondemand/event/event_${data.id}/title_logo.png`}
      width="350"
      alt={data.id.toString()}
      height="200"
    />
    <div className="flex flex-row gap-x-2 my-2">
      <div className="badge badge-outline badge-md">{data.type}</div>
    </div>
    {data.name}
    <div className="text-gray-600 mt-0.5">
      {`${formatTime(data.startDate)} ~ ${formatTime(data.endDate)}`}
    </div>
  </div>
);
