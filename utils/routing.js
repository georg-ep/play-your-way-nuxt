export const objectToQuery = (obj) => {
  let qparams = "?";
  const entries = Object.entries(obj);
  const len = entries.length;
  entries.forEach((entry, idx) => {
    qparams += `${entry[0]}=${entry[1]}`;
    if (idx !== len - 1) qparams += "&";
  });
  return qparams;
};
