import { createAppContainer } from 'react-navigation'
import MiddlewareScreen from '../Containers/MiddlewareScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  MiddlewareScreen: { screen: MiddlewareScreen },
  LoginScreen: { screen: LoginScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'RegistrationScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
