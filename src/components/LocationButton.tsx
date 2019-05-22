import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AssetMap } from '../utils/AssetMap';

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.12,
  },
  image: {
    width: 21,
    height: 21,
  }
});

type LocationButtonProps = {
  icon: string;
  onPress: () => void;
};
const LocationButton: FC<LocationButtonProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={ styles.container } onPress={ onPress } activeOpacity={ 0.5 }>
      <Image source={ AssetMap[icon] } style={ styles.image }/>
    </TouchableOpacity>
  );
};

export default LocationButton;
