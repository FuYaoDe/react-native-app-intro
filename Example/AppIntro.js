import React, {
  StyleSheet,
  Text,
  View,
  PropTypes,
  TouchableOpacity,
  Component,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
const windowsWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  pic: {
    width: 150,
    height: 150,
  },
  info: {
    flex: 0.5,
    backgroundColor: '#9DD6EB',
    alignItems: 'center',
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
  getAnimatedSetting = (index) => {
    const isFirstPage = index === 0;
    const statRange = isFirstPage ? 0 : windowsWidth * (index - 1);
    const endRange = isFirstPage ? windowsWidth : windowsWidth * index;
    const startOpacity = isFirstPage ? 1 : 0;
    const endOpacity = isFirstPage ? 1 : 1;
    const leftPosition = isFirstPage ? 0 : windowsWidth / 3;
    const rightPosition = isFirstPage ? -windowsWidth / 3 : 0;
    return {
      isFirstPage,
      statRange,
      endRange,
      startOpacity,
      endOpacity,
      leftPosition,
      rightPosition,
    };
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
            <Text style={[styles.controllText, { color: rightTextColor }]}>Skip</Text>
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
              >Done</Text>
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

  renderBasicSlidePage = (index, { title, description, img, level }) => {
    const {
      isFirstPage,
      statRange,
      endRange,
      startOpacity,
      endOpacity,
      leftPosition,
      rightPosition,
    } = this.getAnimatedSetting(index);
    const pageView = (
      <View style={[styles.slide]} showsPagination={false} key={index}>
        <Animated.View style={[styles.header, {
          transform: [
            {
              translateX: this.state.parallax.interpolate({
                inputRange: [statRange, endRange],
                outputRange: [
                  isFirstPage ? leftPosition : leftPosition - (10 * level),
                  isFirstPage ? rightPosition + (10 * level) : rightPosition,
                ],
              }),
            }],
        }, {
          opacity: this.state.parallax.interpolate({
            inputRange: [statRange, endRange], outputRange: [startOpacity, endOpacity],
          }),
        }]}
        >
          <Image style={styles.pic} source={{ uri: img }} />
        </Animated.View>
        <View style={styles.info}>
          <Animated.View style={[{
            transform: [   // Array order matters
              {
                translateX: this.state.parallax.interpolate({
                  inputRange: [statRange, endRange],
                  outputRange: [leftPosition, rightPosition],
                }),
              }],
          }, {
            opacity: this.state.parallax.interpolate({
              inputRange: [statRange, endRange], outputRange: [startOpacity, endOpacity],
            }),
          }]}
          >
            <Text style={styles.title}>{title}</Text>
          </Animated.View>
          <Animated.View style={[{
            transform: [   // Array order matters
              {
                translateX: this.state.parallax.interpolate({
                  inputRange: [statRange, endRange],
                  outputRange: [
                    isFirstPage ? leftPosition : leftPosition + (15 * level),
                    isFirstPage ? rightPosition - (15 * level) : rightPosition,
                  ],
                }),
              }],
          }, {
            opacity: this.state.parallax.interpolate({
              inputRange: [statRange, endRange], outputRange: [startOpacity, endOpacity],
            }),
          }]}
          >
            <Text style={styles.description}>{description}</Text>
          </Animated.View>
        </View>
      </View>
    );
    return pageView;
  }

  renderChild = (children, pageIndex, index) => {
    const level = children.props.level || 0;
    const {
      isFirstPage,
      statRange,
      endRange,
      startOpacity,
      endOpacity,
      leftPosition,
      rightPosition,
    } = this.getAnimatedSetting(pageIndex);

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
    let transform = [];
    if (level !== 0) {
      transform = [{
        transform: [
          {
            translateX: this.state.parallax.interpolate({
              inputRange: [statRange, endRange],
              outputRange: [
                isFirstPage ? leftPosition : leftPosition - (10 * level),
                isFirstPage ? rightPosition + (10 * level) : rightPosition,
              ],
            }),
          }],
      }, {
        opacity: this.state.parallax.interpolate({
          inputRange: [statRange, endRange], outputRange: [startOpacity, endOpacity],
        }),
      }];
    }
    const animatedChild = (
      <Animated.View key={index} style={[children.props.style, ...transform]}>
        {nodes}
      </Animated.View>
    );
    return animatedChild;
  }

  render() {
    const childrens = this.props.children;
    const { pageArray } = this.props;
    const pages = pageArray.length > 0 ?
    pageArray.map((page, i) => this.renderBasicSlidePage(i, page)) :
    childrens.map((children, i) => this.renderChild(children, i, i));
    return (
      <Swiper style={styles.wrapper}
        loop={false}
        renderPagination={this.renderPagination}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.parallax } } }]
        )}
      >
      {pages}
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
  pageArray: PropTypes.array,
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
};
