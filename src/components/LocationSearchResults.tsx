import React, { FC } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { AnimatableViewStyle } from '../utils/types';

const transitionProps = ['top', 'height', 'width'];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
  },
});

type LocationSearchResultsProps = {
  visible: boolean;
};
const LocationSearchResults: FC<LocationSearchResultsProps> = ({ visible, children }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <AnimatableView style={ [styles.container, { top: visible ? 136 : height, height, width }] }
                    duration={ 300 }
                    easing={ 'ease-out' }
                    transition={ transitionProps as AnimatableViewStyle }>
      { children }
    </AnimatableView>
  );
};

export default LocationSearchResults;
