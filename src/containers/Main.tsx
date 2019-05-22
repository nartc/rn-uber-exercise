import { StyleSheet, View } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { NavigationScreenComponent } from 'react-navigation';
import { connect } from 'react-redux';
import LocationButtonGroup from '../components/LocationButtonGroup';
import LocationSearchHeader from '../components/LocationSearchHeader';
import LocationSearchResults from '../components/LocationSearchResults';
import NavigationIcon from '../components/NavigationIcon';
import SearchResultsList from '../components/SearchResultsList';
import { AppState } from '../store/store';
import React, { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  map: {
    flex: 1,
    zIndex: -1,
  }
});

const mapStateToProps = (state: AppState) => ({
  recentLocations: state.recentLocations,
  shortcutLocations: state.recentLocations.slice(0, 3)
});

type MainProps = ReturnType<typeof mapStateToProps>;
const Main: NavigationScreenComponent<{}, {}, MainProps> = ({ navigation, shortcutLocations, recentLocations }) => {
  const [state, setState] = useState({
    searchResultsOpen: false,
    sourceText: 'Work',
    destinationText: '',
    position: {
      latitude: 0,
      longitude: 0
    },
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    }
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setState(prev => ({
        ...prev,
        position: { latitude, longitude },
        region: { latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
      }));
    }, positionError => {
    }, { enableHighAccuracy: true, maximumAge: 1000, timeout: 20000 });
  }, []);

  const toggleSearchResults = () => {
    setState(prev => ({ ...prev, searchResultsOpen: !prev.searchResultsOpen }));
  };

  const onSourceTextChange = (text: string) => {
    setState(prev => ({ ...prev, sourceText: text }));
  };

  const onDestinationTextChange = (text: string) => {
    setState(prev => ({ ...prev, destinationText: text }));
  };

  const hasPosition = !!state.position.longitude && !!state.position.latitude;

  return (
    <View style={ styles.container }>
      <NavigationIcon icon={ state.searchResultsOpen ? 'arrowLeft' : 'hamburger' } onPress={ toggleSearchResults }/>
      <LocationSearchHeader expanded={ state.searchResultsOpen }
                            sourceText={ state.sourceText }
                            destinationText={ state.destinationText }
                            onDestinationTextChange={ onDestinationTextChange }
                            onPress={ toggleSearchResults }/>
      <LocationButtonGroup visible={ !state.searchResultsOpen }
                           locations={ shortcutLocations }
                           onPressLocation={ () => {
                           } }/>
      <LocationSearchResults visible={ state.searchResultsOpen }>
        <SearchResultsList list={ recentLocations }/>
      </LocationSearchResults>
      <MapView style={ styles.map } region={ state.region }>
        { hasPosition && (
          <>
            <Circle center={ state.position }
                    radius={ 300 }
                    strokeColor={ 'transparent' }
                    fillColor={ 'rgba(112, 185, 213, 0.3)' }/>
            <Circle center={ state.position }
                    radius={ 100 }
                    strokeColor={ 'transparent' }
                    fillColor={ '#3594bc' }/>
          </>
        ) }
      </MapView>
    </View>
  );
};

export default connect(mapStateToProps)(Main);
