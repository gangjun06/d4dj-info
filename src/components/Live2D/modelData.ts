export const modelData: string[] = [
  // Happy Around
  "Rinku Aimoto",
  "Maho Akashi",
  "Muni Ohnaruto",
  "Rei Togetsu",
  // Peaky P-key
  "Kyoko Yamate",
  "Shinobu Inuyose",
  "Yuka Sasago Jennifer",
  "Esora Shimizu",
  // Photon Maiden
  "Saki Izumo",
  "Ibuki Niijima",
  "Towa Hanamaki",
  "Noa Fukushima",
  // Merm4id
  "Rika Seto",
  "Marika Mizushima",
  "Saori Hidaka",
  "Dalia Matsuyama",
  // Rondo
  "Tsubaki Aoyagi",
  "Nagisa Tsukimiyama",
  "Hiiro Yano",
  "Aoi Miyake",
  // Lyrical Lily
  "Miyu Sakurada",
  "Haruna Kasuga",
  "Kurumi Shiratori",
  "Miiko Takeshita",
];

export function modelDataWithID() {
  return modelData.map((name, index) => ({
    id: `0${Math.floor(index / 4) + 1}${(index % 4) + 1}`,
    name,
  }));
}
