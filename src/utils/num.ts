export const pad = (num: number, size: number) =>
  num.toString().padStart(size, "0");

export const formatNumber = (num: number) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
