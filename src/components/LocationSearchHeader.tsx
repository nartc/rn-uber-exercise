import React, { FC, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { View as AnimatableView, Text as AnimatableText } from 'react-native-animatable';
import { AnimatableStyle, AnimatableViewStyle } from '../utils/types';

const transitionProps: { [key: string]: ReadonlyArray<keyof AnimatableStyle> } = {
  hoverBar: ['top', 'left', 'height', 'width', 'shadowRadius'],
  square: ['top', 'left'],
  destinationBox: ['left', 'height', 'opacity'],
  sourceBox: ['top', 'opacity'],
  destinationText: ['top', 'left', 'fontSize', 'color', 'opacity'],
  sourceText: ['top', 'opacity'],
  verticalBar: ['top', 'left', 'opacity'],
  dot: ['top', 'left', 'opacity'],
};
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  hoverBar: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    zIndex: 1,
  },
  target: {
    flex: 1,
  },
  square: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'black',
    zIndex: 2,
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    backgroundColor: '#A4A4AC',
    zIndex: 2,
  },
  destinationBox: {
    position: 'absolute',
    backgroundColor: '#EDEDED',
    borderRadius: 4,
    zIndex: 3,
  },
  destinationText: {
    position: 'absolute',
    zIndex: 4,
    backgroundColor: 'transparent',
  },
  sourceText: {
    position: 'absolute',
    zIndex: 4,
    color: '#525760',
    backgroundColor: 'transparent',
  },
  sourceBox: {
    position: 'absolute',
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
    zIndex: 3,
  },
  verticalBar: {
    position: 'absolute',
    height: 28,
    width: 1,
    backgroundColor: '#A4A4AC',
    zIndex: 2,
  },
  input: {
    flex: 1,
    color: 'black',
    backgroundColor: 'transparent',
    zIndex: 10,
    fontSize: 15,
    paddingHorizontal: 10,
  },
});

type LocationSearchHeaderProps = {
  expanded: boolean;
  sourceText: string;
  destinationText: string;
  onDestinationTextChange: (text: string) => void;
  onPress: () => void;
};
const LocationSearchHeader: FC<LocationSearchHeaderProps> = ({ expanded, sourceText, destinationText, onPress, onDestinationTextChange }) => {

  const destinationInputRef = useRef<TextInput>(null);

  const onExpand = (_: any) => {
    onPress();
    setTimeout(() => {
      if (!destinationInputRef.current) return;
      destinationInputRef.current.focus();
    }, 350);
  };

  const getAnimatableStyles = () => {
    const { width: windowWidth } = Dimensions.get('window');
    const width = windowWidth - 24 * 2;

    return {
      hoverbar: {
        top: expanded ? 0 : 96,
        left: expanded ? 0 : 24,
        height: expanded ? 136 : 56,
        width: expanded ? windowWidth : width,
        shadowRadius: expanded ? 10 / 2 : 60 / 2,
      },
      square: {
        top: expanded ? 109 : 96 + 56 / 2 - 6 / 2,
        left: expanded ? 29 : 24 + 22,
      },
      destinationBox: {
        left: expanded ? 56 : 24,
        right: 24,
        top: 96,
        height: expanded ? 32 : 56,
        opacity: expanded ? 1 : 0,
      },
      destinationText: {
        left: expanded ? 65 : 75,
        top: expanded ? 103 : 112,
        fontSize: expanded ? 15 : 20,
        color: expanded ? '#A4A4AC' : '#525760',
        opacity: (expanded && destinationText.length !== 0) ? 0 : 1,
      },
      sourceBox: {
        left: 56,
        right: 24,
        height: 32,
        top: expanded ? 56 : 96,
        opacity: expanded ? 1 : 0,
      },
      sourceText: {
        left: 65,
        top: expanded ? 64 : 76,
        opacity: expanded ? 1 : 0,
      },
      verticalBar: {
        top: expanded ? 78 : 78 + 22 - 5,
        left: expanded ? 32 : 32 + 22 - 5,
        opacity: expanded ? 1 : 0,
      },
      dot: {
        top: expanded ? 69 : 69 + 22 - 5,
        left: expanded ? 29.5 : 29.5 + 22 - 5,
        opacity: expanded ? 1 : 0,
      },
    };
  };

  return (
    <View style={ styles.container }>
      <AnimatableView style={ [styles.square, getAnimatableStyles().square] }
                      transition={ transitionProps.square as AnimatableViewStyle }/>
      <AnimatableText style={ [styles.sourceText, getAnimatableStyles().sourceText] }
                      transition={ transitionProps.sourceText }>
        { sourceText }
      </AnimatableText>
      <AnimatableText style={ [styles.destinationText, getAnimatableStyles().destinationText] }
                      transition={ transitionProps.destinationText }>
        { destinationText }
      </AnimatableText>
      <AnimatableView style={ [styles.destinationBox, getAnimatableStyles().destinationBox] }
                      transition={ transitionProps.destinationBox as AnimatableViewStyle }
                      pointerEvents={ 'box-none' }>
        { expanded && (
          <TextInput ref={ destinationInputRef }
                     style={ styles.input }
                     value={ destinationText }
                     onChangeText={ onDestinationTextChange }/>
        ) }
      </AnimatableView>
      <AnimatableView style={ [styles.sourceBox, getAnimatableStyles().sourceBox] }
                      transition={ transitionProps.sourceBox as AnimatableViewStyle }
                      pointerEvents={ 'none' }/>
      <AnimatableView style={ [styles.verticalBar, getAnimatableStyles().verticalBar] }
                      transition={ transitionProps.verticalBar as AnimatableViewStyle }
                      pointerEvents={ 'none' }/>
      <AnimatableView style={ [styles.dot, getAnimatableStyles().dot] }
                      transition={ transitionProps.dot as AnimatableViewStyle }
                      pointerEvents={ 'none' }/>
      <AnimatableView style={ [styles.hoverBar, getAnimatableStyles().hoverbar] }
                      transition={ transitionProps.hoverBar as AnimatableViewStyle }>
        <TouchableOpacity style={ styles.target } onPress={ onExpand } disabled={ expanded }/>
      </AnimatableView>
    </View>
  );
};

export default LocationSearchHeader;
