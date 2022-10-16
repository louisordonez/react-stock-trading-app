export const convertDatetime = (datetime) => {
  const options = {
    hour12: false,
  };

  return new Date(datetime).toLocaleString('en-US', options);
};
