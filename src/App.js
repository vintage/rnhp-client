import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Provider as PaperProvider } from 'react-native-paper'

import { LoginScreen, ChatScreen } from './screens'

const AppNavigator = createBottomTabNavigator(
  {
    Login: LoginScreen,
    Chat: ChatScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName: string

        if (routeName === 'Login') {
          iconName = 'person'
        } else if (routeName === 'Chat') {
          iconName = 'chat'
        }

        return (
          <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
  },
)

export default () => (
  <PaperProvider>
    <AppNavigator />
  </PaperProvider>
)
