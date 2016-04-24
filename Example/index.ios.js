/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import AppIntro from './AppIntro';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

class Example extends Component {


  onSkipBtnHandle = () => {
    Alert.alert('Skip');
  }
  doneBtnHandle = () => {
    Alert.alert('Done');
  }
  nextBtnHendle = () => {
    // Alert.alert('Next');
  }
  onSlideChangeHandle = (index, total) => {

  }

  render() {
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHendle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
      />
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
