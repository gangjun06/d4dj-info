export type Live2DShare = {
  model: string;
  x?: string | number;
  y?: string | number;
  name: string;
  scale?: string | number;
};

export const createLive2DShare = (data: Live2DShare[]) => {
  data.forEach((item) => {
    item.x = item.x || "0.5";
    item.y = item.y || "0.4";
    item.scale = item.scale || "0.3";
  });
  return `/live2d?data=${Buffer.from(JSON.stringify(data)).toString("base64")}`;
};
