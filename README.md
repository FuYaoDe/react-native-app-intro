# react-native-app-intro
react-native-app-intro is a react native plugin implementing a parallax effect welcome page using base on [react-native-swiper](https://github.com/leecade/react-native-swiper) , similar to the one found in Google's app like Sheet, Drive, Docs...

# react-native-app-intro Screen Capture
<img src="http://i.giphy.com/3o6ozjLoOnYTXfzJgQ.gif">


### Installation

```bash
$ npm i react-native-app-intro --save
```

### Properties
| Prop           | PropType | Default Value           | Description                                                                                                                                                                                                                                                                      |
|----------------|----------|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dotColor       | string   | 'rgba(255,255,255,0.3)' | Bottom of the page dot color                                                                                                                                                                                                                                                     |
| activeDotColor | string   | '#fff'                  | Active page index dot color                                                                                                                                                                                                                                                      |
| rightTextColor | string   | '#fff'                  | The bottom right Text `Done、>` color                                                                                                                                                                                                                                            |
| leftTextColor  | string   | '#fff'                  | The bottom left Text `Skip` color                                                                                                                                                                                                                                                |
| onSlideChange  | func     |                         | function to call when the pages change                                                                                                                                                                                                                                           |
| onSkipBtnClick | func     |                         | function to call when the Skip button click                                                                                                                                                                                                                                      |
| onDoneBtnClick | func     |                         | function to call when the Done button click                                                                                                                                                                                                                                      |
| onNextBtnClick | func     |                         | function to call when the Next '>' button click                                                                                                                                                                                                                                  |
| pageArray      | array    |                         | In the basic usage, you can input object array to render basic view example: ```[{title: 'Example', description: 'Page1', img: 'http://i.imgur.com/da4G0Io.png', backgroundColor: '#9DD6EB', fontColor: '#fff', level: '10'}]```, if you use pageArray you can't use custom view |
