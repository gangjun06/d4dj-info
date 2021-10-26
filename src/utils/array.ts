export const cleanArray = (data: any[]) => {
  const filtered = data.filter((item) => item !== undefined);
  return filtered.length ? filtered : undefined;
};

export const cleanArrayWithInt = (data: any[]) => {
  const filtered = data
    .filter((item) => item !== undefined)
    .map((item) => parseInt(item));
  return filtered.length ? filtered : undefined;
};
