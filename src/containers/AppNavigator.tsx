import { createAppContainer, createStackNavigator } from 'react-navigation';
import Main from './Main';

const mainStackNavigator = createStackNavigator({
  Main
}, {
  initialRouteName: 'Main',
  headerMode: 'none'
});

export default createAppContainer(mainStackNavigator);
