import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';

import temperatureConverter from '../features/temperatureConverter';
import { HORIZONTAL_CONTAINER_PADDING } from '../constants';
import capitalize from '../features/capitalize';
import { makingDaylyForecastLarray } from '../features/makingDaylyForecastLarray';

const Forecast = ({ forecast }) => {
  let preparedForecast = makingDaylyForecastLarray(forecast.list);
  preparedForecast = preparedForecast.splice(0, preparedForecast.length);

  const renderItem = ({ item }) => {
    const {
      main: { temp_min, temp_max },
      dt,
    } = item;
    const { description, icon } = item.weather[0];
    const date = new Date(dt * 1000).toDateString();

    return (
      <View style={styles.itemContainer}>
        <View style={styles.date}>
          <Text style={styles.text}>{date}</Text>
          <Text style={styles.text}>{capitalize(description)}</Text>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
        <View>
          <Text style={styles.text}>{`Min: ${temperatureConverter(temp_min)}°C`}</Text>
          <Text style={styles.text}>{`Max: ${temperatureConverter(temp_max)}°C`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={preparedForecast}
        renderItem={renderItem}
        keyExtractor={(item) => item.dt}
      />
    </View>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(141, 203, 159, 0.3)',
    paddingHorizontal: HORIZONTAL_CONTAINER_PADDING,
    borderTopEndRadius: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
  date: {
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'monospace',
  }
});
