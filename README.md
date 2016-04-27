# react-native-app-intro
react-native-app-intro is a react native plugin implementing a parallax effect welcome page using base on [react-native-swiper](https://github.com/leecade/react-native-swiper) , similar to the one found in Google's app like Sheet, Drive, Docs...

# react-native-app-intro Screen Capture
<img src="http://i.giphy.com/3o6ozjLoOnYTXfzJgQ.gif">


### Installation

```bash
$ npm i react-native-app-intro --save
```

### Basic Usage

```
import React, { AppRegistry, Component, Alert, } from 'react-native';
import AppIntro from './AppIntro';

class Example extends Component {
  onSkipBtnHandle = () => {
    Alert.alert('Skip');
  }
  doneBtnHandle = () => {
    Alert.alert('Done');
  }
  nextBtnHendle = () => {
    Alert.alert('Next');
  }
  render() {
    const pageArray = [{
      title: 'Page 1',
      description: 'Description 1',
      img: 'https://goo.gl/uwzs0C',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      img: 'https://goo.gl/GPO6JB',
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHendle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
```

### Properties
| Prop           | PropType | Default Value           | Description                                                                                                                                                                                                                                                                                                                                                      |
|----------------|----------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dotColor       | string   | 'rgba(255,255,255,0.3)' | Bottom of the page dot color                                                                                                                                                                                                                                                                                                                                     |
| activeDotColor | string   | '#fff'                  | Active page index dot color                                                                                                                                                                                                                                                                                                                                      |
| rightTextColor | string   | '#fff'                  | The bottom right Text `Done、>` color                                                                                                                                                                                                                                                                                                                            |
| leftTextColor  | string   | '#fff'                  | The bottom left Text `Skip` color                                                                                                                                                                                                                                                                                                                                |
| onSlideChange  | func     |                         | function to call when the pages change                                                                                                                                                                                                                                                                                                                           |
| onSkipBtnClick | func     |                         | function to call when the Skip button click                                                                                                                                                                                                                                                                                                                      |
| onDoneBtnClick | func     |                         | function to call when the Done button click                                                                                                                                                                                                                                                                                                                      |
| onNextBtnClick | func     |                         | function to call when the Next '>' button click                                                                                                                                                                                                                                                                                                                  |
| pageArray      | array    |                         | In the basic usage, you can input object array to render basic view example: ```[[{title: 'Page 1', description: 'Description 1', img: 'https://goo.gl/uwzs0C', imgStyle: {height: 80 * 2.5, width: 109 * 2.5 }, backgroundColor: '#fa931d', fontColor: '#fff', level: 10 }]``` , level is parallax effect level ,if you use pageArray you can't use custom view |
