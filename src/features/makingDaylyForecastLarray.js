export const makingDaylyForecastLarray = (list) => {
  const todaysDate = new Date().toLocaleDateString();
  return list.reduce((a, b) => {
    const currentDate = new Date(b.dt * 1000).toDateString();
    if (a) {
      if (
        !a.some(
          (searchedItem) =>
            new Date(searchedItem.dt * 1000).toDateString() === currentDate &&
            currentDate !== todaysDate
        )
      ) {
        return [...a, b];
      }
    }

    return a;
  }, []);
};
