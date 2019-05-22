import React, { FC } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { AssetMap } from '../utils/AssetMap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    height: 56,
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 25,
    justifyContent: 'center',
  },
  icon: {
    width: 15,
    height: 15,
  },
  textContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  subtitle: {
    fontSize: 13,
    color: '#A4A4AC',
  },
});

type SearchResultsRowProps = {
  icon: string;
  title: string;
  subtitle: string;
};
const SearchResultsRow: FC<SearchResultsRowProps> = ({ icon, title, subtitle }) => (
  <View style={ styles.container }>
    <View style={ styles.iconContainer }>
      <Image source={ AssetMap[icon] } style={ styles.icon }/>
    </View>
    <View style={ styles.textContainer }>
      <Text style={ styles.title }>{ title }</Text>
      <Text style={ styles.subtitle }>{ subtitle }</Text>
    </View>
  </View>
);

export default SearchResultsRow;
