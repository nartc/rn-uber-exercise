import React, { FC } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import LocationButton from './LocationButton';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 30,
    right: 30,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  gradient: {
    position: 'absolute',
    left: -30,
    right: -30,
    top: -20,
    height: 180,
    width: 100,
    resizeMode: 'stretch',
  },
  item: {
    alignItems: 'center',
  },
  itemSpacer: {
    height: 19,
  },
  itemText: {
    backgroundColor: 'transparent',
    maxWidth: 74,
    textAlign: 'center',
  }
});

type LocationButtonGroupProps = {
  visible: boolean;
  locations: any[];
  onPressLocation: (location: any) => void;
};
const LocationButtonGroup: FC<LocationButtonGroupProps> = ({ visible, locations, onPressLocation }) => {

  const { height, width } = Dimensions.get('window');

  const renderItem = (location: any, index: number) => {
    const { icon, title } = location;
    return (
      <View style={ styles.item } key={ index }>
        <LocationButton icon={ icon } onPress={ () => onPressLocation(location) }/>
        <View style={ styles.itemSpacer }/>
        <Text style={ styles.itemText }>
          { title }
        </Text>
      </View>
    );
  };

  return (
    <AnimatableView style={ [styles.container, { top: visible ? width + 280 : height + 30 }] }
                    easing={ 'ease-in-out' }
                    duration={ 300 }
                    transition={ ['top'] }>
      <Image style={ [styles.gradient, { width }] } source={ require('../images/bottom-gradient-overlay.png') }/>
      { locations.map(renderItem) }
    </AnimatableView>
  );
};

export default LocationButtonGroup;
