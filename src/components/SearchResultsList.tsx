import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SearchResultsRow from './SearchResultsRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#EDEDED',
  }
});

type SearchResultsListProps = {
  list: any[];
};
const SearchResultsList: FC<SearchResultsListProps> = ({ list }) => {

  const renderSeparator = (id: number) => <View style={ styles.separator } key={ id }/>;

  const renderRow = (row: any) => {
    const { title, subtitle, icon } = row.item;
    return <SearchResultsRow icon={ icon } title={ title } subtitle={ subtitle }/>;
  };

  return (
    <FlatList data={ list }
              renderItem={ renderRow }
              keyExtractor={ (item, index) => '' + index }
              ItemSeparatorComponent={ renderSeparator }/>
  );
};

export default SearchResultsList;
