import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import React from 'react';
import temperatureConverter from '../features/temperatureConverter';
import capitalize from '../features/capitalize';
import { HORIZONTAL_CONTAINER_PADDING } from '../constants';

const CurrentWeather = ({ weather }) => {
  const { name } = weather;
  const {
    main: { temp, feels_like, humidity, temp_min, temp_max },
  } = weather;
  const { description, icon } = weather.weather[0];
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.left}>
          <View style={styles.info}>
            <View style={styles.cityInfo}>
              <Text style={styles.city}>{name}</Text>
              <Text style={styles.cityDescription}>
                {capitalize(description)}
              </Text>
            </View>
            <View>
              <Text style={styles.curentTemperature}>{`${temperatureConverter(
                temp
              )}°C`}</Text>
              <Text
                style={styles.feelsLike}
              >{`Feels like ${temperatureConverter(feels_like)}°C`}</Text>
              <View style={styles.temperatureInfo}>
                <Text
                  style={styles.temperatureInfoText}
                >{`Max: ${temperatureConverter(temp_max)}°C`}</Text>
                <Text
                  style={styles.temperatureInfoText}
                >{`Humidity: ${humidity}%`}</Text>
                <Text
                  style={styles.temperatureInfoText}
                >{`Min: ${temperatureConverter(temp_min)}°C`}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <Image
            style={styles.image}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_CONTAINER_PADDING,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  right: {
    flex: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  curentTemperature: {
    fontSize: 56,
    fontFamily: 'monospace',
  },
  feelsLike: {
    fontFamily: 'monospace',
  },
  temperatureInfo: {
    paddingTop: 12,
  },
  temperatureInfoText: {
    paddingBottom: 8,
    fontFamily: 'monospace',
  },
  city: {
    fontSize: 24,
    fontFamily: 'monospace',
  },
  cityDescription: {
    fontFamily: 'monospace',
  },
  cityInfo: {
    paddingBottom: 12,
  },
  //left part
  image: {
    position: 'relative',
    bottom: 50,
    left: 25,
    height: 200,
    width: 200,
    alignSelf: 'flex-end',
  },
});
