import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { makingDaylyForecastArray } from '../features/makingDaylyForecastArray';


import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

export const Screen = ({ weather, forecast }) => {
  const preparedForecast = makingDaylyForecastArray(forecast.list);

    return (
      <View style={styles.container}>
        <CurrentWeather weather={weather} />
        <Forecast preparedForecast={preparedForecast} />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});
