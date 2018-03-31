import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'; 
import { Constants } from 'expo'
import MainNavigator from './routes/MainNavigation'
import store from './stores'
import { Provider } from 'react-redux'
import { setLocalNotification } from './utils/helpers'


//add statusbar:
const FlashcardsStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
};
export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }
  render() {
      return (
          <Provider store={store}>
            <View style={{flex:1}}> 
              <FlashcardsStatusBar backgroundColor="#03A9F4" barStyle="light-content" animated />
              <MainNavigator />
           </View>
          </Provider>
    );
  }
}

 
