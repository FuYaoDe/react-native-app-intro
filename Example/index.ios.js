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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
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
    const pageArray = [{
      title: '這裡是 Title',
      description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
      img: 'http://i.imgur.com/da4G0Io.png',
      level: 10,
    }, {
      title: '這裡是 Title',
      description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
      img: 'http://i.imgur.com/da4G0Io.png',
      level: 10,
    }, {
      title: '這裡是 Title',
      description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
      img: 'http://i.imgur.com/da4G0Io.png',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHendle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        //pageArray={pageArray}
      >
      <View style={styles.slide} level={10} >
        <View level={5}><Text style={styles.text} >123123</Text></View>
        <View level={4}><Text style={styles.text} >123123</Text></View>
        <View level={10}><Text style={styles.text} >123123</Text></View>
        <View level={15}><Text style={styles.text} >123123</Text></View>
        <View level={10}><Text style={styles.text} >123123</Text></View>
      </View>
      <View style={styles.slide} level={10} >
        <View level={5}>
          <Text style={styles.text} >123123</Text>
          <View level={10}>
            <Text style={styles.text} >AAAAA</Text>
          </View>
        </View>
        <View level={4}><Text style={styles.text} >123123</Text></View>
        <View level={10}><Text style={styles.text} >123123</Text></View>
        <View level={15}><Text style={styles.text} >123123</Text></View>
        <View level={10}><Text style={styles.text} >123123</Text></View>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>123123</Text>
      </View>
      </AppIntro>
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
