export const keyEqualVal = (obj: object) => {
  return Object.entries(obj)
    .map(([key, val]) => `${key}='${val}'`)
    .join(',');
};
