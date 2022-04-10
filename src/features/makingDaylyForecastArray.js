export const makingDaylyForecastArray = (list) => {
  const resultList = list.reduce((a, b) => {
    const iteratedHours = new Date(b.dt * 1000).getHours();
    const dateKey = new Date(b.dt * 1000).toLocaleDateString();

    // so i used multiple cases because the api constantly updating
    // hours so, like you can not bind yourself to any date.
    // So in that case, it will select last date and rewrite it
    // if it matches.
    switch (iteratedHours) {
      case 15:
      case 16:
      case 17:
        return {
          ...a,
          [dateKey]: {
            ...a[dateKey],
            day: b,
          },
        };

      case 21:
      case 22:
      case 23:
        return {
          ...a,
          [dateKey]: {
            ...a[dateKey],
            night: b,
          },
        };;
    }

    return a;
  }, {});
  
  const outputResult = Object
    .values(resultList)
    .filter(item => item.day && item.night);

  return outputResult;
};
