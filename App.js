import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  NativeModules,
  Image,
  Platform,
} from 'react-native';
import { Screen } from './src/components/Screen';
import * as Location from 'expo-location';

import {
  API_KEY,
  BASE_URL,
  FORECAST_ENDPOINT,
  WEATHER_ENDPOINT,
} from './src/constants';
import { backgroundImageSelector } from './src/features/backgroundImageSelector';
import temperatureConverter from './src/features/temperatureConverter';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [appDataAccessStatus, setAppDataAccessStatus] =
    useState('Geting location...'); //lefting this for debuging

  let locale = '';

  Platform.OS === 'ios' &&
    (locale = NativeModules.SettingsManager.settings.AppleLocale);
  Platform.OS === 'android' &&
    (locale = NativeModules.I18nManager.localeIdentifier);

  locale = locale.split('_')[0];

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const locationRequestStatus =
        await Location.requestForegroundPermissionsAsync();

      setAppDataAccessStatus('Geting your location...');

      const location = await Location.getCurrentPositionAsync();

      if (!location) {
        location = {
          coords: {
            latitude: 51.509865,
            longitude: -0.118092,
          },
        };
      }

      const { latitude, longitude } = location.coords;

      const fetchData = async (latitude, longitude, endpoint, locale) => {
        try {
          const url = `${BASE_URL}${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=${locale}`;

          const response = await fetch(url);
          const data = await response.json();

          if (response.ok) {
            return data;
          }
          setAppDataAccessStatus(
            'Sorry, there are some problem with server...'
          );
        } catch (error) {
          setAppDataAccessStatus(
            'Sorry, there are some problem with server...'
          );
        }
      };

      const weatherInfo = await fetchData(
        latitude,
        longitude,
        WEATHER_ENDPOINT,
        locale
      );
      const forecastInfo = await fetchData(
        latitude,
        longitude,
        FORECAST_ENDPOINT,
        locale
      );

      setWeather(weatherInfo);
      setForecast(forecastInfo);
    } catch (error) {
      setAppDataAccessStatus('some error happened while geting data');
    }
  };

  if (weather && forecast) {
    const path = backgroundImageSelector(
      weather.main.temp < 273.15
        ? '13d'
        : weather.weather[0].icon);

    console.log(weather.weather[0].icon);

    return (
      <ImageBackground style={{ width: '100%', height: '100%' }} source={path}>
        <SafeAreaView style={styles.container}>
          <Screen
            style={styles.container}
            weather={weather}
            forecast={forecast}
          />
          <StatusBar style="auto" />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.starterScreen}>
      <Image style={styles.image} source={require('./assets/icon.png')} />
      <Text style={styles.loadingData}>{appDataAccessStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  starterScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8FA8A',
  },
  image: {
    width: 300,
    height: 300,
  },
  loadingData: {
    fontSize: 24,
    marginTop: 16,
    fontFamily: 'monospace',
  },
});
