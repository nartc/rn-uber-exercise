import { TextStyle, ViewStyle } from 'react-native';

export type AnimatableStyle = ViewStyle & TextStyle;
export type AnimatableViewStyle = ReadonlyArray<keyof ViewStyle>;
