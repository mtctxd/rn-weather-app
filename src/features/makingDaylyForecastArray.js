export const makingDaylyForecastArray = (list) => {
  const todaysDate = new Date().toLocaleDateString();

  const resultList = list.reduce((a, b) => {
    const iteratedHours = new Date(b.dt * 1000).getHours();
    const dateKey = new Date(b.dt * 1000).toLocaleDateString();

    if (dateKey === todaysDate) {
      return a;
    }

    switch (iteratedHours) {
      case 15:
        return {
          ...a,
          [dateKey]: {
            ...a[dateKey],
            day: b,
          },
        };

      case 21:
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
  
  const outputResult = Object.values(resultList);
  console.log(outputResult);

  return outputResult;
};
