import React, {
  StyleSheet,
  Text,
  View,
  PropTypes,
  TouchableOpacity,
  Component,
  Animated,
} from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  },
  activeDotStyle: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotContainer: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  nextButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  full: {
    height: 80,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class AppIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skipFadeOpacity: new Animated.Value(1),
      doneFadeOpacity: new Animated.Value(0),
      nextOpacity: new Animated.Value(1),
    };
  }

  onNextBtnClick = (context) => {
    if (context.state.isScrolling || context.state.total < 2) return;
    const state = context.state;
    const diff = (context.props.loop ? 1 : 0) + 1 + context.state.index;
    let x = 0;
    let y = 0;
    if (state.dir === 'x') x = diff * state.width;
    if (state.dir === 'y') y = diff * state.height;
    context.refs.scrollView.scrollTo({ y, x });
    this.props.onNextBtnClick();
  }

  setDoneBtnOpacity = (value) => {
    Animated.timing(
      this.state.doneFadeOpacity,
      { toValue: value },
    ).start();
  }

  setSkipBtnOpacity = (value) => {
    Animated.timing(
      this.state.skipFadeOpacity,
      { toValue: value },
    ).start();
  }

  setNextOpacity = (value) => {
    Animated.timing(
      this.state.nextOpacity,
      { toValue: value },
    ).start();
  }

  renderPagination = (index, total, context) => {
    const { activeDotColor, dotColor, rightTextColor } = this.props;
    this.props.onSlideChange(index, total);
    const ActiveDot = (
      <View
        style={[styles.activeDotStyle, { backgroundColor: activeDotColor }]}
      />
    );
    const Dot = <View style={[styles.dotStyle, { backgroundColor: dotColor }]} />;
    let dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(i === index ?
        React.cloneElement(ActiveDot, { key: i })
        :
        React.cloneElement(Dot, { key: i })
      );
    }
    let isDoneBtnShow;
    let isSkipBtnShow;
    if (index === total - 1) {
      this.setDoneBtnOpacity(1);
      this.setSkipBtnOpacity(0);
      this.setNextOpacity(0);
      isDoneBtnShow = true;
      isSkipBtnShow = false;
    } else {
      this.setDoneBtnOpacity(0);
      this.setSkipBtnOpacity(1);
      this.setNextOpacity(1);
      isDoneBtnShow = false;
      isSkipBtnShow = true;
    }
    return (
      <View style={styles.paginationContainer}>
        <Animated.View style={[styles.btnContainer, {
          opacity: this.state.skipFadeOpacity,
          transform: [{
            translateX: this.state.skipFadeOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 15],
            }),
          }],
        }]}
        >
          <TouchableOpacity
            style={styles.full}
            onPress={isSkipBtnShow ? this.props.onSkipBtnClick : null}
          >
            <Text style={[styles.text, { color: rightTextColor }]}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.dotContainer}>
          {dots}
        </View>
        <View style={styles.btnContainer}>
          <Animated.View style={[styles.full, { height: 0 }, {
            opacity: this.state.doneFadeOpacity,
            transform: [{
              translateX: this.state.skipFadeOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20],
              }),
            }],
          }]}
          >
            <View style={styles.full}>
              <Text style={[styles.text, { color: rightTextColor, paddingRight: 30 }]}>Done</Text>
            </View>
          </Animated.View>
          <Animated.View style={[styles.full, { height: 0 }, { opacity: this.state.nextOpacity }]}>
            <TouchableOpacity style={styles.full}
              onPress={ isDoneBtnShow ?
                this.props.onDoneBtnClick : this.onNextBtnClick.bind(this, context)}
            >
             <Text style={[styles.nextButtonText, { color: rightTextColor }]}>›</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }

  onScroll = (e) => {
    console.log("!!!!!!!!!!!!!!!!",e);
  }

  render() {
    return (
      <Swiper style={styles.wrapper}
        loop={false}
        renderPagination={this.renderPagination}
        onScroll={this.onScroll}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2} showsPagination={false}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    );
  }
}

AppIntro.propTypes = {
  dotColor: PropTypes.string,
  activeDotColor: PropTypes.string,
  rightTextColor: PropTypes.string,
  leftTextColor: PropTypes.string,
  onSlideChange: PropTypes.func,
  onSkipBtnClick: PropTypes.func,
  onDoneBtnClick: PropTypes.func,
  onNextBtnClick: PropTypes.func,
};

AppIntro.defaultProps = {
  dotColor: 'rgba(255,255,255,.3)',
  activeDotColor: '#fff',
  rightTextColor: '#fff',
  leftTextColor: '#fff',
  onSlideChange: () => {},
  onSkipBtnClick: () => {},
  onDoneBtnClick: () => {},
  onNextBtnClick: () => {},
};
