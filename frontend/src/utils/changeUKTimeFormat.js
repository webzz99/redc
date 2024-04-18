const changeUKTime = (time) => {
  const date = new Date(time);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/London", // Set the time zone to UK time
  };
  const ukDateTime = new Intl.DateTimeFormat("en-Gb", options).format(date);
  return ukDateTime;
};
export default changeUKTime;
