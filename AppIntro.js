import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 150,
    height: 150,
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    padding: 30,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
  },
  controllText: {
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
      parallax: new Animated.Value(0),
    };
  }

  onNextBtnClick = (context) => {
    if (context.state.isScrolling || context.state.total < 2) return;
    const state = context.state;
    const diff = (context.props.loop ? 1 : 0) + 1 + context.state.index;
    let x = 0;
    if (state.dir === 'x') x = diff * state.width;
    if (Platform.OS === 'ios') {
      context.refs.scrollView.scrollTo({ y: 0, x });
    } else {
      context.refs.scrollView.setPage(diff);
      context.onScrollEnd({
        nativeEvent: {
          position: diff,
        },
      });
    }
    this.props.onNextBtnClick(context.state.index);
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
  getTransform = (index, offset, level) => {
    const isFirstPage = index === 0;
    const statRange = isFirstPage ? 0 : windowsWidth * (index - 1);
    const endRange = isFirstPage ? windowsWidth : windowsWidth * index;
    const startOpacity = isFirstPage ? 1 : 0;
    const endOpacity = isFirstPage ? 1 : 1;
    const leftPosition = isFirstPage ? 0 : windowsWidth / 3;
    const rightPosition = isFirstPage ? -windowsWidth / 3 : 0;
    const transform = [{
      transform: [
        {
          translateX: this.state.parallax.interpolate({
            inputRange: [statRange, endRange],
            outputRange: [
              isFirstPage ? leftPosition : leftPosition - (offset * level),
              isFirstPage ? rightPosition + (offset * level) : rightPosition,
            ],
          }),
        }],
    }, {
      opacity: this.state.parallax.interpolate({
        inputRange: [statRange, endRange], outputRange: [startOpacity, endOpacity],
      }),
    }];
    return {
      transform,
    };
  }

  renderPagination = (index, total, context) => {
    const { activeDotColor, dotColor, rightTextColor } = this.props;
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
    let controllBts;
    if (Platform.OS === 'ios') {
      controllBts =  (
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
              onPress={isSkipBtnShow ? () => this.props.onSkipBtnClick(index) : null}
            >
              <Text style={[styles.controllText, { color: rightTextColor }]}>{this.props.skipBtnLabel}</Text>
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
                <Text style={[styles.controllText, {
                  color: rightTextColor, paddingRight: 30,
                }]}
                >{this.props.doneBtnLabel}</Text>
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
    } else {
      controllBts = (
        <View style={styles.paginationContainer}>
          <View style={[styles.btnContainer, {
            paddingBottom: 5,
            opacity: isSkipBtnShow ? 1 : 0,
          }]}
          >
            <TouchableOpacity
              style={styles.full}
              onPress={isSkipBtnShow ? () => this.props.onSkipBtnClick(index) : null}
            >
              <Text style={[styles.controllText, { color: rightTextColor }]}>{this.props.skipBtnLabel}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dotContainer}>
            {dots}
          </View>
          <View style={[styles.btnContainer, { height: 0, paddingBottom: 5 }]}>
            <TouchableOpacity style={styles.full}
              onPress={ isDoneBtnShow ?
                this.props.onDoneBtnClick : this.onNextBtnClick.bind(this, context)}
            >
             <Text style={[styles.nextButtonText, { color: rightTextColor }]}>
               {isDoneBtnShow ? this.props.doneBtnLabel : '›'}
             </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return controllBts;
  }

  renderBasicSlidePage = (index, {
    title,
    description,
    img,
    imgStyle,
    backgroundColor,
    fontColor,
    level,
  }) => {
    const AnimatedStyle1 = this.getTransform(index, 10, level);
    const AnimatedStyle2 = this.getTransform(index, 0, level);
    const AnimatedStyle3 = this.getTransform(index, 15, level);
    const pageView = (
      <View style={[styles.slide, { backgroundColor }]} showsPagination={false} key={index}>
        <Animated.View style={[styles.header, ...AnimatedStyle1.transform]}>
          <Image style={imgStyle} source={{ uri: img }} />
        </Animated.View>
        <View style={styles.info}>
          <Animated.View style={AnimatedStyle2.transform}>
            <Text style={[styles.title, { color: fontColor }]}>{title}</Text>
          </Animated.View>
          <Animated.View style={AnimatedStyle3.transform}>
            <Text style={[styles.description, { color: fontColor }]}>{description}</Text>
          </Animated.View>
        </View>
      </View>
    );
    return pageView;
  }

  renderChild = (children, pageIndex, index) => {
    const level = children.props.level || 0;
    const { transform } = this.getTransform(pageIndex, 10, level);
    const root = children.props.children;
    let nodes = children;
    if (Array.isArray(root)) {
      nodes = root.map((node, i) => {
        let element = node;
        if (node.type.displayName === 'View') {
          element = this.renderChild(node, pageIndex, `${index}_${i}`);
        }
        return element;
      });
    }
    let animatedChild = children;
    if (level !== 0) {
      animatedChild = (
        <Animated.View key={index} style={[children.props.style, transform]}>
          {nodes}
        </Animated.View>
      );
    } else {
      animatedChild = (
        <View key={index} style={children.props.style}>
          {nodes}
        </View>
      );
    }
    return animatedChild;
  }

  render() {
    const childrens = this.props.children;
    const { pageArray } = this.props;
    let pages = [];
    let androidPages = null;
    if (pageArray.length > 0) {
      pages = pageArray.map((page, i) => this.renderBasicSlidePage(i, page));
    } else {
      if (Platform.OS === 'ios') {
        pages = childrens.map((children, i) => this.renderChild(children, i, i));
      } else {
        androidPages = childrens.map((children, i) => {
          const { transform } = this.getTransform(i, -windowsWidth / 3 * 2, 1);
          pages.push(<View key={i} />);
          return (
            <Animated.View key={i} style={[{
              position: 'absolute',
              height: windowsHeight,
              width: windowsWidth,
              top: 0,
            }, {
              ...transform[0],
            }]}
            >
              {this.renderChild(children, i, i)}
            </Animated.View>
          );
        });
      }
    }
    return (
      <View>
        {androidPages}
        <Swiper
          loop={false}
          renderPagination={this.renderPagination}
          onMomentumScrollEnd={(e, state) => {
            this.props.onSlideChange(state.index, state.total);
          }}
          onScroll={Animated.event(
            [{ x: this.state.parallax }]
          )}
        >
          {pages}
        </Swiper>
      </View>
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
  pageArray: PropTypes.array,
  doneBtnLabel: PropTypes.string,
  skipBtnLabel: PropTypes.string,
};

AppIntro.defaultProps = {
  dotColor: 'rgba(255,255,255,.3)',
  activeDotColor: '#fff',
  rightTextColor: '#fff',
  leftTextColor: '#fff',
  pageArray: [],
  onSlideChange: () => {},
  onSkipBtnClick: () => {},
  onDoneBtnClick: () => {},
  onNextBtnClick: () => {},
  doneBtnLabel: 'Done',
  skipBtnLabel: 'Skip',
};
