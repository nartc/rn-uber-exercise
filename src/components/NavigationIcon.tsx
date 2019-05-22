// Expand the touch target around the icon
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AssetMap } from '../utils/AssetMap';

const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 36,
    left: 22,
    zIndex: 10,
  },
  icon: {
    width: 21,
    height: 21,
  },
});

type NavigationIconProps = {
  icon: string;
  onPress: () => void;
};
const NavigationIcon: FC<NavigationIconProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={ styles.container } onPress={ onPress } hitSlop={ hitSlop }>
      <Image source={ AssetMap[icon] } style={ styles.icon }/>
    </TouchableOpacity>
  );
};

export default NavigationIcon;
